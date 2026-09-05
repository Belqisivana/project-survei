"use client";

import { useState } from "react";

interface StarRatingProps {
  value: number;
  onChange: (stars: number) => void;
  minRequired?: number;
}

export default function StarRating({ value, onChange, minRequired }: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [poppedStar, setPoppedStar] = useState<number | null>(null);

  function handleClick(star: number) {
    onChange(star);
    setPoppedStar(star);
    window.setTimeout(() => setPoppedStar(null), 350);
  }

  return (
    <div>
      <div className="flex gap-1 sm:gap-2 justify-center">
        {[1, 2, 3, 4, 5].map((star) => {
          const active = (hovered ?? value) >= star;
          return (
            <button
              key={star}
              type="button"
              aria-label={`${star} bintang`}
              onClick={() => handleClick(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(null)}
              className={`text-4xl leading-none transition-transform active:scale-95 hover:scale-110 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation ${
                poppedStar === star ? "star-pop" : ""
              }`}
              style={{ color: active ? "#F8EC30" : "#E3E1D6" }}
            >
              ★
            </button>
          );
        })}
      </div>
      {minRequired ? (
        <p className="text-sm text-center mt-2" style={{ color: "#6B6558" }}>
          Minimal {minRequired} bintang untuk lanjut
        </p>
      ) : null}
    </div>
  );
}