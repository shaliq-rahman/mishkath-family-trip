import {
  families,
  payments,
  getFamilyFee,
  getFamilyCollected,
  fmt,
  TRIP_HEADLINE,
  TRIP_DESTINATION,
  TRIP_DATES,
} from "@/data/config";

const familyColors: Record<string, string> = {
  "1": "#0a6b6b",
  "2": "#1d4ed8",
  "3": "#7c3aed",
  "4": "#b45309",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export default function Home() {
  const totalExpected  = families.reduce((s, f) => s + getFamilyFee(f), 0);
  const totalCollected = families.reduce((s, f) => s + getFamilyCollected(f), 0);
  const totalPending   = totalExpected - totalCollected;
  const pct            = Math.round((totalCollected / totalExpected) * 100);

  const recent = [...payments].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div style={{ background: "#eef3f3", minHeight: "100dvh" }}>

      {/* ── HERO ── */}
      <header style={{
        background: "linear-gradient(160deg, #061818 0%, #0c3232 55%, #0d5050 100%)",
        position: "relative",
        overflow: "hidden",
        paddingBottom: "36px",
      }}>

        {/* Decorative blobs */}
        <div style={{ position:"absolute", top:"-80px", right:"-80px", width:"260px", height:"260px", borderRadius:"50%", background:"radial-gradient(circle, rgba(212,168,83,0.12) 0%, transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"-40px", left:"-60px", width:"200px", height:"200px", borderRadius:"50%", background:"radial-gradient(circle, rgba(14,133,133,0.18) 0%, transparent 70%)", pointerEvents:"none" }} />

        <div style={{ padding: "52px 22px 0", position: "relative" }}>

          {/* App icon / house logo */}
          <div style={{
            width: "58px",
            height: "58px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #b8860b 0%, #e8b84d 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 28px rgba(212,168,83,0.4)",
            marginBottom: "22px",
          }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
          </div>

          {/* Trip name */}
          <div style={{ marginBottom: "6px" }}>
            {TRIP_HEADLINE.map((line) => (
              <div
                key={line}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(36px, 10vw, 44px)",
                  color: "#ffffff",
                  lineHeight: 1.0,
                  letterSpacing: "-0.01em",
                }}
              >
                {line}
              </div>
            ))}
          </div>

          <div style={{
            display: "inline-block",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.22em",
            color: "#d4a853",
            marginBottom: "6px",
          }}>
            FAMILY TRIP 2026
          </div>

          <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "12px", marginTop: "4px" }}>
            📍 {TRIP_DESTINATION} &nbsp;·&nbsp; {TRIP_DATES}
          </p>
        </div>

        {/* ── Stat cards ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          padding: "24px 22px 0",
          position: "relative",
        }}>
          {/* Collected */}
          <div style={{
            background: "rgba(255,255,255,0.07)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "18px",
            padding: "16px",
          }}>
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase" }}>
              Collected
            </p>
            <p style={{ fontSize: "22px", fontWeight: 800, color: "#4ade80", marginTop: "8px", lineHeight: 1, fontFamily: "var(--font-body)" }}>
              {fmt(totalCollected)}
            </p>
            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.28)", marginTop: "5px" }}>
              of {fmt(totalExpected)}
            </p>
          </div>

          {/* Remaining */}
          <div style={{
            background: "rgba(255,255,255,0.07)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "18px",
            padding: "16px",
          }}>
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase" }}>
              Remaining
            </p>
            <p style={{ fontSize: "22px", fontWeight: 800, color: "#f87171", marginTop: "8px", lineHeight: 1, fontFamily: "var(--font-body)" }}>
              {fmt(totalPending)}
            </p>
            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.28)", marginTop: "5px" }}>
              {100 - pct}% to collect
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ padding: "18px 22px 0", position: "relative" }}>
          <div style={{ height: "3px", background: "rgba(255,255,255,0.1)", borderRadius: "99px", overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${pct}%`,
              borderRadius: "99px",
              background: "linear-gradient(90deg, #4ade80 0%, #22d3ee 100%)",
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "7px" }}>
            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>
              {families.length} families · {families.reduce((s,f)=>s+f.members.length,0)} members
            </p>
            <p style={{ fontSize: "10px", fontWeight: 700, color: "#4ade80" }}>{pct}%</p>
          </div>
        </div>
      </header>

      {/* ── RECENT PAYMENTS ── */}
      <main style={{ padding: "20px 16px" }}>
        <div style={{
          background: "#ffffff",
          borderRadius: "22px",
          overflow: "hidden",
          boxShadow: "0 2px 20px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
        }}>

          {/* Card header */}
          <div style={{
            padding: "18px 18px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #f3f4f6",
          }}>
            <div>
              <p style={{ fontSize: "15px", fontWeight: 700, color: "#0a1a1a", lineHeight: 1 }}>
                Recent Payments
              </p>
              <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "4px" }}>
                {recent.length} payments recorded
              </p>
            </div>
            <div style={{
              background: "#f0fafa",
              border: "1px solid #ccf2f0",
              borderRadius: "99px",
              padding: "5px 12px",
              fontSize: "12px",
              fontWeight: 700,
              color: "#0a6b6b",
            }}>
              {fmt(totalCollected)}
            </div>
          </div>

          {/* Scrollable list */}
          <div style={{ maxHeight: "360px", overflowY: "auto" }}>
            {recent.map((p, i) => {
              const avatarColor = familyColors[p.familyId] ?? "#374151";
              const isLast = i === recent.length - 1;
              return (
                <div
                  key={p.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 18px",
                    borderBottom: isLast ? "none" : "1px solid #f9fafb",
                  }}
                >
                  {/* Avatar */}
                  <div style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background: avatarColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}>
                    {p.personName[0]}
                  </div>

                  {/* Name + family */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#111827", lineHeight: 1.2 }}>
                      {p.personName}
                    </p>
                    <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "3px" }}>
                      {p.familyName.replace(" Family", "")}
                      {" · "}
                      <span style={{ textTransform: "capitalize" }}>{p.type}</span>
                    </p>
                  </div>

                  {/* Amount + date */}
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <p style={{ fontSize: "14px", fontWeight: 700, color: "#16a34a", lineHeight: 1.2 }}>
                      {fmt(p.amount)}
                    </p>
                    <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "3px" }}>
                      {formatDate(p.date)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
