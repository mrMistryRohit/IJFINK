import type { DashboardNavItem, UserDashboardSection } from "./types";

type UserDashboardSidebarProps = {
  activeSection: UserDashboardSection;
  navItems: DashboardNavItem[];
  onSectionChange: (section: UserDashboardSection) => void;
};

const UserDashboardSidebar = ({ activeSection, navItems, onSectionChange }: UserDashboardSidebarProps) => {
  return (
    <aside className="fixed bottom-0 left-0 top-[76px] z-30 hidden w-72 border-r border-white/10 bg-gradient-to-b from-[hsl(220,55%,10%)] via-[hsl(220,48%,13%)] to-[hsl(168,55%,14%)] p-5 text-white lg:flex lg:flex-col">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSectionChange(item.id)}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition-colors ${
              activeSection === item.id
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "text-white/65 hover:bg-white/[0.08] hover:text-white"
            }`}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default UserDashboardSidebar;
