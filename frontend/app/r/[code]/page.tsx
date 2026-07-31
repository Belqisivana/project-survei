"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import StarRating from "@/components/StarRating";
import { createSession, submitRating } from "@/lib/api";

const BRAND_GREEN = "#2B5439";

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
        // Rating 4-5: simpan URL-nya secara permanen di state, jangan langsung redirect.
        // Form rating TIDAK ditampilkan lagi setelah ini, karena backend menolak submit kedua
        // kalinya untuk sesi yang sama — mencegah pelanggan "kejebak" kalau pop-up ditutup.
        setMapsUrl(result.redirect_url);
        setShowModal(true);
        setState("submitted");
      } else if (result.redirect_url) {
        // Rating 1-3: langsung ke WhatsApp
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

  // Setelah rating 4-5 berhasil dikirim: tampilkan kartu terima kasih PERMANEN
  // (bukan cuma pop-up), supaya tombol ke Google Maps selalu bisa diakses lagi
  // kapan pun, walau pop-up sempat ditutup.
  if (state === "submitted" && mapsUrl) {
    return (
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-6 text-center space-y-5">
        <div className="flex justify-center">
          <Image
            src={`/${params.code}.png`} // ➔ LOGO DINAMIS BERDASARKAN URL
            alt={outletName}
            width={160}
            height={44}
            className="h-11 w-auto object-contain"
            priority
          />
        </div>
        <div className="text-4xl">🙏</div>
        <h2 className="text-lg font-semibold">Terima kasih banyak, ya!</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Senang banget bisa bikin kamu puas hari ini. Kalau berkenan, boleh
          bantu kami sekali lagi dengan memberi rating yang sama di Google
          Maps? Setiap review dari kamu sangat berarti buat kami untuk terus
          berkembang dan melayani lebih baik lagi. 💛
        </p>
        <button
          onClick={() => {
            window.location.href = mapsUrl;
          }}
          className="w-full text-white rounded-lg py-3 font-medium"
          style={{ backgroundColor: BRAND_GREEN }}
        >
          Lanjut ke Google Maps
        </button>

        <button
          onClick={() => {
            setShowModal(false);
            setState("ready");
          }}
          className="w-full text-sm text-gray-400 underline"
        >
          Ubah Rating sebelumnya?
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
              <div className="text-4xl">🙏</div>
              <h2 className="text-lg font-semibold">Terima kasih banyak, ya!</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Senang banget bisa bikin kamu puas hari ini. Kalau berkenan, boleh
                bantu kami sekali lagi dengan memberi rating yang sama di Google
                Maps? Setiap review dari kamu sangat berarti buat kami untuk terus
                berkembang dan melayani lebih baik lagi. 💛
              </p>
              <button
                onClick={() => {
                  window.location.href = mapsUrl;
                }}
                className="w-full text-white rounded-lg py-3 font-medium"
                style={{ backgroundColor: BRAND_GREEN }}
              >
                Lanjut ke Google Maps
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-6 text-center space-y-5">
      <div className="flex justify-center">
          <Image
          src={`/logo-${params.code}.png`} // ➔ Tambahkan kata "logo-" di dalam backtick
          alt={outletName}
          width={160}
          height={44}
          className="h-11 w-auto object-contain"
          priority
        />
      </div>

      <div>
        <h1 className="text-xl font-medium">{outletName}</h1>
        <p className="text-gray-500 mt-1">Bagaimana pelayanan kami hari ini?</p>
      </div>

      <StarRating value={stars} onChange={setStars} />

      <textarea
        className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-1"
        style={{ ["--tw-ring-color" as any]: BRAND_GREEN }}
        rows={3}
        placeholder="Ceritakan pengalamanmu (opsional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={stars === 0 || state === "submitting"}
        className="w-full text-white rounded-lg py-3 font-medium disabled:opacity-40 transition-opacity"
        style={{ backgroundColor: BRAND_GREEN }}
      >
        {state === "submitting" ? "Mengirim..." : "Kirim"}
      </button>
    </div>
  );
}