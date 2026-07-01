import type { LucideIcon } from "lucide-react";

export type EditorDashboardSection =
  | "dashboard"
  | "submissions"
  | "assigned"
  | "reviewer-assignment"
  | "reviews"
  | "edits"
  | "profile";

export type EditorNavItem = {
  id: EditorDashboardSection;
  label: string;
  icon: LucideIcon;
};

export type ManuscriptStatus = "New Submission" | "Editorial Check" | "Edits Requested" | "Ready for Review";

export type Manuscript = {
  id: string;
  title: string;
  author: string;
  email: string;
  category: string;
  submitted: string;
  status: ManuscriptStatus;
  priority: "High" | "Normal";
  summary: string;
  editNotes: string[];
};

export type AssignedPaperStatus = "Reviewer Assigned" | "Under Review" | "Revision";

export type AssignedPaper = {
  id: string;
  journal: string;
  title: string;
  summary: string;
  author: string;
  coAuthors: number;
  submitted: string;
  status: AssignedPaperStatus;
  tags: string[];
  affiliation: string;
  orcid: string;
  researchArea: string;
  similarity: string;
  corresponding: string;
  fileName: string;
  fileType: string;
  fileSize: string;
};
