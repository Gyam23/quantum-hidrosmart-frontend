export type UserRole = "admin" | "operator" | "citizen";

export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  consent_given: boolean;
  is_active: boolean;
};

export type Alert = {
  id: number;
  sensor_id: number | null;
  citizen_report_id: number | null;
  severity: "low" | "medium" | "high";
  status: "open" | "in_repair" | "resolved";
  source: string;
  title: string;
  description: string;
  estimated_flow_l_min: number;
  detected_at: string;
  resolved_at: string | null;
  neighborhood: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
};

export type Sensor = {
  id: number;
  name: string;
  neighborhood: string;
  address: string;
  latitude: number;
  longitude: number;
  night_flow_limit_l_min: number;
  is_active: boolean;
  latest_flow_l_min: number | null;
  latest_pressure_bar: number | null;
  latest_at: string | null;
};

export type CitizenReport = {
  id: number;
  citizen_id: number;
  duplicate_of_id: number | null;
  address: string;
  description: string;
  latitude: number;
  longitude: number;
  photo_url: string | null;
  status: "received" | "validated" | "resolved";
  created_at: string;
};

export type WorkOrder = {
  id: number;
  alert_id: number;
  responsible_name: string;
  status: "open" | "in_repair" | "resolved";
  resolution_notes: string;
  created_at: string;
  updated_at: string;
  resolved_at: string | null;
};

export type DashboardSummary = {
  open_alerts: number;
  high_priority_alerts: number;
  active_sensors: number;
  pending_citizen_reports: number;
  average_resolution_minutes: number | null;
  estimated_saved_liters: number;
  estimated_savings_brl: number;
  updated_at: string;
};

export type ImpactReport = {
  period: string;
  baseline_liters: number;
  estimated_lost_liters: number;
  estimated_saved_liters: number;
  tariff_per_m3: number;
  estimated_savings_brl: number;
  baseline_updated_at: string | null;
};

const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1").replace(/\/$/, "");
const TOKEN_KEY = "hidrosmart.access_token";
const USER_KEY = "hidrosmart.user";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function saveSession(token: string, user: User) {
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession() {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
}

export function getSessionUser(): User | null {
  const value = sessionStorage.getItem(USER_KEY);
  if (!value) return null;
  try {
    return JSON.parse(value) as User;
  } catch {
    clearSession();
    return null;
  }
}

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  const token = sessionStorage.getItem(TOKEN_KEY);
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (init.body && !(init.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE}${path}`, { ...init, headers });
  if (!response.ok) {
    let message = `Falha na solicitação (${response.status})`;
    try {
      const body = await response.json();
      message = typeof body.detail === "string" ? body.detail : JSON.stringify(body.detail);
    } catch {
      message = response.statusText || message;
    }
    throw new ApiError(message, response.status);
  }
  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export async function apiRequestBlob(path: string): Promise<Blob> {
  const headers = new Headers();
  const token = sessionStorage.getItem(TOKEN_KEY);
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const response = await fetch(`${new URL(API_BASE).origin}${path}`, { headers });
  if (!response.ok) throw new ApiError("Não foi possível carregar a foto da denúncia.", response.status);
  return response.blob();
}

export async function login(email: string, password: string) {
  const result = await apiRequest<{ access_token: string; user: User }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  saveSession(result.access_token, result.user);
  return result.user;
}

export async function getCurrentUser() {
  return apiRequest<User>("/auth/me");
}
