import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { editorProfile } from "./editorDashboardData";
import type { EditorDashboardSection, EditorNavItem } from "./types";

type EditorDashboardNavbarProps = {
  activeSection: EditorDashboardSection;
  navItems: EditorNavItem[];
  onSectionChange: (section: EditorDashboardSection) => void;
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  sidebarWidthClass: string;
};

const EditorDashboardNavbar = ({
  activeSection,
  navItems,
  onSectionChange,
  isSidebarCollapsed,
  onToggleSidebar,
  sidebarWidthClass,
}: EditorDashboardNavbarProps) => {
  const initials = editorProfile.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className={`sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur transition-all duration-300 ${sidebarWidthClass}`}>
      <div className="mx-auto flex min-h-[76px] w-full items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:border-primary hover:text-primary lg:flex"
            aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isSidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>

        <button
          type="button"
          onClick={() => onSectionChange("profile")}
          className={`hidden items-center justify-center gap-2 rounded-full px-1.5 py-1.5 pr-3 text-sm font-bold transition-colors sm:inline-flex ${
            activeSection === "profile" ? "bg-primary/10 text-slate-950" : "text-slate-950 hover:bg-slate-100"
          }`}
          aria-label="Open editor profile"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-extrabold text-white shadow-sm shadow-primary/25">
            {initials}
          </span>
          <span>{editorProfile.name}</span>
        </button>
      </div>

      <div className="border-t border-slate-100 px-4 py-3 lg:hidden">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSectionChange(item.id)}
              className={`inline-flex min-h-10 flex-shrink-0 items-center gap-2 rounded-xl px-4 text-xs font-bold ${
                activeSection === item.id ? "bg-primary text-white" : "bg-slate-100 text-slate-600"
              }`}
            >
              <item.icon size={15} />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default EditorDashboardNavbar;

