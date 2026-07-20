import { API_BASE_URL, getApiUrl } from "@/lib/apiConfig";
import { getAccessToken } from "@/lib/authApi";

type ApiResponse<T> = { success: boolean; message?: string; data?: T };

export type EditorDashboardData = {
  assigned_articles: number;
  pending_reviews: number;
  completed_reviews: number;
  revision_requests: number;
  accepted_articles: number;
  rejected_articles: number;
};

export type EditorFile = {
  file_id: number;
  file_name: string;
  file_type: string;
  file_path?: string;
  version: number;
  uploaded_at: string;
};

export type EditorArticle = {
  assignment_id: number;
  article_id: number;
  editor_id: number;
  admin_id?: number;
  assignment_status: string;
  assigned_at: string;
  title: string;
  abstract?: string;
  keywords?: string;
  article_type: string;
  subject_area: string;
  article_status: string;
  submitted_at: string;
  updated_at?: string;
  author_name: string;
  author_email?: string;
  author_institution?: string;
  author_orcid?: string;
  author_phone?: string;
  files?: EditorFile[];
};

export type EditorialReview = {
  editorial_review_id: number;
  assignment_id: number;
  editor_id?: number;
  article_id?: number;
  title?: string;
  decision: string;
  comments?: string;
  reviewed_at: string;
  article_status?: string;
};

export type EditorRevision = {
  revision_id?: number;
  editorial_review_id: number;
  revision_number?: number;
  response_letter?: string;
  submitted_at?: string;
  article_id?: number;
  title?: string;
  article_status?: string;
  decision?: string;
  reviewed_at?: string;
  author_name?: string;
};

export type EditorArticleDetail = {
  article: EditorArticle;
  files: EditorFile[];
  co_authors?: Array<{ co_author_id?: number; full_name: string; email: string; institution?: string; orcid?: string }>;
  review_history: EditorialReview[];
  revision_history: EditorRevision[];
  assignment_history: Array<{ assignment_id: number; assignment_status: string; assigned_at: string; assigned_by?: string }>;
  current_status: string;
};

export type EditorNotification = {
  notification_id: number;
  user_id?: number;
  article_id?: number;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

type RequestOptions = RequestInit & { expectBlob?: boolean };

async function editorRequest<T>(path: string, options: RequestOptions = {}) {
  const token = getAccessToken();
  if (!token) throw new Error("Your editor session is missing. Please sign in again.");
  const isFormData = options.body instanceof FormData;

  let response: Response;
  try {
    response = await fetch(getApiUrl(path), {
      ...options,
      headers: {
        ...(!isFormData && options.body ? { "Content-Type": "application/json" } : {}),
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });
  } catch {
    throw new Error(`Cannot reach the backend at ${API_BASE_URL}.`);
  }

  if (options.expectBlob) {
    if (!response.ok) {
      const error = (await response.json().catch(() => null)) as ApiResponse<never> | null;
      throw new Error(error?.message ?? "The file could not be downloaded.");
    }
    return response.blob() as Promise<T>;
  }

  const payload = (await response.json().catch(() => null)) as ApiResponse<T> | null;
  if (!response.ok || !payload?.success || payload.data === undefined) {
    throw new Error(payload?.message ?? "The editor request could not be completed.");
  }
  return payload.data;
}

export const getEditorDashboard = () => editorRequest<EditorDashboardData>("/api/editor/dashboard");

export const getEditorArticles = () =>
  editorRequest<{ articles: EditorArticle[]; pagination: { page: number; per_page: number; total_count: number } }>(
    "/api/editor/articles?page=1&per_page=100&sort_by=ea.assigned_at&sort_order=DESC"
  );

export const getEditorArticle = (articleId: number) =>
  editorRequest<EditorArticleDetail>(`/api/editor/articles/${articleId}`);

export const downloadEditorArticleFile = (articleId: number, fileId: number) =>
  editorRequest<Blob>(`/api/editor/articles/${articleId}/files/${fileId}/download`, { expectBlob: true });

export const uploadEditorEditableManuscript = (articleId: number, file: File) => {
  const body = new FormData();
  body.append("editable_manuscript", file);
  return editorRequest<{ file: EditorFile & { article_id: number } }>(
    `/api/editor/articles/${articleId}/editable-manuscript`,
    { method: "POST", body }
  );
};

export const submitEditorReview = (assignmentId: number, decision: string, comments: string) =>
  editorRequest<{ review_id: number; assignment_id: number; decision: string }>("/api/editor/review", {
    method: "POST",
    body: JSON.stringify({ assignment_id: assignmentId, decision, comments }),
  });

export const getEditorReviews = () =>
  editorRequest<{ reviews: EditorialReview[] }>("/api/editor/reviews");

export const getEditorRevisionRequests = () =>
  editorRequest<{ articles: EditorRevision[] }>("/api/editor/revision-requests");

export const getEditorPublicationArticles = () =>
  editorRequest<{ articles: EditorArticle[]; total_count: number }>("/api/editor/publication-articles");

export const getEditorNotifications = () =>
  editorRequest<{ notifications: EditorNotification[] }>("/api/editor/notifications");

export const markEditorNotificationRead = (notificationId: number) =>
  editorRequest<{ notification_id: number; is_read: boolean }>(
    `/api/editor/notifications/${notificationId}/read`,
    { method: "PUT" }
  );
