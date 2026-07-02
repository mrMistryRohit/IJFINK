import { API_BASE_URL, getApiUrl } from "@/lib/apiConfig";
import type { AuthUser } from "@/lib/authApi";

export type AdminApiUser = {
  user_id: number;
  email: string;
  role: string;
  status: "Active" | "Inactive";
  display_name?: string;
  profile_id?: number | null;
  created_at?: string;
  updated_at?: string;
  is_chief_editor?: boolean;
  full_profile?: {
    first_name?: string;
    last_name?: string;
    institution?: string;
    is_chief_editor?: boolean;
    [key: string]: unknown;
  };
};

export type CreatePrivilegedUserRequest = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  role: "admin" | "editor" | "publication team";
  institution?: string;
  is_chief_editor?: boolean;
};

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

function getAccessToken() {
  return localStorage.getItem("access_token") ?? sessionStorage.getItem("access_token");
}

async function adminRequest<T>(path: string, init?: RequestInit) {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error("Your admin session is missing. Please sign in again.");
  }

  let response: Response;

  try {
    response = await fetch(getApiUrl(path), {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        ...init?.headers,
      },
    });
  } catch {
    throw new Error(`Cannot reach the backend at ${API_BASE_URL}. Start the API server and try again.`);
  }
  const data = (await response.json().catch(() => null)) as ApiResponse<T> | null;

  if (!response.ok || !data?.success) {
    const message = data?.message ?? "The admin request could not be completed.";
    throw new Error(response.status === 401 ? `${message} Please sign in again.` : message);
  }

  return data;
}

export async function getAdminUsers() {
  const response = await adminRequest<{ users: AdminApiUser[]; total_count: number }>("/api/admin/users");
  const users = response.data?.users ?? [];

  return Promise.all(
    users.map(async (user) => {
      if (user.role !== "Editor") return user;

      try {
        const detail = await getAdminUserDetails(user.user_id);
        return { ...user, is_chief_editor: Boolean(detail.full_profile?.is_chief_editor) };
      } catch {
        return user;
      }
    })
  );
}

export async function getAdminUserDetails(userId: number) {
  const response = await adminRequest<{ user: AdminApiUser }>(`/api/admin/users/${userId}`);

  if (!response.data?.user) {
    throw new Error("No user details were returned.");
  }

  return response.data.user;
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

export async function getCurrentAdminProfile() {
  const authUser = getStoredAuthUser();
  if (!authUser?.user_id) {
    throw new Error("Your admin profile is missing. Please sign in again.");
  }

  return getAdminUserDetails(authUser.user_id);
}

export async function createAdminUser(payload: CreatePrivilegedUserRequest) {
  const response = await adminRequest<{ user: AdminApiUser }>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response.data?.user) {
    throw new Error("The account was created, but no user record was returned.");
  }

  return response;
}

export async function updateAdminUserStatus(userId: number, status: "Active" | "Inactive") {
  const response = await adminRequest<{ user: AdminApiUser }>(`/api/admin/users/${userId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

  if (!response.data?.user) {
    throw new Error("The status was updated, but no user record was returned.");
  }

  return response;
}
