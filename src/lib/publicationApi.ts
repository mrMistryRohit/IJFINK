import { API_BASE_URL, getApiUrl } from "@/lib/apiConfig";

export type PublicationArticle = {
  article_id: number;
  title: string;
  abstract?: string;
  keywords?: string | string[];
  article_type?: string;
  subject_area?: string;
  status: string;
  submitted_at?: string;
  updated_at?: string;
  author_name?: string;
  author_email?: string;
  author_first_name?: string;
  author_last_name?: string;
  [key: string]: unknown;
};

export type ArticleFile = {
  file_id?: number;
  file_name?: string;
  file_type?: string;
  file_path?: string;
  version?: number;
  uploaded_at?: string;
};

export type PublicationRecord = {
  publication_id: number;
  article_id: number;
  title?: string;
  organization_name: string;
  doi: string;
  article_url: string;
  volume: string;
  issue: string;
  pages: string;
  publication_date: string;
  published_file_name?: string;
  published_file_path?: string;
  published_file_type?: string;
  author_name?: string;
};

export type ArticleDetails = {
  article: PublicationArticle;
  author?: Record<string, unknown>;
  co_authors?: Array<Record<string, unknown>>;
  files?: ArticleFile[];
  editorial_assignments?: Array<Record<string, unknown>>;
  editorial_reviews?: Array<Record<string, unknown>>;
  publication?: PublicationRecord | null;
  [key: string]: unknown;
};

export type PublicationViewer = { publication_team_id: number; name: string };

type ApiEnvelope<T> = { success: boolean; message?: string; data?: T };

const getToken = () => localStorage.getItem("access_token") ?? sessionStorage.getItem("access_token");

async function publicationRequest<T>(path: string, init?: RequestInit) {
  const token = getToken();
  if (!token) throw new Error("Your publication team session is missing. Please sign in again.");

  let response: Response;
  try {
    const isFormData = init?.body instanceof FormData;
    response = await fetch(getApiUrl(path), {
      ...init,
      headers: {
        ...(!isFormData ? { "Content-Type": "application/json" } : {}),
        Authorization: `Bearer ${token}`,
        ...init?.headers,
      },
    });
  } catch {
    throw new Error(`Cannot reach the backend at ${API_BASE_URL}. Please try again shortly.`);
  }

  const payload = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;
  if (!response.ok || !payload?.success) {
    throw new Error(payload?.message ?? "The publication request could not be completed.");
  }
  return payload;
}

export async function getAcceptedArticles() {
  const response = await publicationRequest<{
    articles: PublicationArticle[];
    total_count: number;
    viewer?: PublicationViewer;
  }>("/api/publication/accepted-articles");
  return response.data ?? { articles: [], total_count: 0 };
}

export async function getInQueueArticles() {
  const response = await publicationRequest<{
    articles: PublicationArticle[];
    total_count: number;
    viewer?: PublicationViewer;
  }>("/api/publication/in-queue");
  return response.data ?? { articles: [], total_count: 0 };
}

export async function getPublicationArticle(articleId: number) {
  const response = await publicationRequest<ArticleDetails>(`/api/publication/articles/${articleId}`);
  if (!response.data?.article) throw new Error("No article details were returned.");
  return response.data;
}

export async function downloadPublicationArticleFile(articleId: number, fileId: number) {
  const token = getToken();
  if (!token) throw new Error("Your publication team session is missing. Please sign in again.");

  let response: Response;
  try {
    response = await fetch(getApiUrl(`/api/publication/articles/${articleId}/files/${fileId}/download`), {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    throw new Error(`Cannot reach the backend at ${API_BASE_URL}. Please try again shortly.`);
  }

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as ApiEnvelope<never> | null;
    throw new Error(payload?.message ?? "The article file could not be downloaded.");
  }
  return response.blob();
}

export const startPublicationReview = (articleId: number) =>
  publicationRequest<{ article_id: number; new_article_status: string }>(
    `/api/publication/articles/${articleId}/start-review`,
    { method: "POST" }
  );

export const returnArticleToEditor = (articleId: number, feedback: string) =>
  publicationRequest<{ article_id: number; new_article_status: string }>(
    `/api/publication/articles/${articleId}/return-to-editor`,
    { method: "POST", body: JSON.stringify({ feedback }) }
  );

export const submitArticleToOrganization = (articleId: number, organizationName: string, remarks?: string) =>
  publicationRequest<{ article_id: number; new_article_status: string }>(
    `/api/publication/articles/${articleId}/submit-organization`,
    { method: "POST", body: JSON.stringify({ organization_name: organizationName, remarks: remarks || undefined }) }
  );

export const rejectPublicationArticle = (articleId: number, remarks?: string) =>
  publicationRequest<{ article_id: number; new_article_status: string }>(
    `/api/publication/articles/${articleId}/reject`,
    { method: "POST", body: JSON.stringify({ remarks: remarks || undefined }) }
  );

export type PublishArticleInput = {
  organization_name: string;
  doi: string;
  article_url: string;
  volume: string;
  issue: string;
  pages: string;
  publication_date: string;
};

export async function publishArticle(articleId: number, data: PublishArticleInput, file: File) {
  const formData = new FormData();
  formData.append("publication_data", JSON.stringify(data));
  formData.append("published_file", file);
  return publicationRequest<PublicationRecord>(`/api/publication/articles/${articleId}/publish`, {
    method: "POST",
    body: formData,
  });
}

export async function getPublishedArticles() {
  const response = await publicationRequest<{
    publications: PublicationRecord[];
    total_count: number;
    viewer?: PublicationViewer;
  }>("/api/publication/published");
  return response.data ?? { publications: [], total_count: 0 };
}

export async function getPublishedArticle(articleId: number) {
  const response = await publicationRequest<Record<string, unknown>>(`/api/publication/published/${articleId}`);
  return response.data;
}
