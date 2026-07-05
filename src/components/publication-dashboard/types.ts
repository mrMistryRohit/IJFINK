import type { LucideIcon } from "lucide-react";

export type PublicationSection = "dashboard" | "accepted" | "queue" | "published" | "profile";

export type PublicationNavItem = {
  id: PublicationSection;
  label: string;
  icon: LucideIcon;
};
