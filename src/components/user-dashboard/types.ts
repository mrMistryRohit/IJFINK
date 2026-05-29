import type { LucideIcon } from "lucide-react";

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

