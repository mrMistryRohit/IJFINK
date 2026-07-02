import type { LucideIcon } from "lucide-react";

export type AdminTab = "dashboard" | "users" | "queries" | "profile";

export type UserRole = "Author" | "Editor" | "Chief Editor" | "Admin" | "Publication Team";

export type AdminUser = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: "Active" | "Inactive";
};

export type AdminNavItem = {
  id: AdminTab;
  label: string;
  icon: LucideIcon;
};

export type ContactQuery = {
  queryId: number;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  status: "Pending" | "Resolved";
  date: string;
  createdAt: string;
  message: string;
  resolvedAt?: string | null;
  assignedAdmin?: string | null;
};

export type NewPrivilegedUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "Admin" | "Editor" | "Chief Editor" | "Publication Team";
  institution: string;
};

export type AdminProfileData = {
  userId: number;
  name: string;
  email: string;
  role: string;
  status: string;
};
