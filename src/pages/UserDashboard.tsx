import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { BarChart3, Bell, BookOpen, FileText, GitPullRequest, Upload, UserCog } from "lucide-react";
import DashboardOverview from "@/components/user-dashboard/DashboardOverview";
import MySubmissionsPage from "@/components/user-dashboard/MySubmissionsPage";
import NotificationsPanel from "@/components/user-dashboard/NotificationsPanel";
import PublishedPublicationsPage from "@/components/user-dashboard/PublishedPublicationsPage";
import RevisionsPage from "@/components/user-dashboard/RevisionsPage";
import SubmitPublicationForm from "@/components/user-dashboard/SubmitPublicationForm";
import UserDashboardFooter from "@/components/user-dashboard/UserDashboardFooter";
import UserDashboardNavbar from "@/components/user-dashboard/UserDashboardNavbar";
import UserDashboardSidebar from "@/components/user-dashboard/UserDashboardSidebar";
import UserProfilePanel from "@/components/user-dashboard/UserProfilePanel";
import {
  notifications,
  publications,
  publishedPapers,
  revisionRequests,
  userSubmissions,
} from "@/components/user-dashboard/userDashboardData";
import type { DashboardNavItem, UserDashboardSection } from "@/components/user-dashboard/types";
import { logoutUser } from "@/lib/authApi";

const navItems: DashboardNavItem[] = [
  { id: "overview", label: "Dashboard", icon: BarChart3 },
  { id: "submissions", label: "My Submission", icon: FileText },
  { id: "submit", label: "Submit Paper", icon: Upload },
  { id: "revisions", label: "Revisions", icon: GitPullRequest },
  { id: "publications", label: "Publications", icon: BookOpen },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "profile", label: "Profile", icon: UserCog },
];

const userSectionRoutes: Record<UserDashboardSection, string> = {
  overview: "dashboard",
  submissions: "my-submissions",
  submit: "submit-paper",
  revisions: "revisions",
  publications: "publications",
  notifications: "notifications",
  profile: "profile",
};

const userRouteSections = Object.fromEntries(
  Object.entries(userSectionRoutes).map(([section, route]) => [route, section])
) as Record<string, UserDashboardSection>;

const UserDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const unreadCount = notifications.filter((notification) => notification.unread).length;
  const sidebarNavItems = navItems.filter((item) => item.id !== "notifications");
  const sidebarWidthClass = isSidebarCollapsed ? "lg:ml-16" : "lg:ml-[12.5rem]";
  const sectionRoute = location.pathname.split("/").filter(Boolean)[1];
  const activeSection = sectionRoute ? userRouteSections[sectionRoute] : undefined;

  const navigateToSection = (section: UserDashboardSection) => {
    navigate(`/user/${userSectionRoutes[section]}`);
  };

  const logout = async () => {
    await logoutUser();
    navigate("/login", { replace: true });
  };

  if (!activeSection) {
    return <Navigate to="/user/dashboard" replace />;
  }

  const sectionContent = {
    overview: (
      <DashboardOverview
        publications={publications}
        notifications={notifications}
        submissions={userSubmissions}
        onSectionChange={navigateToSection}
      />
    ),
    submissions: <MySubmissionsPage submissions={userSubmissions} onSectionChange={navigateToSection} />,
    submit: <SubmitPublicationForm />,
    revisions: <RevisionsPage revisions={revisionRequests} />,
    publications: <PublishedPublicationsPage papers={publishedPapers} />,
    notifications: <NotificationsPanel notifications={notifications} />,
    profile: <UserProfilePanel />,
  };

  return (
    <div
      className="min-h-screen bg-slate-100 text-slate-900"
      onClickCapture={(event) => {
        if ((event.target as HTMLElement).closest('button[aria-label="Logout"]')) {
          void logout();
        }
      }}
    >
      <UserDashboardSidebar
        activeSection={activeSection}
        navItems={sidebarNavItems}
        onSectionChange={navigateToSection}
        isCollapsed={isSidebarCollapsed}
      />
      <UserDashboardNavbar
        activeSection={activeSection}
        navItems={sidebarNavItems}
        onSectionChange={navigateToSection}
        unreadCount={unreadCount}
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
        sidebarWidthClass={sidebarWidthClass}
      />
      <div className={`min-w-0 transition-all duration-300 ${sidebarWidthClass}`}>
        <main className="mx-auto min-h-[calc(100vh-134px)] max-w-7xl px-4 py-6 md:px-6 md:py-8">
          {sectionContent[activeSection]}
        </main>
        <UserDashboardFooter />
      </div>
    </div>
  );
};

export default UserDashboard;
