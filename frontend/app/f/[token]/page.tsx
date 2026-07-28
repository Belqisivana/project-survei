"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import StarRating from "@/components/StarRating";
import { getSession, submitRating } from "@/lib/api";

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

  if (state === "loading") return <p className="text-gray-500">Memuat...</p>;
  if (state === "error") return <p className="text-red-600">{errorMsg}</p>;

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-6 text-center space-y-5">
      <div>
        <h1 className="text-xl font-medium">{outletName}</h1>
        <p className="text-gray-500 mt-1">
          Setelah diskusi kita, bagaimana penilaianmu sekarang?
        </p>
      </div>

      <StarRating value={stars} onChange={setStars} minRequired={minRequired} />

      {state === "not_enough" && (
        <p className="text-sm text-amber-700 bg-amber-50 rounded-lg p-2">
          Rating masih di bawah minimal ({minRequired} bintang). Silakan hubungi CS lagi jika masih ada kendala.
        </p>
      )}

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
