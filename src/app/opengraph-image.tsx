import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#fcf7f0",
        color: "#1c2121",
        padding: "56px 64px",
        borderBottom: "16px solid #2350FF",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(28,33,33,0.18)",
          paddingBottom: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 44,
            fontWeight: 700,
          }}
        >
          <span>8</span>
          <span style={{ fontStyle: "italic", color: "#2350FF" }}>x</span>
          <span
            style={{
              marginLeft: 18,
              fontSize: 16,
              letterSpacing: "0.08em",
              border: "1px solid rgba(28,33,33,0.25)",
              padding: "6px 12px",
            }}
          >
            LIFE AT 8X
          </span>
        </div>
        <div
          style={{
            backgroundColor: "#1c2121",
            color: "#E4FC53",
            padding: "8px 14px",
            fontSize: 16,
            letterSpacing: "0.06em",
          }}
        >
          250K+ HUMANS · 50+ COUNTRIES
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <div
          style={{
            fontSize: 78,
            fontWeight: 700,
            lineHeight: 0.96,
            letterSpacing: "-0.03em",
          }}
        >
          we orchestrate 250k+ humans so distribution works.
        </div>
        <div style={{ fontSize: 26, color: "rgba(28,33,33,0.75)", maxWidth: "880px" }}>
          High-agency core builders in Design, Engineering, and Operations. Evidence-first
          hiring, zero resume theater.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(28,33,33,0.18)",
          paddingTop: "20px",
          fontSize: 18,
          letterSpacing: "0.06em",
        }}
      >
        <span>8X SOCIAL · 8X LINKEDIN · 8X HIRING · 8X SALES</span>
        <span style={{ color: "#2350FF", fontWeight: 700 }}>8X.LIFE</span>
      </div>
    </div>,
    {
      ...size,
    }
  );
}
