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

export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

export type ArticleFile = {
  file_id: number;
  file_name: string;
  file_type: string;
  file_path: string;
  version: number;
  uploaded_at: string;
};

export type AssignableEditor = {
  editor_id: number;
  first_name: string;
  last_name: string;
  institution?: string;
  is_chief_editor: boolean;
  user_id: number;
  email: string;
  status: string;
};

export type AdminArticle = {
  article_id: number;
  title: string;
  abstract?: string;
  keywords?: string | string[];
  article_type: string;
  subject_area: string;
  status: string;
  submitted_at: string;
  updated_at?: string;
  author_name?: string;
  author_email?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  institution?: string;
  screening_status?: string;
  assigned_editor?: AssignableEditor | null;
  files?: ArticleFile[];
};

export type ScreeningArticle = AdminArticle & {
  phone_number?: string;
  orcid?: string;
  co_authors?: Array<{
    full_name: string;
    email: string;
    institution?: string;
    orcid?: string | null;
    author_order?: number;
  }>;
  files: ArticleFile[];
  screening?: {
    screening_id: number;
    decision: "Approved" | "Rejected";
    remarks?: string;
    screened_at?: string;
    screened_by?: string;
  } | null;
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

export async function getPendingScreeningArticles() {
  const response = await adminRequest<{ articles: AdminArticle[]; total_count: number }>("/api/screening/pending");
  return response.data?.articles ?? [];
}

export async function getScreeningArticle(articleId: number) {
  const response = await adminRequest<{ article: ScreeningArticle }>(`/api/screening/${articleId}`);
  if (!response.data?.article) throw new Error("No article details were returned.");
  return response.data.article;
}

export async function getScreeningFile(fileId: number) {
  const accessToken = getAccessToken();
  if (!accessToken) throw new Error("Your admin session is missing. Please sign in again.");

  const response = await fetch(getApiUrl(`/api/screening/files/${fileId}`), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null) as ApiResponse<never> | null;
    throw new Error(data?.message ?? "The file could not be loaded.");
  }
  return response.blob();
}

export async function submitScreeningDecision(articleId: number, decision: "Approved" | "Rejected", remarks: string) {
  return adminRequest<{ screening_id: number; article_id: number; decision: string; new_article_status: string }>(
    `/api/screening/${articleId}/decision`,
    { method: "POST", body: JSON.stringify({ decision, remarks: remarks.trim() }) }
  );
}

export async function getAssignableEditors() {
  const response = await adminRequest<{ editors: AssignableEditor[]; total_count: number }>("/api/editorial/assignable-editors");
  return response.data?.editors ?? [];
}

export async function assignEditorToArticle(articleId: number, editorId: number) {
  return adminRequest<{ assignment_id: number; article_id: number; editor_id: number; status: string; assigned_at: string }>(
    "/api/editorial/assignments",
    { method: "POST", body: JSON.stringify({ article_id: articleId, editor_id: editorId }) }
  );
}

export async function getAdminArticles() {
  const response = await adminRequest<{ articles: AdminArticle[]; total_count: number }>("/api/admin/articles");
  return response.data?.articles ?? [];
}
