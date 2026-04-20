import { useEffect, useState } from "react";

export default function ScoreRing({ pct }) {
  const [animated, setAnimated] = useState(false);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;
  const color = pct >= 70 ? "#3ecf8e" : pct >= 40 ? "#f0a500" : "#f26d6d";

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="results-ring-wrap">
      <svg width="130" height="130" viewBox="0 0 130 130">
        <circle cx="65" cy="65" r={radius} fill="none" stroke="#2a2a38" strokeWidth="6" />
        <circle
          cx="65" cy="65" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animated ? offset : circumference}
          transform="rotate(-90 65 65)"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="results-ring-center">
        <span className="results-ring-pct" style={{ color }}>{pct}%</span>
        <span className="results-ring-lbl">score</span>
      </div>
    </div>
  );
}
