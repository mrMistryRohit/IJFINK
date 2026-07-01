import { useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { BarChart3, MessageSquareText, UserCog, Users } from "lucide-react";
import AdminDashboardNavbar from "@/components/admin-dashboard/AdminDashboardNavbar";
import AdminDashboardSidebar from "@/components/admin-dashboard/AdminDashboardSidebar";
import AdminOverview from "@/components/admin-dashboard/AdminOverview";
import AdminProfilePanel from "@/components/admin-dashboard/AdminProfilePanel";
import ContactQueriesPage from "@/components/admin-dashboard/ContactQueriesPage";
import CreateUserModal from "@/components/admin-dashboard/CreateUserModal";
import QueryDetailsModal from "@/components/admin-dashboard/QueryDetailsModal";
import UserManagementPage from "@/components/admin-dashboard/UserManagementPage";
import { contactQueries, initialUsers } from "@/components/admin-dashboard/adminDashboardData";
import type { AdminNavItem, AdminTab, ContactQuery, NewPrivilegedUser, UserRole } from "@/components/admin-dashboard/types";

const navItems: AdminNavItem[] = [
  { id: "dashboard", label: "Admin Dashboard", icon: BarChart3 },
  { id: "users", label: "User Management", icon: Users },
  { id: "queries", label: "Contact Queries", icon: MessageSquareText },
  { id: "profile", label: "Admin Profile", icon: UserCog },
];

const adminSectionRoutes: Record<AdminTab, string> = {
  dashboard: "dashboard",
  users: "user-management",
  queries: "contact-queries",
  profile: "profile",
};

const adminRouteSections = Object.fromEntries(
  Object.entries(adminSectionRoutes).map(([section, route]) => [route, section])
) as Record<string, AdminTab>;

const emptyNewUser: NewPrivilegedUser = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "Reviewer",
};

const Admin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [users, setUsers] = useState(initialUsers);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState<ContactQuery | null>(null);
  const [createUserError, setCreateUserError] = useState("");
  const [newUser, setNewUser] = useState<NewPrivilegedUser>(emptyNewUser);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const sidebarWidthClass = isSidebarCollapsed ? "lg:ml-16" : "lg:ml-[12.5rem]";
  const sectionRoute = location.pathname.split("/").filter(Boolean)[1];
  const activeTab = sectionRoute ? adminRouteSections[sectionRoute] : undefined;

  const navigateToTab = (tab: AdminTab) => {
    navigate(`/admin/${adminSectionRoutes[tab]}`);
  };

  const roleCounts = useMemo(
    () =>
      users.reduce(
        (counts, user) => ({
          ...counts,
          [user.role]: counts[user.role] + 1,
        }),
        { User: 0, Reviewer: 0, Editor: 0, Admin: 0 } as Record<UserRole, number>
      ),
    [users]
  );

  const toggleUserStatus = (userId: number) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === userId ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" } : user
      )
    );
  };

  const openCreateUserModal = () => {
    setCreateUserError("");
    setShowCreateUser(true);
  };

  const closeCreateUserModal = () => {
    setShowCreateUser(false);
    setCreateUserError("");
  };

  const createPrivilegedUser = () => {
    if (!newUser.name.trim() || !newUser.email.trim() || !newUser.password || !newUser.confirmPassword) {
      setCreateUserError("Complete all fields before creating the user.");
      return;
    }

    if (newUser.password !== newUser.confirmPassword) {
      setCreateUserError("Password and confirm password must match.");
      return;
    }

    setUsers((currentUsers) => [
      ...currentUsers,
      {
        id: Math.max(...currentUsers.map((user) => user.id)) + 1,
        name: newUser.name.trim(),
        email: newUser.email.trim(),
        role: newUser.role,
        status: "Active",
      },
    ]);
    setNewUser(emptyNewUser);
    setCreateUserError("");
    setShowCreateUser(false);
  };

  if (!activeTab) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const sectionContent = {
    dashboard: (
      <AdminOverview
        totalUsers={users.length}
        activeUsers={users.filter((user) => user.status === "Active").length}
        queryCount={contactQueries.length}
        roleCounts={roleCounts}
      />
    ),
    users: <UserManagementPage users={users} onCreateUserClick={openCreateUserModal} onToggleUserStatus={toggleUserStatus} />,
    queries: <ContactQueriesPage queries={contactQueries} onSelectQuery={setSelectedQuery} />,
    profile: <AdminProfilePanel />,
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <AdminDashboardSidebar activeTab={activeTab} navItems={navItems} onTabChange={navigateToTab} isCollapsed={isSidebarCollapsed} />
      <AdminDashboardNavbar
        activeTab={activeTab}
        navItems={navItems}
        onTabChange={navigateToTab}
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
        sidebarWidthClass={sidebarWidthClass}
      />
      <div className={`min-w-0 transition-all duration-300 ${sidebarWidthClass}`}>
        <main className="mx-auto min-h-[calc(100vh-76px)] max-w-7xl px-4 py-6 md:px-6 md:py-8">{sectionContent[activeTab]}</main>
      </div>

      {showCreateUser && (
        <CreateUserModal
          createUserError={createUserError}
          newUser={newUser}
          onClose={closeCreateUserModal}
          onCreateUser={createPrivilegedUser}
          onNewUserChange={setNewUser}
        />
      )}

      {selectedQuery && <QueryDetailsModal query={selectedQuery} onClose={() => setSelectedQuery(null)} />}
    </div>
  );
};

export default Admin;
