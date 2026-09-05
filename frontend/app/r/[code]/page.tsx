"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import StarRating from "@/components/StarRating";
import ConfettiBurst from "@/components/ConfettiBurst";
import ReceiptCard from "@/components/ReceiptCard";
import GreetingBubble from "@/components/GreetingBubble";
import { createSession, submitRating } from "@/lib/api";

const BRAND_GREEN = "#2B5439";
const WARM_GRAY = "#6B6558";

type PageState = "loading" | "ready" | "submitting" | "submitted" | "error";

export default function LandingRatingPage() {
  const params = useParams<{ code: string }>();
  const [state, setState] = useState<PageState>("loading");
  const [token, setToken] = useState<string | null>(null);
  const [outletName, setOutletName] = useState("");
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [mapsUrl, setMapsUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    createSession(params.code)
      .then((res) => {
        setToken(res.token);
        setOutletName(res.outlet_name);
        setState("ready");
      })
      .catch((err) => {
        setErrorMsg(err.message);
        setState("error");
      });
  }, [params.code]);

  async function handleSubmit() {
    if (!token || stars === 0) return;
    setState("submitting");
    try {
      const result = await submitRating(token, "initial", stars, comment || undefined);
      if (result.next_action === "google_maps" && result.redirect_url) {
        setMapsUrl(result.redirect_url);
        setShowModal(true);
        setState("submitted");
        setShowConfetti(true);
        window.setTimeout(() => setShowConfetti(false), 900);
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

  if (state === "submitted" && mapsUrl) {
    return (
      <ReceiptCard>
        {showConfetti && <ConfettiBurst />}
        <div className="flex justify-center logo-pop">
          <div className="logo-shine-wrap">
            <Image
              src={`/${params.code}.png`}
              alt={outletName}
              width={160}
              height={44}
              className="h-11 w-auto object-contain"
              priority
            />
          </div>
        </div>
        <div className="text-4xl">🎉</div>
        <h2 className="text-xl" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
          Terima kasih banyak!
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: WARM_GRAY }}>
          Senang bisa bikin Anda puas hari ini. Yuk bantu kami sekali lagi —
          tinggal <strong>1 langkah</strong>: nanti di halaman Google Maps,
          klik bintang sesuai rating Anda tadi lalu tekan{" "}
          <strong>&quot;Post&quot;</strong>. Cuma 10 detik kok! 🙏
        </p>
        <button
          onClick={() => {
            window.open(mapsUrl, "_blank");
          }}
          className="w-full text-white rounded-xl py-3 font-medium transition-transform active:scale-95"
          style={{ backgroundColor: BRAND_GREEN }}
        >
          Ulas / Rating Kami di Google Maps!
        </button>

        <button
          onClick={() => {
            setShowModal(false);
            setState("ready");
          }}
          className="w-full text-sm underline"
          style={{ color: WARM_GRAY }}
        >
          Eh, mau ubah rating dulu
        </button>

        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full text-center space-y-4 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setShowModal(false)}
                aria-label="Tutup"
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors text-lg"
              >
                ✕
              </button>
              <div className="text-4xl">🎉</div>
              <h2 className="text-xl" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
                Terima kasih banyak!
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: WARM_GRAY }}>
                Senang bisa bikin Anda puas hari ini. Yuk bantu kami sekali lagi —
                tinggal <strong>1 langkah</strong>: nanti di halaman Google Maps,
                klik bintang sesuai rating Anda tadi lalu tekan{" "}
                <strong>&quot;Post&quot;</strong>. Cuma 10 detik kok! 🙏
              </p>
              <button
                onClick={() => {
                  window.open(mapsUrl, "_blank");
                }}
                className="w-full text-white rounded-xl py-3 font-medium transition-transform active:scale-95"
                style={{ backgroundColor: BRAND_GREEN }}
              >
                Ulas / Rating Kami di Google Maps!
              </button>
            </div>
          </div>
        )}
      </ReceiptCard>
    );
  }

  return (
    <ReceiptCard>
      <div className="flex justify-center logo-pop">
        <div className="logo-shine-wrap">
          <Image
            src={`/logo-${params.code.toLowerCase()}.png`}
            alt={outletName}
            width={160}
            height={44}
            className="h-11 w-auto object-contain"
            priority
          />
        </div>
      </div>

      <div>
        <h1 className="text-xl" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
          {outletName}
        </h1>
      </div>

      <div className="dashed-divider" />

      <GreetingBubble
        avatarSrc={`/mascot-${params.code.toLowerCase()}.png`}
        message="Hai! Bagaimana pelayanan kami hari ini? 👋"
      />

      <StarRating value={stars} onChange={setStars} />

      <div className="text-left">
        <label
          className="text-xs flex items-center gap-1.5 mb-1.5"
          style={{ color: WARM_GRAY }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={WARM_GRAY} strokeWidth="2">
            <path d="M12 20h9" strokeLinecap="round" />
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Ceritakan pengalamanmu (opsional)
        </label>
        <textarea
          className="w-full rounded-lg p-3 focus:outline-none focus:ring-1 transition-shadow"
          style={{
            border: "1px solid #E4DFD1",
            ["--tw-ring-color" as any]: BRAND_GREEN,
            fontSize: "16px",
          }}
          rows={3}
          placeholder="Misal: pelayanannya cepat dan ramah..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

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