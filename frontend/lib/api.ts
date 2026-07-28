import type {
  SessionResponse,
  RatingSubmitResponse,
  SessionDetailResponse,
} from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail ?? `Request gagal (${res.status})`);
  }
  return res.json();
}

export async function createSession(qrCode: string): Promise<SessionResponse> {
  const res = await fetch(`${API_URL}/api/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ qr_code: qrCode }),
  });
  return handle<SessionResponse>(res);
}

export async function getSession(token: string): Promise<SessionDetailResponse> {
  const res = await fetch(`${API_URL}/api/sessions/${token}`);
  return handle<SessionDetailResponse>(res);
}

export async function submitRating(
  token: string,
  stage: "initial" | "followup",
  stars: number,
  comment?: string
): Promise<RatingSubmitResponse> {
  const res = await fetch(`${API_URL}/api/sessions/${token}/rating`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stage, stars, comment }),
  });
  return handle<RatingSubmitResponse>(res);
}
