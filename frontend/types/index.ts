export interface SessionResponse {
  token: string;
  outlet_name: string;
  status: string;
}

export interface RatingSubmitResponse {
  next_action: "google_maps" | "whatsapp" | "need_followup_rating" | "already_resolved";
  redirect_url?: string;
  min_followup_rating?: number;
  message: string;
}

export interface RatingHistoryItem {
  stage: "initial" | "followup";
  stars: number;
  comment: string | null;
  created_at: string;
}

export interface SessionDetailResponse {
  token: string;
  status: string;
  outlet_name: string;
  ratings: RatingHistoryItem[];
}
