import { API_BASE_URL, getApiUrl } from "@/lib/apiConfig";

export type ContactQueryApi = {
  query_id: number;
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
  status: "Pending" | "Resolved";
  created_at: string;
  resolved_at?: string | null;
  assigned_admin?: string | null;
};

export type SubmitContactQueryRequest = {
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
};

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

async function parseResponse<T>(response: Response) {
  const data = (await response.json().catch(() => null)) as ApiResponse<T> | null;

  if (!response.ok || !data?.success) {
    throw new Error(data?.message ?? "The contact request could not be completed.");
  }

  return data;
}

async function fetchContactApi<T>(path: string, init?: RequestInit, requiresAuth = false) {
  const token = localStorage.getItem("access_token") ?? sessionStorage.getItem("access_token");

  if (requiresAuth && !token) {
    throw new Error("Your admin session is missing. Please sign in again.");
  }

  try {
    const response = await fetch(getApiUrl(path), {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(requiresAuth ? { Authorization: `Bearer ${token}` } : {}),
        ...init?.headers,
      },
    });
    return await parseResponse<T>(response);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(`Cannot reach the API at ${API_BASE_URL}. Please try again later.`);
    }
    throw error;
  }
}

export async function submitContactQuery(payload: SubmitContactQueryRequest) {
  return fetchContactApi<ContactQueryApi>("/api/contact/queries", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getContactQueries() {
  const response = await fetchContactApi<{ queries: ContactQueryApi[]; total_count: number }>(
    "/api/contact/queries",
    undefined,
    true
  );
  return response.data?.queries ?? [];
}

export async function getContactQuery(queryId: number) {
  const response = await fetchContactApi<{ query: ContactQueryApi }>(
    `/api/contact/queries/${queryId}`,
    undefined,
    true
  );

  if (!response.data?.query) {
    throw new Error("No contact query details were returned.");
  }

  return response.data.query;
}

export async function updateContactQueryStatus(queryId: number, status: "Pending" | "Resolved") {
  return fetchContactApi<{ query_id: number; status: "Pending" | "Resolved"; resolved_at?: string | null }>(
    `/api/contact/queries/${queryId}/status`,
    {
      method: "PATCH",
      body: JSON.stringify({ status }),
    },
    true
  );
}
