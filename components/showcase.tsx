"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Instagram, Menu, X } from "lucide-react";

const DM = "https://ig.me/m/nia_by_neethu";
const IG = "https://www.instagram.com/nia_by_neethu/";

const images = {
  hero: "./images/hero1.png",
  texture: "../public/images/bg3.jpg",
};

const categories = [
  { number: "01", name: "Sarees", note: "A little tradition, all your own.", image: "/images/saree1.jpg", shape: "category-card--tall" },
  { number: "02", name: "Kurtis", note: "The everyday, made a little special.", image: "/images/kurti1.jpg", shape: "category-card--short" },
  { number: "03", name: "Tops & sets", note: "Easy pieces. Your kind of plans.", image: "/images/top2.jpg", shape: "category-card--offset" },
];

const reels = [
  { number: "01", name: "The Sunday drape", file: "/videos/video1.mp4" },
  { number: "02", name: "A little colour", file: "/videos/video2.mp4" },
  { number: "03", name: "Made to move", file: "/videos/video4.mp4" },
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div className={className} initial={reduceMotion ? false : { opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="section-label">
      <i />
      {children}
    </span>
  );
}

export default function Showcase() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <div className="announcement">
        <span>Made slowly, worn often</span>
        <span className="announcement-star">✳</span>
        <span>From Kerala, with feeling</span>
      </div>
      <header className="site-header">
        <a href="#top" className="brand-lockup" aria-label="Nia by Neethu home" onClick={closeMenu}>
          <span className="brand-mark">
            nia<span>.</span>
          </span>
          <span className="brand-byline">BY NEETHU</span>
        </a>
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          <a href="#world" onClick={closeMenu}>
            Our world
          </a>
          <a href="#wardrobe" onClick={closeMenu}>
            The wardrobe
          </a>
          <a href="#watch" onClick={closeMenu}>
            Watch & buy
          </a>
          <a href="#notes" onClick={closeMenu}>
            Nia notes
          </a>
          <a href="#find-us" onClick={closeMenu}>
            Find us
          </a>
        </nav>
        <a className="header-cta" href={DM} target="_blank" rel="noreferrer">
          Say hello <ArrowRight size={15} strokeWidth={1.6} />
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <section className="hero" id="top" ref={heroRef} aria-label="Nia by Neethu — made for the way you feel">
        <motion.div className="hero-image" style={{ y: heroImageY }} />
        {/* <img src="../public/images/hero1.png" alt="Nia by Neethu — made for the way you feel" /> */}

        <div className="hero-grain" />
        <motion.div className="hero-copy" style={{ y: heroTextY }}>
          <motion.p className="hero-kicker" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.8 }}>
            A feeling, stitched in Kerala
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            Made for the
            <br />
            <em>way you feel.</em>
          </motion.h1>
          <motion.div className="hero-bottom" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.8 }}>
            <p>
              Indian wear with a softer point of view.
              <br />
              Thoughtful pieces for your everyday.
            </p>
            <a href="#world" className="hero-scroll">
              <span>Scroll to wander</span>
              <ArrowDown size={16} />
            </a>
          </motion.div>
        </motion.div>
        <div className="hero-side-note">
          <span>09° 55&apos; N&nbsp; · &nbsp;76° 16&apos; E</span>
          <span>Rooted in Kerala</span>
        </div>
        <div className="hero-index">
          01 <i /> 04
        </div>
      </section>

      <section className="intro-section" id="world">
        <div className="intro-topline">
          <SectionLabel>The Nia feeling</SectionLabel>
          <span>Made for real life, and all the little moments in between.</span>
        </div>
        <Reveal className="intro-heading-wrap">
          <h2>
            Soft mornings.
            <br />
            <em>Long lunches.</em>
            <br />
            Your own kind of <span>beautiful.</span>
          </h2>
          <div className="intro-aside">
            <span className="handwritten">A little note from us</span>
            <p>We believe getting dressed should feel like coming home to yourself. So we make easy, expressive clothes that carry a little of where we come from and leave plenty of room for who you are.</p>
            <a href={"https://www.instagram.com/nia_by_neethu/"} className="text-link" target="_blank" rel="noreferrer">
              Meet Nia <ArrowDownRight size={17} />
            </a>
          </div>
        </Reveal>
        <div className="intro-stamp" aria-hidden="true">
          <span>
            with love
            <br />
            from Kerala
          </span>
          <b>✳</b>
        </div>
      </section>

      <section className="film-section" aria-label="A moving portrait of Nia by Neethu">
        <video className="film-video" autoPlay={!reduceMotion} muted loop playsInline preload="metadata" aria-label="A woman in a traditional saree">
          <source src="/videos/bg_video.mp4" type="video/mp4" />
        </video>
        <div className="film-overlay" />
        <Reveal className="film-caption">
          <span>Little things, lovely things</span>
          <p>
            The in-between
            <br />
            <em>is the whole thing.</em>
          </p>
          <span className="film-caption-bottom">A Nia daydream&nbsp; · &nbsp;01:08</span>
        </Reveal>
        <div className="film-playmark" aria-hidden="true">
          nia<span>®</span>
        </div>
      </section>

      <section className="wardrobe-section" id="wardrobe">
        <div className="wardrobe-heading">
          <div>
            <SectionLabel>Pieces to live in</SectionLabel>
            <h2>
              A wardrobe with
              <br />
              <em>room to breathe.</em>
            </h2>
          </div>
          <p>Sarees for celebrations. Kurtas for the long way home. Pieces that meet you exactly where you are.</p>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <Reveal key={category.name} className={`category-card ${category.shape}`} delay={index * 0.1}>
              <a href={DM} target="_blank" rel="noreferrer" aria-label={`Ask about ${category.name} in Instagram direct messages`}>
                <div className="category-image-wrap">
                  <img src={category.image} alt={`${category.name} from the Nia by Neethu collection`} loading="lazy" />
                  <span className="category-arrow">
                    <ArrowDownRight size={20} />
                  </span>
                </div>
                <div className="category-meta">
                  <span>{category.number} / 03</span>
                  <span>Explore by DM</span>
                </div>
                <h3>{category.name}</h3>
                <p>{category.note}</p>
              </a>
            </Reveal>
          ))}
        </div>
        <div className="wardrobe-footer">
          <span>Every piece has a story.</span>
          <a href={DM} target="_blank" rel="noreferrer" className="pill-link">
            Find yours <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <section className="watch-section" id="watch">
        <div className="watch-heading">
          <div>
            <SectionLabel>From the Nia feed</SectionLabel>
            <h2>
              Watch it move.
              <br />
              <em>Make it yours.</em>
            </h2>
          </div>
          <div className="watch-intro">
            <span className="handwritten">A little closer, in motion</span>
            <p className="!text-neutral-600">See the pieces in their element, then message us about the one that feels like you.</p>
            <a href={IG} className="!text-[#BD7563] flex gap-2 items-center" target="_blank" rel="noreferrer">
              More on Instagram <ArrowRight size={16} />
            </a>
          </div>
        </div>
        <div className="reel-grid">
          {reels.map((reel, index) => (
            <Reveal className={`reel-card reel-card--${index + 1}`} key={reel.number} delay={index * 0.1}>
              <div className="reel-frame">
                <video autoPlay={!reduceMotion} muted loop playsInline preload="none" aria-label={`Product film: ${reel.name}`}>
                  <source src={reel.file} type="video/mp4" />
                </video>
                <span className="reel-number">NIA FILM&nbsp; / &nbsp;{reel.number}</span>
                <span className="reel-watch" aria-hidden="true">
                  ▶
                </span>
              </div>
              <div className="reel-info">
                <div className="!text-[#75846B]">
                  <span>{reel.number} / 03</span>
                  <h3>{reel.name}</h3>
                </div>
                <a href={DM} className="!text-[#314F3D]" target="_blank" rel="noreferrer">
                  Ask about this look <ArrowRight size={14} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="watch-note">The films play quietly on this page. Tap “Ask about this look” to find out more.</p>
      </section>

      <section className="quote-section" id="notes">
        <div className="quote-photo">
          <img src={images.texture} alt="A quiet detail from the textures and tones that inspire Nia" loading="lazy" />
          <span className="photo-caption">Little details, kept close.</span>
        </div>
        <Reveal className="quote-copy">
          <SectionLabel>What we hold close</SectionLabel>
          <span className="quote-mark">“</span>
          <blockquote>
            Rooted in the familiar.
            <br />
            Made for <em>what&apos;s next.</em>
          </blockquote>
          <p>Inspired by the warmth of home, the colours after rain, and the people who make a place yours.</p>
          <span className="quote-signature">With love, Neethu</span>
          <span className="quote-seal">
            N<br />✳<br />K
          </span>
        </Reveal>
      </section>

      <section className="little-things-section">
        <div className="little-things-head">
          <SectionLabel>The Nia way</SectionLabel>
          <span>Good clothes make room for you.</span>
        </div>
        <div className="little-things-grid">
          <Reveal className="little-thing">
            <span className="little-number">01</span>
            <span className="little-symbol">◌</span>
            <h3>
              Comfort,
              <br />
              <em>always.</em>
            </h3>
            <p>Easy pieces for long days, slow mornings, and everything in between.</p>
          </Reveal>
          <Reveal className="little-thing" delay={0.12}>
            <span className="little-number">02</span>
            <span className="little-symbol">✳</span>
            <h3>
              Details that
              <br />
              <em>feel like you.</em>
            </h3>
            <p>Thoughtful fabrics and little finishing touches make all the difference.</p>
          </Reveal>
          <Reveal className="little-thing" delay={0.24}>
            <span className="little-number">03</span>
            <span className="little-symbol">↗</span>
            <h3>
              Here when
              <br />
              <em>you need us.</em>
            </h3>
            <p>Questions about a piece? Talk with us directly and we’ll help you find your fit.</p>
          </Reveal>
        </div>
      </section>

      <section className="moving-note" aria-label="Made for the way you feel">
        <div className="marquee-track">
          <span>For the everyday&nbsp; ✳ &nbsp;for the unforgettable&nbsp; ✳ &nbsp;for the in-between&nbsp; ✳ &nbsp;</span>
          <span aria-hidden="true">For the everyday&nbsp; ✳ &nbsp;for the unforgettable&nbsp; ✳ &nbsp;for the in-between&nbsp; ✳ &nbsp;</span>
        </div>
      </section>

      <section className="closing-section" id="find-us">
        <div className="closing-image">
          <img src={images.hero} alt="Nia by Neethu — Indian clothing inspired by Kerala" loading="lazy" />
          <div className="closing-image-note">
            A little bit of here,
            <br />
            wherever you go.
          </div>
        </div>
        <div className="closing-copy">
          <SectionLabel>Your Nia story starts here</SectionLabel>
          <h2>
            Come as you are.
            <br />
            <em>Leave a little brighter.</em>
          </h2>
          <p>Tell us what caught your eye. We&apos;d love to help you find a piece that feels like you.</p>
          <a className="dm-button" href={"https://www.instagram.com/nia_by_neethu/"} target="_blank" rel="noreferrer">
            <Instagram size={18} /> Find us on Instagram <ArrowRight size={17} />
          </a>
          <span className="closing-handle">@nia_by_neethu &nbsp;·&nbsp; Kerala, India</span>
        </div>
      </section>

      <footer className="site-footer">
        <a href="#top" className="footer-brand">
          nia<span>.</span>
          <small>BY NEETHU</small>
        </a>
        <p>
          Made with feeling, in Kerala.
          <br />A little piece of home, wherever you are.
        </p>
        <div className="footer-links">
          <a href="#world">Our world</a>
          <a href="#wardrobe">The wardrobe</a>
          <a href="#watch">Watch & buy</a>
          <a href={IG} target="_blank" rel="noreferrer">
            Instagram <ArrowRight size={13} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Nia by Neethu</span>
          <a href="https://wa.me/919745676150" target="_blank" rel="noreferrer">
            Made by <span className="underline">niyasmohammed</span>
          </a>
          <span>Made for the way you feel.</span>
        </div>
      </footer>
      {/* <section className="watch-section" id="watch-buy">
        <div className="watch-heading">
          <div>
            <SectionLabel>See it move</SectionLabel>
            <h2>
              Watch &amp; <em>buy.</em>
            </h2>
          </div>
          <p>Because some pieces are best seen in motion. Find a look you love and ask us about it on Instagram.</p>
        </div>
        <div className="watch-grid">
          {[1, 2, 3, 4].map((number) => (
            <article className="watch-card" key={number}>
              <div className="watch-video-link">
                <video autoPlay muted loop playsInline controls preload="none" aria-label={`Nia by Neethu product video ${number}`}>
                  <source src={`/video${number}.mp4`} type="video/mp4" />
                </video>
                <span className="watch-playmark">NIA FILM &nbsp;·&nbsp; 0{number}</span>
              </div>
              <div className="watch-card-caption">
                <span>Look 0{number}</span>
                <a href={DM} target="_blank" rel="noreferrer">
                  Ask us about this <ArrowUpRight size={15} />
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="watch-footnote">Sound off by default&nbsp; ✳ &nbsp;Tap a look to ask us about it</div>
      </section> */}
      <section className="nia-notes-section">
        <div className="nia-notes-title">
          <SectionLabel>The little things</SectionLabel>
          <h2>
            What makes it
            <br />
            <em>feel like Nia.</em>
          </h2>
        </div>
        <div className="nia-notes-grid">
          <article>
            <span>01 / COMFORT</span>
            <h3>Easy, all day.</h3>
            <p>Pieces made to feel at home in. Soft silhouettes for real days and all the plans that come with them.</p>
          </article>
          <article>
            <span>02 / DETAIL</span>
            <h3>Look a little closer.</h3>
            <p>Thoughtful touches and lovely details that make getting dressed feel personal.</p>
          </article>
          <article>
            <span>03 / CONVERSATION</span>
            <h3>We’re right here.</h3>
            <p>Not sure about a fit or a fabric? Send us a note and we’ll help you find your way.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
