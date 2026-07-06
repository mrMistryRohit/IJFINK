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

export type ForgotPasswordResponse = {
  success: boolean;
  message?: string;
  data?: {
    email?: string;
    reset_token?: string;
  };
};

export function getAccessToken() {
  return localStorage.getItem("access_token") ?? sessionStorage.getItem("access_token");
}

export function getStoredAuthUser() {
  const value = localStorage.getItem("auth_user") ?? sessionStorage.getItem("auth_user");
  if (!value) return null;
  try {
    return JSON.parse(value) as AuthUser;
  } catch {
    return null;
  }
}

async function parseJsonResponse<T>(response: Response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as T;
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

  const data = await parseJsonResponse<AuthResponse>(response);

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

  const data = await parseJsonResponse<AuthResponse>(response);

  if (!response.ok || !data?.success) {
    throw new Error(data?.message ?? "Registration failed.");
  }

  return data;
}

export async function requestPasswordReset(email: string) {
  const response = await fetch(getApiUrl("/api/auth/forgot-password"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await parseJsonResponse<ForgotPasswordResponse>(response);

  if (!response.ok || !data?.success) {
    throw new Error(data?.message ?? "Unable to send the password reset code.");
  }

  return data;
}

export async function verifyPasswordResetOtp(email: string, otp: string) {
  const response = await fetch(getApiUrl("/api/auth/verify-otp"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, otp }),
  });

  const data = await parseJsonResponse<ForgotPasswordResponse>(response);

  if (!response.ok || !data?.success) {
    throw new Error(data?.message ?? "OTP verification failed.");
  }

  return data;
}

export async function resetPassword(email: string, resetToken: string, newPassword: string, confirmPassword: string) {
  const response = await fetch(getApiUrl("/api/auth/reset-password"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      reset_token: resetToken,
      new_password: newPassword,
      confirm_password: confirmPassword,
    }),
  });

  const data = await parseJsonResponse<ForgotPasswordResponse>(response);

  if (!response.ok || !data?.success) {
    throw new Error(data?.message ?? "Unable to reset the password.");
  }

  return data;
}

export function storeAuthSession(accessToken: string, user?: AuthUser, rememberMe = false) {
  clearAuthSession();
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem("access_token", accessToken);
  if (user) {
    storage.setItem("auth_user", JSON.stringify(user));
  }
}

export function clearAuthSession() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("auth_user");
  sessionStorage.removeItem("access_token");
  sessionStorage.removeItem("auth_user");
}

export async function logoutUser() {
  const accessToken = getAccessToken();
  clearAuthSession();

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
  }
}
