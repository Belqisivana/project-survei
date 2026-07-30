"use client";

import { useState } from "react";

interface StarRatingProps {
  value: number;
  onChange: (stars: number) => void;
  minRequired?: number;
}

export default function StarRating({ value, onChange, minRequired }: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div>
      <div className="flex gap-2 justify-center">
        {[1, 2, 3, 4, 5].map((star) => {
          const active = (hovered ?? value) >= star;
          return (
            <button
              key={star}
              type="button"
              aria-label={`${star} bintang`}
              onClick={() => onChange(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(null)}
              className="text-4xl transition-transform hover:scale-110"
              style={{ color: active ? "#F8EC30" : "#E3E1D6" }}
            >
              ★
            </button>
          );
        })}
      </div>
      {minRequired ? (
        <p className="text-sm text-center mt-2 text-gray-500">
          Minimal {minRequired} bintang untuk lanjut
        </p>
      ) : null}
    </div>
  );
}
