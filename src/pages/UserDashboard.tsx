import { useEffect, useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { BarChart3, Bell, BookOpen, FileText, GitPullRequest, Upload, UserCog } from "lucide-react";
import DashboardOverview from "@/components/user-dashboard/DashboardOverview";
import MySubmissionDetailsPage from "@/components/user-dashboard/MySubmissionDetailsPage";
import MySubmissionsPage from "@/components/user-dashboard/MySubmissionsPage";
import NotificationsPanel from "@/components/user-dashboard/NotificationsPanel";
import PublishedPublicationsPage from "@/components/user-dashboard/PublishedPublicationsPage";
import RevisionsPage from "@/components/user-dashboard/RevisionsPage";
import SubmitPublicationForm from "@/components/user-dashboard/SubmitPublicationForm";
import UserDashboardFooter from "@/components/user-dashboard/UserDashboardFooter";
import UserDashboardNavbar from "@/components/user-dashboard/UserDashboardNavbar";
import UserDashboardSidebar from "@/components/user-dashboard/UserDashboardSidebar";
import UserProfilePanel from "@/components/user-dashboard/UserProfilePanel";
import type { DashboardNavItem, UserDashboardSection } from "@/components/user-dashboard/types";
import { clearAuthSession, logoutUser, getStoredAuthUser } from "@/lib/authApi";
import { ApiError, getMyArticles, type UserArticle } from "@/lib/userArticlesApi";

const navItems: DashboardNavItem[] = [
  { id: "overview", label: "Dashboard", icon: BarChart3 },
  { id: "submissions", label: "My Articles", icon: FileText },
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

const userRouteSections = Object.fromEntries(Object.entries(userSectionRoutes).map(([section, route]) => [route, section])) as Record<string, UserDashboardSection>;
const NOTIFICATIONS_VIEWED_KEY = "user_notifications_viewed_at";

const UserDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [profile] = useState(() => getStoredAuthUser());
  const [articles, setArticles] = useState<UserArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notificationsViewedAt, setNotificationsViewedAt] = useState(() => Number(localStorage.getItem(NOTIFICATIONS_VIEWED_KEY) ?? 0));

  const loadArticles = async () => {
    setIsLoading(true);
    setError(null);

    try {
      setArticles(await getMyArticles());
    } catch (caughtError) {
      if (caughtError instanceof ApiError && (caughtError.status === 401 || caughtError.status === 403)) {
        clearAuthSession();
        await logoutUser();
        navigate("/login", { replace: true });
        return;
      }

      setError(caughtError instanceof Error ? caughtError.message : "We could not load your articles.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadArticles();
  }, []);

  const sectionRoute = location.pathname.split("/").filter(Boolean)[1];
  const activeSection = sectionRoute ? userRouteSections[sectionRoute] : undefined;
  const isArticleDetailsRoute = /^\/user\/my-submission(s)?\/\d+\/details$/.test(location.pathname);
  const isRevisionSubmissionRoute = /^\/user\/my-submissions\/revision\/revision-submission\/\d+$/.test(location.pathname) || /^\/user\/my-submission\/revision\/revision-submission\/\d+$/.test(location.pathname);
  const unreadCount = useMemo(
    () =>
      articles.filter((article) => {
        if (!article.updated_at && !article.submitted_at) return false;
        const updatedAt = new Date((article.updated_at || article.submitted_at || "").replace(" ", "T")).getTime();
        return Number.isFinite(updatedAt) && updatedAt > notificationsViewedAt && article.status !== "Published";
      }).length,
    [articles, notificationsViewedAt]
  );
  const sidebarNavItems = navItems.filter((item) => item.id !== "notifications");
  const sidebarWidthClass = isSidebarCollapsed ? "lg:ml-16" : "lg:ml-[12.5rem]";

  const navigateToSection = (section: UserDashboardSection) => navigate(`/user/${userSectionRoutes[section]}`);
  const handleLogout = async () => {
    await logoutUser();
    navigate("/login", { replace: true });
  };
  const handleNotificationsViewed = () => {
    const viewedAt = Date.now();
    localStorage.setItem(NOTIFICATIONS_VIEWED_KEY, String(viewedAt));
    setNotificationsViewedAt(viewedAt);
  };

  if (!activeSection && !isArticleDetailsRoute && !isRevisionSubmissionRoute) return <Navigate to="/user/dashboard" replace />;

  const sectionContent = {
    overview: <DashboardOverview profile={profile} articles={articles} isLoading={isLoading} error={error} onSectionChange={navigateToSection} onRetry={loadArticles} />,
    submissions: <MySubmissionsPage profile={profile} articles={articles} isLoading={isLoading} error={error} onSectionChange={navigateToSection} onRetry={loadArticles} />,
    submit: <SubmitPublicationForm profile={profile} />,
    revisions: <RevisionsPage articles={articles} isLoading={isLoading} error={error} onRetry={loadArticles} />,
    publications: <PublishedPublicationsPage articles={articles} isLoading={isLoading} error={error} onRetry={loadArticles} />,
    notifications: <NotificationsPanel articles={articles} onViewed={handleNotificationsViewed} />, 
    profile: <UserProfilePanel profile={profile} />,
  } as const;

  const content = isArticleDetailsRoute || isRevisionSubmissionRoute ? <MySubmissionDetailsPage /> : sectionContent[activeSection as UserDashboardSection];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <UserDashboardSidebar
        activeSection={(activeSection as UserDashboardSection) ?? "overview"}
        navItems={sidebarNavItems}
        onSectionChange={navigateToSection}
        isCollapsed={isSidebarCollapsed}
        onLogout={() => void handleLogout()}
      />
      <UserDashboardNavbar
        activeSection={(activeSection as UserDashboardSection) ?? "overview"}
        navItems={sidebarNavItems}
        onSectionChange={navigateToSection}
        unreadCount={activeSection === "notifications" ? 0 : unreadCount}
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
        sidebarWidthClass={sidebarWidthClass}
      />
      <div className={`min-w-0 transition-all duration-300 ${sidebarWidthClass}`}>
        <main className="mx-auto min-h-[calc(100vh-134px)] max-w-7xl px-4 py-6 md:px-6 md:py-8">{content}</main>
        <UserDashboardFooter />
      </div>
    </div>
  );
};

export default UserDashboard;
