import type { LucideIcon } from "lucide-react";

export type PublicationSection = "dashboard" | "accepted" | "published" | "profile";

export type PublicationNavItem = {
  id: PublicationSection;
  label: string;
  icon: LucideIcon;
};
