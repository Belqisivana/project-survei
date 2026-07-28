"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import StarRating from "@/components/StarRating";
import { createSession, submitRating } from "@/lib/api";

type PageState = "loading" | "ready" | "submitting" | "error";

export default function LandingRatingPage() {
  const params = useParams<{ code: string }>();
  const [state, setState] = useState<PageState>("loading");
  const [token, setToken] = useState<string | null>(null);
  const [outletName, setOutletName] = useState("");
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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
      if (result.redirect_url) {
        window.location.href = result.redirect_url;
      }
    } catch (err: any) {
      setErrorMsg(err.message);
      setState("error");
    }
  }

  if (state === "loading") {
    return <p className="text-gray-500">Memuat...</p>;
  }

  if (state === "error") {
    return <p className="text-red-600">{errorMsg}</p>;
  }

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-6 text-center space-y-5">
      <div>
        <h1 className="text-xl font-medium">{outletName}</h1>
        <p className="text-gray-500 mt-1">Bagaimana pelayanan kami hari ini?</p>
      </div>

      <StarRating value={stars} onChange={setStars} />

      <textarea
        className="w-full border border-gray-200 rounded-lg p-3 text-sm"
        rows={3}
        placeholder="Ceritakan pengalamanmu (opsional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={stars === 0 || state === "submitting"}
        className="w-full bg-black text-white rounded-lg py-3 font-medium disabled:opacity-40"
      >
        {state === "submitting" ? "Mengirim..." : "Kirim"}
      </button>
    </div>
  );
}
