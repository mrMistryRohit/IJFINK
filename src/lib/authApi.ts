import { getApiUrl } from "@/lib/apiConfig";

export type AuthRole = "author" | "admin" | "editor" | "chief editor" | "publication team";

export type LoginRequest = {
  email: string;
  password: string;
  role?: AuthRole;
  remember_me?: boolean;
};

export type AuthorRegisterRequest = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password?: string;
  institution: string;
  orcid?: string;
  phone_number?: string;
};

export type AuthUser = {
  user_id: number;
  email: string;
  role: string;
  status: string;
  display_name?: string;
  profile_id?: number | null;
  redirect_to?: string;
};

export type AuthResponse = {
  success: boolean;
  message?: string;
  data?: {
    access_token?: string;
    token_type?: string;
    expires_in_seconds?: number;
    user?: AuthUser;
  };
};

async function parseJsonResponse(response: Response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as AuthResponse;
  } catch {
    return null;
  }
}

export async function loginUser(payload: LoginRequest) {
  const response = await fetch(getApiUrl("/api/auth/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await parseJsonResponse(response);

  if (!response.ok || !data?.success) {
    throw new Error(data?.message ?? "Login failed.");
  }

  return data;
}

export async function registerAuthor(payload: AuthorRegisterRequest) {
  const response = await fetch(getApiUrl("/api/auth/register"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await parseJsonResponse(response);

  if (!response.ok || !data?.success) {
    throw new Error(data?.message ?? "Registration failed.");
  }

  return data;
}

export function storeAuthSession(accessToken: string, user?: AuthUser) {
  localStorage.setItem("access_token", accessToken);
  if (user) {
    localStorage.setItem("auth_user", JSON.stringify(user));
  }
}

export function clearAuthSession() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("auth_user");
  sessionStorage.removeItem("access_token");
  sessionStorage.removeItem("auth_user");
}

export async function logoutUser() {
  const accessToken = localStorage.getItem("access_token") ?? sessionStorage.getItem("access_token");

  try {
    if (accessToken) {
      await fetch(getApiUrl("/api/auth/logout"), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
  } catch {
    // Local sign-out must still succeed when the API is unavailable.
  } finally {
    clearAuthSession();
  }
}
