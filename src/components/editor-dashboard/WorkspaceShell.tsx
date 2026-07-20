import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import inkIcon from "@/assets/ink-icon.png";
import type { AuthUser } from "@/lib/authApi";

export type WorkspaceNavItem<T extends string> = { id: T; label: string; icon: LucideIcon };

type Props<T extends string> = {
  activeSection: T;
  navItems: WorkspaceNavItem<T>[];
  onSectionChange: (section: T) => void;
  onLogout: () => void;
  user: AuthUser | null;
  deskLabel: string;
  fallbackName: string;
  isCollapsed: boolean;
  onToggleSidebar: () => void;
  children: ReactNode;
};

const WorkspaceShell = <T extends string>({ activeSection, navItems, onSectionChange, onLogout, user, deskLabel, fallbackName, isCollapsed, onToggleSidebar, children }: Props<T>) => {
  const sidebarWidth = isCollapsed ? "lg:ml-16" : "lg:ml-[12.5rem]";
  const name = user?.display_name?.trim() || fallbackName;
  const initials = name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  return <div className="min-h-screen bg-slate-100 text-slate-900">
    <aside className={`fixed bottom-0 left-0 top-0 z-40 hidden border-r border-white/10 bg-gradient-to-b from-[hsl(220,55%,10%)] via-[hsl(220,48%,13%)] to-[hsl(168,55%,14%)] text-white transition-all duration-300 lg:flex lg:flex-col ${isCollapsed ? "w-16" : "w-[12.5rem]"}`}>
      <div className={`flex items-center border-b border-white/10 px-4 ${isCollapsed ? "justify-center py-5" : "gap-3 py-4"}`}><img src={inkIcon} alt="IJFINK" className="h-10 w-10 rounded-xl object-contain" />{!isCollapsed && <div><p className="text-sm font-extrabold">IJFINK</p><p className="text-xs font-semibold text-white/65">{deskLabel}</p></div>}</div>
      <nav className={`space-y-2 overflow-y-auto ${isCollapsed ? "p-2" : "p-3"}`}>{navItems.map((item) => <button key={item.id} type="button" onClick={() => onSectionChange(item.id)} title={isCollapsed ? item.label : undefined} className={`flex items-center rounded-xl text-left text-sm font-bold transition-colors ${activeSection === item.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-white/65 hover:bg-white/[0.08] hover:text-white"} ${isCollapsed ? "mx-auto h-10 w-10 justify-center" : "w-full gap-3 px-4 py-3"}`}><item.icon size={18} className="shrink-0" />{!isCollapsed && item.label}</button>)}</nav>
      <div className={`mt-auto ${isCollapsed ? "p-2" : "p-3"}`}><button type="button" onClick={onLogout} className={`flex items-center rounded-xl border border-white/10 bg-white/[0.06] text-sm font-bold text-white/80 hover:bg-rose-500 ${isCollapsed ? "mx-auto h-10 w-10 justify-center" : "w-full gap-3 px-4 py-3"}`}><LogOut size={18} />{!isCollapsed && "Logout"}</button></div>
    </aside>
    <header className={`sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur transition-all duration-300 ${sidebarWidth}`}>
      <div className="flex min-h-[76px] items-center justify-between px-4 md:px-6"><button type="button" onClick={onToggleSidebar} className="hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:border-primary hover:text-primary lg:flex" aria-label="Toggle sidebar">{isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}</button><span className="hidden items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3 text-sm font-bold sm:flex"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-extrabold text-white">{initials}</span>{name}</span></div>
      <div className="border-t border-slate-100 px-4 py-3 lg:hidden"><div className="flex gap-2 overflow-x-auto">{navItems.map((item) => <button key={item.id} type="button" onClick={() => onSectionChange(item.id)} className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-xl px-4 text-xs font-bold ${activeSection === item.id ? "bg-primary text-white" : "bg-slate-100 text-slate-600"}`}><item.icon size={15} />{item.label}</button>)}</div></div>
    </header>
    <div className={`min-w-0 transition-all duration-300 ${sidebarWidth}`}><main className="mx-auto min-h-[calc(100vh-76px)] max-w-7xl px-4 py-6 md:px-6 md:py-8">{children}</main></div>
  </div>;
};

export default WorkspaceShell;
