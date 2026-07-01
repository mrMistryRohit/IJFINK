import type { LucideIcon } from "lucide-react";

export type AdminTab = "dashboard" | "users" | "queries" | "profile";

export type UserRole = "User" | "Reviewer" | "Editor" | "Admin";

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
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  institution: string;
  subject: string;
  status: string;
  date: string;
  message: string;
};

export type NewPrivilegedUser = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: Exclude<UserRole, "User">;
};
