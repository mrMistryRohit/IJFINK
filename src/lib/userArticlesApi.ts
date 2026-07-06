import { API_BASE_URL, getApiUrl } from "@/lib/apiConfig";

export type UserArticleAuthor = {
  author_id?: number;
  user_id?: number;
  first_name?: string;
  last_name?: string;
  name?: string;
  display_name?: string;
  institution?: string;
  orcid?: string | null;
  phone_number?: string | null;
  email?: string;
};

export type UserArticleFile = {
  file_id?: number;
  file_name?: string;
  file_type?: string;
  file_path?: string;
  file_url?: string;
  version?: number;
  uploaded_at?: string;
};

export type UserArticleCoAuthor = {
  co_author_id?: number;
  full_name?: string;
  email?: string;
  institution?: string;
  orcid?: string | null;
  author_order?: number;
};

export type UserArticleScreening = {
  screening_id?: number;
  decision?: string;
  remarks?: string;
  screened_by?: string;
  screened_at?: string;
  status?: string;
} | null;

export type UserArticle = {
  article_id: number;
  title: string;
  abstract?: string | null;
  keywords?: string[] | string | null;
  article_type?: string;
  subject_area?: string;
  status?: string;
  submitted_at?: string;
  updated_at?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  institution?: string;
  orcid?: string | null;
  phone_number?: string | null;
  author?: UserArticleAuthor;
  co_authors?: UserArticleCoAuthor[];
  files?: UserArticleFile[];
  thumbnail_url?: string;
  cover_image_url?: string;
};

export type UserArticleDetail = {
  article: UserArticle & {
    screening?: UserArticleScreening;
  };
  author?: UserArticleAuthor;
  co_authors?: UserArticleCoAuthor[];
  files?: UserArticleFile[];
  revisions?: Array<{
    editorial_review_id?: number;
    revision_id?: number;
    revision_number?: number;
    response_letter?: string;
    file_name?: string;
    file_path?: string;
    file_version?: number;
    submitted_at?: string;
    updated_at?: string;
    comments?: string;
  }>;
  screening?: UserArticleScreening;
};

export type EditorialReviewRecord = {
  editorial_review_id?: number;
  assignment_id?: number;
  editor_id?: number;
  decision?: string;
  comments?: string;
  reviewed_at?: string;
};

export type UserEditorialReviewDetails = {
  article_id: number;
  article_status: string;
  current_review?: EditorialReviewRecord | null;
  review_history?: EditorialReviewRecord[];
};

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function getAccessToken() {
  return localStorage.getItem("access_token") ?? sessionStorage.getItem("access_token");
}

async function parseResponse<T>(response: Response) {
  const data = (await response.json().catch(() => null)) as ApiResponse<T> | null;

  if (!response.ok || !data?.success) {
    const message = data?.message ?? "The article request could not be completed.";
    const authSuffix = response.status === 401 || response.status === 403 ? " Please sign in again." : "";
    throw new ApiError(`${message}${authSuffix}`.trim(), response.status);
  }

  return data;
}

async function userRequest<T>(path: string, init?: RequestInit) {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new ApiError("Your session is missing. Please sign in again.", 401);
  }

  try {
    const response = await fetch(getApiUrl(path), {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        ...init?.headers,
      },
    });

    return await parseResponse<T>(response);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(`Cannot reach the backend at ${API_BASE_URL}. Please try again later.`);
    }

    throw error;
  }
}

export async function getMyArticles() {
  const response = await userRequest<{ articles: UserArticle[]; total_count: number; author?: UserArticleAuthor }>(
    "/api/user/articles"
  );

  return response.data?.articles ?? [];
}

export async function getMyArticleDetails(articleId: number) {
  const response = await userRequest<UserArticleDetail>(`/api/user/articles/${articleId}`);
  return response.data ?? null;
}

export async function submitArticleRevision(articleId: number, revisionData: { editorial_review_id: number; response_letter: string }, revisionFile: File) {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new ApiError("Your session is missing. Please sign in again.", 401);
  }

  const formData = new FormData();
  formData.append("revision_data", JSON.stringify(revisionData));
  formData.append("revision_file", revisionFile);

  const response = await fetch(getApiUrl(`/api/user/articles/${articleId}/revisions`), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  return await parseResponse<{ article?: UserArticle; revision?: unknown }>(response);
}


export async function getMyEditorialReviewDetails(articleId: number) {
  const response = await userRequest<UserEditorialReviewDetails>(`/api/user/articles/${articleId}/editorial-review`);
  return response.data ?? null;
}
