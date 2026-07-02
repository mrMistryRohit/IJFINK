import { useEffect, useMemo, useState } from "react";
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
import type { AdminNavItem, AdminProfileData, AdminTab, AdminUser, ContactQuery, NewPrivilegedUser, UserRole } from "@/components/admin-dashboard/types";
import { toast } from "@/hooks/use-toast";
import { createAdminUser, getCurrentAdminProfile, getStoredAuthUser, getAdminUsers, updateAdminUserStatus } from "@/lib/adminApi";
import type { AdminApiUser } from "@/lib/adminApi";
import { getContactQueries, getContactQuery, updateContactQueryStatus } from "@/lib/contactApi";
import type { ContactQueryApi } from "@/lib/contactApi";
import { logoutUser } from "@/lib/authApi";
import { checkApiHealth } from "@/lib/healthApi";

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
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "Editor",
  institution: "",
};

const mapApiUser = (user: AdminApiUser): AdminUser => ({
  id: user.user_id,
  name: user.display_name?.trim() || user.email,
  email: user.email,
  role: (user.role === "Editor" && user.is_chief_editor ? "Chief Editor" : user.role) as UserRole,
  status: user.status,
});

const mapAdminProfile = (user: AdminApiUser): AdminProfileData => ({
  userId: user.user_id,
  name: user.display_name?.trim() || user.email,
  email: user.email,
  role: user.role,
  status: user.status,
});

const getInitialAdminProfile = (): AdminProfileData | null => {
  const user = getStoredAuthUser();
  if (!user) return null;

  return {
    userId: user.user_id,
    name: user.display_name?.trim() || user.email,
    email: user.email,
    role: user.role,
    status: user.status,
  };
};

const formatQueryDate = (value: string) => {
  const parsed = new Date(value.replace(" ", "T"));
  return Number.isNaN(parsed.getTime())
    ? value
    : parsed.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

const mapContactQuery = (query: ContactQueryApi): ContactQuery => ({
  queryId: query.query_id,
  id: `CQ-${query.query_id}`,
  firstName: query.first_name,
  lastName: query.last_name,
  email: query.email,
  subject: query.subject,
  status: query.status,
  date: formatQueryDate(query.created_at),
  createdAt: query.created_at,
  message: query.message,
  resolvedAt: query.resolved_at,
  assignedAdmin: query.assigned_admin,
});

const Admin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [users, setUsers] = useState<ReturnType<typeof mapApiUser>[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [usersError, setUsersError] = useState("");
  const [adminProfile, setAdminProfile] = useState<AdminProfileData | null>(getInitialAdminProfile);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState("");
  const [contactQueries, setContactQueries] = useState<ContactQuery[]>([]);
  const [isLoadingQueries, setIsLoadingQueries] = useState(true);
  const [queriesError, setQueriesError] = useState("");
  const [isUpdatingQuery, setIsUpdatingQuery] = useState(false);
  const [isSystemOnline, setIsSystemOnline] = useState<boolean | null>(null);
  const [updatingUserId, setUpdatingUserId] = useState<number | null>(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState<ContactQuery | null>(null);
  const [createUserError, setCreateUserError] = useState("");
  const [newUser, setNewUser] = useState<NewPrivilegedUser>(emptyNewUser);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const sidebarWidthClass = isSidebarCollapsed ? "lg:ml-16" : "lg:ml-[12.5rem]";
  const sectionRoute = location.pathname.split("/").filter(Boolean)[1];
  const activeTab = sectionRoute ? adminRouteSections[sectionRoute] : undefined;

  useEffect(() => {
    let isCurrent = true;

    const loadUsers = async () => {
      try {
        const apiUsers = await getAdminUsers();
        if (isCurrent) setUsers(apiUsers.map(mapApiUser));
      } catch (error) {
        if (isCurrent) setUsersError(error instanceof Error ? error.message : "Unable to load users.");
      } finally {
        if (isCurrent) setIsLoadingUsers(false);
      }
    };

    const loadProfile = async () => {
      try {
        const profile = await getCurrentAdminProfile();
        if (isCurrent) setAdminProfile(mapAdminProfile(profile));
      } catch (error) {
        if (isCurrent) setProfileError(error instanceof Error ? error.message : "Unable to load the admin profile.");
      } finally {
        if (isCurrent) setIsLoadingProfile(false);
      }
    };

    const loadQueries = async () => {
      try {
        const queries = await getContactQueries();
        if (isCurrent) setContactQueries(queries.map(mapContactQuery));
      } catch (error) {
        if (isCurrent) setQueriesError(error instanceof Error ? error.message : "Unable to load contact queries.");
      } finally {
        if (isCurrent) setIsLoadingQueries(false);
      }
    };

    const loadHealth = async () => {
      const isOnline = await checkApiHealth();
      if (isCurrent) setIsSystemOnline(isOnline);
    };

    loadUsers();
    loadProfile();
    loadQueries();
    loadHealth();
    const healthInterval = window.setInterval(loadHealth, 30000);
    return () => {
      isCurrent = false;
      window.clearInterval(healthInterval);
    };
  }, []);

  const navigateToTab = (tab: AdminTab) => {
    navigate(`/admin/${adminSectionRoutes[tab]}`);
  };

  const logout = async () => {
    await logoutUser();
    navigate("/login", { replace: true });
  };

  const roleCounts = useMemo(
    () =>
      users.reduce(
        (counts, user) => ({
          ...counts,
          [user.role]: counts[user.role] + 1,
        }),
        { Author: 0, Editor: 0, "Chief Editor": 0, Admin: 0, "Publication Team": 0 } as Record<UserRole, number>
      ),
    [users]
  );

  const retryUsers = async () => {
    setIsLoadingUsers(true);
    setUsersError("");

    try {
      const apiUsers = await getAdminUsers();
      setUsers(apiUsers.map(mapApiUser));
    } catch (error) {
      setUsersError(error instanceof Error ? error.message : "Unable to load users.");
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const retryQueries = async () => {
    setIsLoadingQueries(true);
    setQueriesError("");

    try {
      const queries = await getContactQueries();
      setContactQueries(queries.map(mapContactQuery));
    } catch (error) {
      setQueriesError(error instanceof Error ? error.message : "Unable to load contact queries.");
    } finally {
      setIsLoadingQueries(false);
    }
  };

  const openQueryDetails = async (queryId: number) => {
    const preview = contactQueries.find((query) => query.queryId === queryId);
    if (preview) setSelectedQuery(preview);

    try {
      const query = mapContactQuery(await getContactQuery(queryId));
      setSelectedQuery(query);
      setContactQueries((current) => current.map((item) => (item.queryId === queryId ? query : item)));
    } catch (error) {
      setSelectedQuery(null);
      toast({
        title: "Query details unavailable",
        description: error instanceof Error ? error.message : "Unable to load this contact query.",
        variant: "destructive",
      });
    }
  };

  const changeQueryStatus = async (status: "Pending" | "Resolved") => {
    if (!selectedQuery) return;

    setIsUpdatingQuery(true);
    try {
      const response = await updateContactQueryStatus(selectedQuery.queryId, status);
      const resolvedAt = response.data?.resolved_at ?? null;
      setContactQueries((current) =>
        current.map((query) =>
          query.queryId === selectedQuery.queryId ? { ...query, status, resolvedAt } : query
        )
      );
      setSelectedQuery((current) => (current ? { ...current, status, resolvedAt } : current));
      toast({
        title: status === "Resolved" ? "Query resolved" : "Query reopened",
        description: response.message ?? `The query is now ${status.toLowerCase()}.`,
      });
    } catch (error) {
      toast({
        title: "Status update failed",
        description: error instanceof Error ? error.message : "Unable to update the query.",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingQuery(false);
    }
  };

  const toggleUserStatus = async (userId: number) => {
    const user = users.find((item) => item.id === userId);
    if (!user) return;

    setUpdatingUserId(userId);
    try {
      const response = await updateAdminUserStatus(userId, user.status === "Active" ? "Inactive" : "Active");
      const updatedUser = mapApiUser(response.data!.user);
      if (user.role === "Chief Editor" && updatedUser.role === "Editor") {
        updatedUser.role = "Chief Editor";
      }
      setUsers((currentUsers) => currentUsers.map((item) => (item.id === userId ? updatedUser : item)));
      toast({
        title: "User status updated",
        description: response.message ?? `${updatedUser.name} is now ${updatedUser.status.toLowerCase()}.`,
      });
    } catch (error) {
      toast({
        title: "Status update failed",
        description: error instanceof Error ? error.message : "Unable to update this user.",
        variant: "destructive",
      });
    } finally {
      setUpdatingUserId(null);
    }
  };

  const openCreateUserModal = () => {
    setCreateUserError("");
    setShowCreateUser(true);
  };

  const closeCreateUserModal = () => {
    setShowCreateUser(false);
    setCreateUserError("");
  };

  const createPrivilegedUser = async () => {
    if (!newUser.firstName.trim() || !newUser.lastName.trim() || !newUser.email.trim() || !newUser.password || !newUser.confirmPassword) {
      setCreateUserError("Complete all fields before creating the user.");
      return;
    }

    const isEditorAccount = newUser.role === "Editor" || newUser.role === "Chief Editor";

    if (isEditorAccount && !newUser.institution.trim()) {
      setCreateUserError("Institution is required when creating an Editor or Chief Editor.");
      return;
    }

    if (newUser.password !== newUser.confirmPassword) {
      setCreateUserError("Password and confirm password must match.");
      return;
    }

    setIsCreatingUser(true);
    setCreateUserError("");

    try {
      const apiRole =
        newUser.role === "Publication Team"
          ? "publication team"
          : isEditorAccount
            ? "editor"
            : "admin";
      const response = await createAdminUser({
        first_name: newUser.firstName.trim(),
        last_name: newUser.lastName.trim(),
        email: newUser.email.trim(),
        password: newUser.password,
        confirm_password: newUser.confirmPassword,
        role: apiRole,
        ...(isEditorAccount ? { institution: newUser.institution.trim() } : {}),
        ...(newUser.role === "Chief Editor" ? { is_chief_editor: true } : {}),
      });
      const createdUser = mapApiUser({
        ...response.data!.user,
        is_chief_editor: newUser.role === "Chief Editor",
      });
      setUsers((currentUsers) => [...currentUsers, createdUser]);
      setNewUser(emptyNewUser);
      setShowCreateUser(false);
      toast({
        title: `${newUser.role} created`,
        description: response.message ?? "The account is ready to use.",
      });
    } catch (error) {
      setCreateUserError(error instanceof Error ? error.message : "Unable to create this account.");
    } finally {
      setIsCreatingUser(false);
    }
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
        isSystemOnline={isSystemOnline}
      />
    ),
    users: (
      <UserManagementPage
        users={users}
        isLoading={isLoadingUsers}
        loadError={usersError}
        updatingUserId={updatingUserId}
        onCreateUserClick={openCreateUserModal}
        onRetry={retryUsers}
        onToggleUserStatus={toggleUserStatus}
      />
    ),
    queries: (
      <ContactQueriesPage
        queries={contactQueries}
        isLoading={isLoadingQueries}
        loadError={queriesError}
        onRetry={retryQueries}
        onSelectQuery={openQueryDetails}
      />
    ),
    profile: <AdminProfilePanel profile={adminProfile} isLoading={isLoadingProfile} error={profileError} />,
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <AdminDashboardSidebar
        activeTab={activeTab}
        navItems={navItems}
        onTabChange={navigateToTab}
        onLogout={logout}
        isCollapsed={isSidebarCollapsed}
      />
      <AdminDashboardNavbar
        activeTab={activeTab}
        navItems={navItems}
        onTabChange={navigateToTab}
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
        sidebarWidthClass={sidebarWidthClass}
        profileName={adminProfile?.name ?? "Admin"}
      />
      <div className={`min-w-0 transition-all duration-300 ${sidebarWidthClass}`}>
        <main className="mx-auto min-h-[calc(100vh-76px)] max-w-7xl px-4 py-6 md:px-6 md:py-8">{sectionContent[activeTab]}</main>
      </div>

      {showCreateUser && (
        <CreateUserModal
          createUserError={createUserError}
          newUser={newUser}
          isCreating={isCreatingUser}
          onClose={closeCreateUserModal}
          onCreateUser={createPrivilegedUser}
          onNewUserChange={setNewUser}
        />
      )}

      {selectedQuery && (
        <QueryDetailsModal
          query={selectedQuery}
          isUpdating={isUpdatingQuery}
          onClose={() => setSelectedQuery(null)}
          onStatusChange={changeQueryStatus}
        />
      )}
    </div>
  );
};

export default Admin;
