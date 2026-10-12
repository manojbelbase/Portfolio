import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "72px", background: "#0b0b0b", color: "#f5f5f5", fontFamily: "sans-serif", borderTop: "8px solid #4ade80" }}>
        <div style={{ display: "flex", fontSize: 24, color: "#4ade80", letterSpacing: 4 }}>PORTFOLIO</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -3 }}>{site.name}</div>
          <div style={{ marginTop: 20, fontSize: 36, color: "#a3a3a3" }}>Frontend Developer</div>
          <div style={{ marginTop: 24, fontSize: 26, color: "#4ade80" }}>React · Next.js · TypeScript</div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#a3a3a3" }}>manojbelbase.com.np</div>
      </div>
    ),
    size,
  );
}
