type PageVectorArtProps = {
  variant: "families" | "budget" | "spends";
};

const styles = {
  families: {
    stroke: "#0f766e",
    fill: "#14b8a6",
  },
  budget: {
    stroke: "#2563eb",
    fill: "#06b6d4",
  },
  spends: {
    stroke: "#ef4444",
    fill: "#f59e0b",
  },
};

function FamiliesVector() {
  return (
    <>
      <circle cx="82" cy="82" r="18" />
      <path d="M50 142c5-24 20-38 44-38s39 14 44 38" />
      <circle cx="142" cy="88" r="14" />
      <path d="M126 139c4-17 15-27 32-29" />
      <circle cx="42" cy="92" r="13" />
      <path d="M20 139c4-18 15-28 32-29" />
    </>
  );
}

function BudgetVector() {
  return (
    <>
      <path d="M34 142V72" />
      <path d="M82 142V46" />
      <path d="M130 142V92" />
      <path d="M24 142h128" />
      <path d="M29 58c29 13 54 10 75-9 17-15 31-20 48-16" />
      <path d="m142 26 12 8-10 10" />
    </>
  );
}

function SpendsVector() {
  return (
    <>
      <rect x="24" y="52" width="128" height="78" rx="18" />
      <path d="M24 76h128" />
      <path d="M48 106h28" />
      <path d="M112 106h18" />
      <path d="M104 38h34a14 14 0 0 1 14 14v8" />
      <circle cx="132" cy="106" r="4" />
    </>
  );
}

export default function PageVectorArt({ variant }: PageVectorArtProps) {
  const style = styles[variant];

  return (
    <div className="pointer-events-none absolute right-[-34px] top-5 z-0 h-[190px] w-[190px] opacity-55">
      <svg viewBox="0 0 176 176" fill="none" className="h-full w-full">
        <circle cx="88" cy="88" r="74" fill={style.fill} opacity="0.08" />
        <circle cx="142" cy="34" r="20" fill={style.fill} opacity="0.12" />
        <circle cx="36" cy="146" r="24" fill={style.fill} opacity="0.10" />
        <path
          d="M6 72c32-29 62-36 90-20 30 17 54 12 74-16"
          stroke={style.stroke}
          strokeWidth="1.5"
          opacity="0.16"
        />
        <path
          d="M16 94c29-16 55-16 78 0 24 16 47 16 68 0"
          stroke={style.stroke}
          strokeWidth="1.5"
          opacity="0.12"
        />
        <g
          stroke={style.stroke}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.20"
        >
          {variant === "families" && <FamiliesVector />}
          {variant === "budget" && <BudgetVector />}
          {variant === "spends" && <SpendsVector />}
        </g>
      </svg>
    </div>
  );
}
