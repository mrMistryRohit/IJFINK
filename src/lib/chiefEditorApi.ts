import { getApiUrl } from "@/lib/apiConfig";
import { getAccessToken } from "@/lib/authApi";

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

export type ChiefEditorDashboardData = {
  total_assigned_articles: number;
  pending_editorial_reviews: number;
  revision_requested: number;
  accepted: number;
  rejected: number;
  published: number;
  active_editors: number;
  average_review_time: number;
};

export type ChiefEditorAllocation = {
  assignment_id: number;
  article_id: number;
  editor_id: number;
  admin_id: number;
  assignment_status: string;
  assigned_at: string;
  title: string;
  article_type: string;
  subject_area: string;
  article_status: string;
  submitted_at: string;
  updated_at?: string;
  author_name: string;
  editor_name: string;
  is_chief_editor: boolean;
};

export type ChiefEditorFile = {
  file_id: number;
  file_name: string;
  file_type: string;
  file_path: string;
  version: number;
  uploaded_at: string;
};

export type ChiefEditorArticleDetail = {
  article: ChiefEditorAllocation & {
    abstract?: string;
    keywords?: string;
    author_email?: string;
    author_institution?: string;
    author_orcid?: string;
    author_phone?: string;
  };
  files: ChiefEditorFile[];
  review_history: Array<{
    editorial_review_id: number;
    decision: string;
    comments?: string;
    reviewed_at: string;
  }>;
  revision_history: Array<{
    revision_id: number;
    revision_number: number;
    response_letter?: string;
    submitted_at: string;
  }>;
  notifications?: ChiefNotification[];
  article_timeline?: Array<{ event: string; at: string }>;
};

export type ChiefEditorProfile = {
  editor_id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  institution?: string;
  is_chief_editor: boolean;
  email: string;
  status: string;
  assigned_articles: number;
  completed_reviews: number;
  accepted: number;
  rejected: number;
  average_completion_time: number;
};

export type ChiefPendingAssignment = {
  assignment_id: number;
  article_id: number;
  editor_id: number;
  assignment_status: string;
  assigned_at: string;
  title: string;
  article_status: string;
  editor_name: string;
};

export type ChiefRevision = {
  article_id: number;
  title: string;
  article_status: string;
  editorial_review_id: number;
  decision: string;
  reviewed_at: string;
  author_name: string;
};

export type ChiefStatistics = {
  acceptance_rate: number;
  rejection_rate: number;
  revision_rate: number;
  average_review_time: number;
  editor_workload: Array<{
    editor_id: number;
    first_name: string;
    last_name: string;
    is_chief_editor: boolean;
    assigned_articles: number;
    active_assignments: number;
    completed_reviews: number;
  }>;
};

export type ChiefNotification = {
  notification_id: number;
  article_id?: number;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

async function chiefEditorRequest<T>(path: string, init: RequestInit & { expectBlob?: boolean } = {}) {
  const token = getAccessToken();
  if (!token) throw new Error("Your session is missing. Please sign in again.");

  let response: Response;
  try {
    response = await fetch(getApiUrl(path), {
      ...init,
      headers: {
        ...(init.body ? { "Content-Type": "application/json" } : {}),
        Authorization: `Bearer ${token}`,
        ...init.headers,
      },
    });
  } catch {
    throw new Error("Unable to reach the Chief Editor service.");
  }

  if (init.expectBlob) {
    if (!response.ok) {
      const error = (await response.json().catch(() => null)) as ApiResponse<never> | null;
      throw new Error(error?.message ?? "The file could not be downloaded.");
    }
    return response.blob() as Promise<T>;
  }

  const payload = (await response.json().catch(() => null)) as ApiResponse<T> | null;
  if (!response.ok || !payload?.success || !payload.data) {
    throw new Error(payload?.message ?? "The Chief Editor request could not be completed.");
  }
  return payload.data;
}

export function getChiefEditorDashboard() {
  return chiefEditorRequest<ChiefEditorDashboardData>("/api/chief-editor/dashboard");
}

export function getChiefEditorAllocations() {
  return chiefEditorRequest<{
    articles: ChiefEditorAllocation[];
    pagination: { page: number; per_page: number; total_count: number };
  }>("/api/chief-editor/articles?page=1&per_page=100");
}

export function getChiefEditorAllocationDetail(articleId: number) {
  return chiefEditorRequest<ChiefEditorArticleDetail>(`/api/chief-editor/articles/${articleId}`);
}

export function getChiefEditorProfile(editorId: number) {
  return chiefEditorRequest<{ editor: ChiefEditorProfile }>(`/api/chief-editor/editors/${editorId}`);
}

export const getChiefPendingAssignments = () =>
  chiefEditorRequest<{ assignments: ChiefPendingAssignment[] }>("/api/chief-editor/pending");

export const getChiefRevisions = () =>
  chiefEditorRequest<{ articles: ChiefRevision[] }>("/api/chief-editor/revisions");

export const getChiefEditors = () =>
  chiefEditorRequest<{ editors: ChiefEditorProfile[] }>("/api/chief-editor/editors");

export const getChiefStatistics = () =>
  chiefEditorRequest<ChiefStatistics>("/api/chief-editor/statistics");

export const getChiefNotifications = () =>
  chiefEditorRequest<{ notifications: ChiefNotification[] }>("/api/chief-editor/notifications");

export const markChiefNotificationRead = (notificationId: number) =>
  chiefEditorRequest<{ notification_id: number; is_read: boolean }>(
    `/api/chief-editor/notifications/${notificationId}/read`,
    { method: "PUT" }
  );

export const downloadChiefArticleFile = (articleId: number, fileId: number) =>
  chiefEditorRequest<Blob>(
    `/api/chief-editor/articles/${articleId}/files/${fileId}/download`,
    { expectBlob: true }
  );
