"use client";

const COLORS = ["#F8EC30", "#2B5439", "#6B6558"];

export default function ConfettiBurst() {
  const pieces = Array.from({ length: 14 }, (_, i) => {
    const angle = (i / 14) * Math.PI * 2;
    const distance = 60 + Math.random() * 40;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    return {
      id: i,
      color: COLORS[i % COLORS.length],
      style: {
        "--confetti-end": `translate(${x}px, ${y}px)`,
        left: "50%",
        top: "50%",
      } as React.CSSProperties,
    };
  });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece absolute w-2 h-2 rounded-sm"
          style={{ ...p.style, backgroundColor: p.color }}
        />
      ))}
    </div>
  );
}