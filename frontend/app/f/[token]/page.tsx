"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import StarRating from "@/components/StarRating";
import ReceiptCard from "@/components/ReceiptCard";
import GreetingBubble from "@/components/GreetingBubble";
import { getSession, submitRating } from "@/lib/api";

const BRAND_GREEN = "#2B5439";
const WARM_GRAY = "#6B6558";

type PageState = "loading" | "ready" | "submitting" | "not_enough" | "error" | "done";

export default function FollowupRatingPage() {
  const params = useParams<{ token: string }>();
  const [state, setState] = useState<PageState>("loading");
  const [outletName, setOutletName] = useState("");
  const [stars, setStars] = useState(0);
  const [minRequired, setMinRequired] = useState<number | undefined>();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    getSession(params.token)
      .then((res) => {
        setOutletName(res.outlet_name);
        const initial = res.ratings.find((r) => r.stage === "initial");
        setMinRequired(initial ? Math.max(initial.stars, 4) : 4);
        setState("ready");
      })
      .catch((err) => {
        setErrorMsg(err.message);
        setState("error");
      });
  }, [params.token]);

  async function handleSubmit() {
    if (stars === 0) return;
    setState("submitting");
    try {
      const result = await submitRating(params.token, "followup", stars);
      if (result.next_action === "need_followup_rating") {
        setMinRequired(result.min_followup_rating);
        setState("not_enough");
      } else if (result.redirect_url) {
        window.location.href = result.redirect_url;
      }
    } catch (err: any) {
      setErrorMsg(err.message);
      setState("error");
    }
  }

  if (state === "loading") {
    return (
      <ReceiptCard>
        <div className="py-6 flex flex-col items-center gap-3">
          <div
            className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: `${BRAND_GREEN}33`, borderTopColor: "transparent" }}
          />
          <p style={{ color: WARM_GRAY }}>Memuat...</p>
        </div>
      </ReceiptCard>
    );
  }

  if (state === "error") {
    return (
      <ReceiptCard>
        <div className="text-3xl">😕</div>
        <p className="text-red-600 text-sm">{errorMsg}</p>
      </ReceiptCard>
    );
  }

  return (
    <ReceiptCard>
      <div>
        <h1 className="text-xl" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
          {outletName}
        </h1>
      </div>

      <GreetingBubble
        avatarSrc="/mascot-default.png"
        message="Terima kasih sudah berdiskusi dengan kami. Bagaimana penilaian Anda sekarang, setelah kendalanya kami bantu selesaikan?"
      />

      <StarRating value={stars} onChange={setStars} minRequired={minRequired} />

      {state === "not_enough" && (
        <p className="text-sm rounded-lg p-3" style={{ backgroundColor: "#FDF6E3", color: "#8A6D1D" }}>
          Rating masih di bawah minimal ({minRequired} bintang). Kalau masih
          ada yang mengganjal, jangan sungkan hubungi kami lagi ya 🙏
        </p>
      )}

      <button
        onClick={handleSubmit}
        disabled={stars === 0 || state === "submitting"}
        className="w-full text-white rounded-xl py-3 font-medium disabled:opacity-40 transition-transform active:scale-95 flex items-center justify-center gap-2"
        style={{ backgroundColor: BRAND_GREEN }}
      >
        {state === "submitting" ? (
          "Mengirim..."
        ) : (
          <>
            Kirim
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M22 2 11 13" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 2 15 22l-4-9-9-4Z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </>
        )}
      </button>
    </ReceiptCard>
  );
}