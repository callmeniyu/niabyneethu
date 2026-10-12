// Throwaway measurement harness: loads the page in headless Chrome over a throttled
// mobile connection and reports when the hero image request actually starts.
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const PORT = 9333;
const URL_TO_TEST = process.env.TEST_URL ?? "http://localhost:3111/";
const MODE = process.env.MODE ?? "mobile"; // mobile | desktop
const RUNS = Number(process.env.RUNS ?? 2);

const viewport =
  MODE === "mobile"
    ? { width: 390, height: 844, deviceScaleFactor: 3, mobile: true }
    : { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false };

const dir = mkdtempSync(join(tmpdir(), "nia-cdp-"));
const chrome = spawn(CHROME, [
  "--headless=new",
  `--remote-debugging-port=${PORT}`,
  "--remote-allow-origins=*",
  "--no-first-run",
  "--no-default-browser-check",
  "--disable-extensions",
  `--user-data-dir=${dir}`,
  "about:blank",
]);
chrome.on("error", (e) => {
  console.error("chrome failed", e);
  process.exit(1);
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function browserWs() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      return (await r.json()).webSocketDebuggerUrl;
    } catch {
      await sleep(250);
    }
  }
  throw new Error("chrome devtools never came up");
}

const wsUrl = await browserWs();
const ws = new WebSocket(wsUrl);
await new Promise((res, rej) => {
  ws.addEventListener("open", res);
  ws.addEventListener("error", rej);
});

let nextId = 1;
const pending = new Map();
const events = [];
ws.addEventListener("message", (m) => {
  const msg = JSON.parse(m.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
  } else if (msg.method) {
    events.push(msg);
  }
});

function send(method, params = {}, sessionId) {
  const id = nextId++;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
  });
}
function sendSession(sessionId, method, params = {}) {
  return send(method, params, sessionId);
}

async function runOnce(label) {
  events.length = 0;
  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });

  await sendSession(sessionId, "Page.enable");
  await sendSession(sessionId, "Network.enable");
  await sendSession(sessionId, "Network.setCacheDisabled", { cacheDisabled: true });
  await sendSession(sessionId, "Emulation.setDeviceMetricsOverride", {
    ...viewport,
    screenWidth: viewport.width,
    screenHeight: viewport.height,
  });

  // Lighthouse "mobile slow 4G": 150ms RTT, 1.6Mbps down.
  await sendSession(sessionId, "Network.emulateNetworkConditions", {
    offline: false,
    latency: 150,
    downloadThroughput: (1.6 * 1024 * 1024) / 8,
    uploadThroughput: (750 * 1024) / 8,
    connectionType: "cellular4g",
  });

  await sendSession(sessionId, "Page.addScriptToEvaluateOnNewDocument", {
    source: `
      window.__lcp = [];
      try {
        new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp.push({ t: e.startTime, size: e.size, url: (e.url||"").slice(-60), el: e.element ? (e.element.className||e.element.tagName) : null }); }).observe({ type: "largest-contentful-paint", buffered: true });
      } catch (e) {}
    `,
  });

  await sendSession(sessionId, "Page.navigate", { url: URL_TO_TEST });
  await new Promise((res) => {
    const t = setTimeout(res, 60000);
    const iv = setInterval(() => {
      if (events.some((e) => e.method === "Page.loadEventFired")) {
        clearInterval(iv);
        clearTimeout(t);
        res();
      }
    }, 50);
  });
  await sleep(4000); // let LCP settle / late images land

  const { result } = await sendSession(sessionId, "Runtime.evaluate", {
    returnByValue: true,
    expression: `(() => {
      const r = performance.getEntriesByType("resource").map(e => ({
        url: e.name, start: +e.startTime.toFixed(1), respStart: +e.responseStart.toFixed(1),
        end: +e.responseEnd.toFixed(1), transfer: e.transferSize, encoded: e.encodedBodySize, type: e.initiatorType
      }));
      const paints = Object.fromEntries(performance.getEntriesByType("paint").map(p => [p.name, +p.startTime.toFixed(1)]));
      return { resources: r, paints, lcp: window.__lcp, nav: +performance.getEntriesByType("navigation")[0].responseEnd.toFixed(1) };
    })()`,
  });
  const data = result.value;

  const hero = data.resources.filter((r) => /hero[12]\.png|hero[12]\.[a-f0-9]+\.png/i.test(r.url));
  const css = data.resources.filter((r) => /\.css/.test(r.url));
  const lcp = data.lcp.at(-1);

  console.log(`\n--- ${label} [${MODE}] ---`);
  console.log(`  html parsed (nav responseEnd): ${data.nav} ms`);
  for (const c of css) console.log(`  css   start ${c.start} ms  end ${c.end} ms  ${(c.encoded / 1024).toFixed(1)} KB`);
  for (const h of hero)
    console.log(
      `  HERO  start ${h.start} ms  end ${h.end} ms  ${(h.encoded / 1024 / 1024).toFixed(2)} MB  (${h.url.split("/").pop()})`
    );
  if (!hero.length) console.log("  !! no hero image request observed");
  console.log(`  FCP ${data.paints["first-contentful-paint"] ?? "n/a"} ms`);
  console.log(`  LCP ${lcp ? `${lcp.t.toFixed(0)} ms  <- ${lcp.el} ${lcp.url}` : "n/a"}`);

  await send("Target.closeTarget", { targetId });
  return { hero: hero[0], nav: data.nav, css: css[0], lcp: lcp?.t, fcp: data.paints["first-contentful-paint"] };
}

const results = [];
for (let i = 0; i < RUNS; i++) results.push(await runOnce(`run ${i + 1}`));

console.log("\n=== summary (" + MODE + ") ===");
for (const r of results) {
  if (!r?.hero) {
    console.log("  no hero measured");
    continue;
  }
  console.log(
    `  hero request starts ${(r.hero.start - r.nav).toFixed(0)} ms after HTML arrived | ` +
      `${(r.hero.encoded / 1024).toFixed(0)} KB | loads at ${r.hero.end.toFixed(0)} ms | LCP ${r.lcp?.toFixed(0) ?? "?"} ms`
  );
}

ws.close();
chrome.kill();
await sleep(500);
try {
  rmSync(dir, { recursive: true, force: true });
} catch {}
process.exit(0);
