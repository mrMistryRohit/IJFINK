import inkIcon from "@/assets/ink-icon.png";
import { LogOut } from "lucide-react";
import type { PublicationNavItem, PublicationSection } from "./types";

type Props = {
  activeSection: PublicationSection;
  navItems: PublicationNavItem[];
  onSectionChange: (section: PublicationSection) => void;
  onLogout: () => void;
  isCollapsed: boolean;
};

const PublicationDashboardSidebar = ({ activeSection, navItems, onSectionChange, onLogout, isCollapsed }: Props) => (
  <aside className={`fixed bottom-0 left-0 top-0 z-40 hidden border-r border-white/10 bg-gradient-to-b from-[hsl(220,55%,10%)] via-[hsl(220,48%,13%)] to-[hsl(168,55%,14%)] text-white transition-all duration-300 lg:flex lg:flex-col ${isCollapsed ? "w-16" : "w-[12.5rem]"}`}>
    <div className={`flex items-center border-b border-white/10 px-4 ${isCollapsed ? "justify-center py-5" : "py-4"}`}>
      <div className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"}`}>
        <img src={inkIcon} alt="INK" className="h-10 w-10 rounded-xl object-contain" />
        {!isCollapsed && <div className="leading-tight"><p className="text-sm font-extrabold tracking-wide">IJFINK</p><p className="text-xs font-semibold text-white/70">Publishing Desk</p></div>}
      </div>
    </div>
    <nav className={`space-y-2 ${isCollapsed ? "p-2" : "p-3"}`}>
      {navItems.map((item) => (
        <button key={item.id} type="button" onClick={() => onSectionChange(item.id)} title={isCollapsed ? item.label : undefined} className={`flex items-center rounded-xl text-left text-sm font-bold transition-colors ${activeSection === item.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-white/65 hover:bg-white/[0.08] hover:text-white"} ${isCollapsed ? "mx-auto h-10 w-10 justify-center p-0" : "w-full gap-3 px-4 py-3"}`}>
          <item.icon size={isCollapsed ? 20 : 18} className="shrink-0" />{!isCollapsed && item.label}
        </button>
      ))}
    </nav>
    <div className={`mt-auto ${isCollapsed ? "p-2" : "p-3"}`}>
      <button type="button" onClick={onLogout} className={`flex items-center rounded-xl border border-white/10 bg-white/[0.06] text-sm font-bold text-white/80 transition-colors hover:border-rose-400 hover:bg-rose-500 hover:text-white ${isCollapsed ? "mx-auto h-10 w-10 justify-center" : "w-full gap-3 px-4 py-3"}`}>
        <LogOut size={18} />{!isCollapsed && "Logout"}
      </button>
    </div>
  </aside>
);

export default PublicationDashboardSidebar;
