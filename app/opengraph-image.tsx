import { ImageResponse } from "next/og";

export const alt = "Nia by Neethu — made for the way you feel";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "66px 82px", color: "#f4f0e8", backgroundColor: "#12221a", backgroundImage: "linear-gradient(105deg, rgba(18,34,26,.94), rgba(30,50,38,.52))", backgroundSize: "cover", backgroundPosition: "center 42%", backgroundRepeat: "no-repeat" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 19, letterSpacing: 5 }}>
        NIA <span style={{ color: "#d7a94e" }}>✳</span> BY NEETHU
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ fontSize: 23, display: "flex", letterSpacing: 4, textTransform: "uppercase", color: "#e0bd83" }}>A feeling, stitched in Kerala</div>
        <div style={{ fontFamily: "Georgia, serif", display: "flex", flexDirection: "column", fontSize: 96, lineHeight: 0.95, letterSpacing: -3 }}>
          <span>Made for the</span>
          <i>way you feel.</i>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, letterSpacing: 2 }}>
        <span>INDIAN WEAR WITH A SOFTER POINT OF VIEW</span>
        <span>NIABYNEETHU.COM</span>
      </div>
    </div>,
    { ...size },
  );
}
