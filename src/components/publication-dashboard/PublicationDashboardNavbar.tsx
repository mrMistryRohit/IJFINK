import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import type { AuthUser } from "@/lib/authApi";
import type { PublicationNavItem, PublicationSection } from "./types";

type Props = {
  activeSection: PublicationSection;
  navItems: PublicationNavItem[];
  onSectionChange: (section: PublicationSection) => void;
  user: AuthUser | null;
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  sidebarWidthClass: string;
};

const PublicationDashboardNavbar = ({ activeSection, navItems, onSectionChange, user, isSidebarCollapsed, onToggleSidebar, sidebarWidthClass }: Props) => {
  const name = user?.display_name?.trim() || "Publication Team";
  const initials = name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  return (
    <header className={`sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur transition-all duration-300 ${sidebarWidthClass}`}>
      <div className="mx-auto flex min-h-[76px] items-center justify-between gap-4 px-4 md:px-6">
        <button type="button" onClick={onToggleSidebar} className="hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:border-primary hover:text-primary lg:flex" aria-label="Toggle sidebar">
          {isSidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
        <button type="button" onClick={() => onSectionChange("profile")} className={`hidden items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3 text-sm font-bold sm:inline-flex ${activeSection === "profile" ? "bg-primary/10" : "hover:bg-slate-100"}`}>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-extrabold text-white">{initials}</span>{name}
        </button>
      </div>
      <div className="border-t border-slate-100 px-4 py-3 lg:hidden">
        <div className="flex gap-2 overflow-x-auto">
          {navItems.map((item) => <button key={item.id} type="button" onClick={() => onSectionChange(item.id)} className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-xl px-4 text-xs font-bold ${activeSection === item.id ? "bg-primary text-white" : "bg-slate-100 text-slate-600"}`}><item.icon size={15} />{item.label}</button>)}
        </div>
      </div>
    </header>
  );
};

export default PublicationDashboardNavbar;
