import { Bell, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/ink-logo.png";
import type { DashboardNavItem, UserDashboardSection } from "./types";

type UserDashboardNavbarProps = {
  activeSection: UserDashboardSection;
  navItems: DashboardNavItem[];
  onSectionChange: (section: UserDashboardSection) => void;
  unreadCount: number;
};

const UserDashboardNavbar = ({ activeSection, navItems, onSectionChange, unreadCount }: UserDashboardNavbarProps) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img src={logo} alt="International Journal for Invention of Nobel Knowledge" className="h-11 w-auto max-w-[190px] object-contain" />
          <div className="hidden border-l border-slate-200 pl-3 lg:block">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Publisher</p>
            <p className="text-sm font-extrabold text-slate-950">User Dashboard</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onSectionChange("notifications")}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:border-primary hover:text-primary"
            aria-label="Open notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-600 px-1 text-[11px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            type="button"
            className="hidden items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-slate-800 sm:inline-flex"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
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

export default UserDashboardNavbar;
