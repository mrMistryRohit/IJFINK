import type { LucideIcon } from "lucide-react";
import type { AuthUser } from "@/lib/authApi";
import type { UserArticle } from "@/lib/userArticlesApi";

export type UserDashboardSection =
  | "overview"
  | "submissions"
  | "submit"
  | "revisions"
  | "publications"
  | "notifications"
  | "profile";

export type DashboardNavItem = {
  id: UserDashboardSection;
  label: string;
  icon: LucideIcon;
};

export type PublicationStatus = "Submitted" | "Editorial Check" | "Edits Requested" | "Reviewer Update" | "Accepted" | "Published";
export type SubmissionStatus = "Under Review" | "Revision Requested" | "Accepted" | "Submitted" | "Draft" | "Rejected";

export type Publication = {
  id: string;
  title: string;
  articleType: string;
  submitted: string;
  status: PublicationStatus;
  editor: string;
  lastUpdate: string;
};

export type UserNotification = {
  id: string;
  title: string;
  source: "Editor" | "Reviewer" | "System";
  message: string;
  date: string;
  unread: boolean;
};

export type UserSubmission = {
  id: string;
  manuscript: string;
  journal: string;
  status: SubmissionStatus;
  date: string;
};

export type ArticleStatus =
  | "Submitted"
  | "Admin Approved"
  | "Editorial Review"
  | "Revision Requested"
  | "Accepted"
  | "Publication Review"
  | "Submitted To Organization"
  | "Published"
  | "Rejected"
  | string;

export type ArticleListItem = {
  articleId: number;
  title: string;
  abstract: string;
  articleType: string;
  subjectArea: string;
  status: ArticleStatus;
  submittedAt: string;
  updatedAt: string;
  authorName: string;
  authorInstitution?: string;
  coAuthorCount: number;
  keywords: string[];
  thumbnailUrl?: string | null;
  files: Array<{
    fileName?: string;
    fileType?: string;
    filePath?: string;
    fileUrl?: string;
  }>;
};

export type RevisionComment = {
  id: string;
  reviewer: string;
  section: string;
  severity: "Minor Revision" | "Major Revision";
  comment: string;
};

export type RevisionRequest = UserSubmission & {
  responseLetter: string;
  comments: RevisionComment[];
};

export type PublishedPaper = {
  id: string;
  title: string;
  journal: string;
  publishedDate: string;
  cites: number;
  downloads: number;
  views: number;
};

export type AuthorProfile = Pick<AuthUser, "user_id" | "email" | "role" | "status" | "display_name" | "profile_id">;

export type AuthorDashboardState = {
  profile: AuthorProfile | null;
  articles: UserArticle[];
  isLoading: boolean;
  error: string | null;
};
