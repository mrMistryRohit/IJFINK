import { useCallback, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { BarChart3, BookOpenCheck, ClipboardCheck, UserCog } from "lucide-react";
import AcceptedArticlesPage from "@/components/publication-dashboard/AcceptedArticlesPage";
import PublicationDashboardNavbar from "@/components/publication-dashboard/PublicationDashboardNavbar";
import PublicationDashboardSidebar from "@/components/publication-dashboard/PublicationDashboardSidebar";
import PublicationOverview from "@/components/publication-dashboard/PublicationOverview";
import PublicationProfilePanel from "@/components/publication-dashboard/PublicationProfilePanel";
import PublishedArticlesPage from "@/components/publication-dashboard/PublishedArticlesPage";
import type { PublicationNavItem, PublicationSection } from "@/components/publication-dashboard/types";
import { getStoredAuthUser } from "@/lib/adminApi";
import { logoutUser } from "@/lib/authApi";
import { getAcceptedArticles, getPublishedArticles, type PublicationArticle, type PublicationRecord } from "@/lib/publicationApi";

const navItems: PublicationNavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "accepted", label: "Accepted Articles", icon: ClipboardCheck },
  { id: "published", label: "Published Archive", icon: BookOpenCheck },
  { id: "profile", label: "Team Profile", icon: UserCog },
];

const sectionRoutes: Record<PublicationSection, string> = { dashboard: "dashboard", accepted: "accepted-articles", published: "published", profile: "profile" };
const routeSections = Object.fromEntries(Object.entries(sectionRoutes).map(([section, route]) => [route, section])) as Record<string, PublicationSection>;

const PublicationTeam = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState<PublicationArticle[]>([]);
  const [published, setPublished] = useState<PublicationRecord[]>([]);
  const [acceptedError, setAcceptedError] = useState("");
  const [publishedError, setPublishedError] = useState("");
  const [isLoadingAccepted, setIsLoadingAccepted] = useState(true);
  const [isLoadingPublished, setIsLoadingPublished] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const user = getStoredAuthUser();
  const route = location.pathname.split("/").filter(Boolean)[1];
  const activeSection = route ? routeSections[route] : undefined;
  const sidebarWidthClass = isSidebarCollapsed ? "lg:ml-16" : "lg:ml-[12.5rem]";

  const loadAccepted = useCallback(async () => {
    setIsLoadingAccepted(true); setAcceptedError("");
    try { setAccepted((await getAcceptedArticles()).articles); }
    catch (error) { setAcceptedError(error instanceof Error ? error.message : "Unable to load accepted articles."); }
    finally { setIsLoadingAccepted(false); }
  }, []);
  const loadPublished = useCallback(async () => {
    setIsLoadingPublished(true); setPublishedError("");
    try { setPublished((await getPublishedArticles()).publications); }
    catch (error) { setPublishedError(error instanceof Error ? error.message : "Unable to load published articles."); }
    finally { setIsLoadingPublished(false); }
  }, []);

  useEffect(() => {
    const refreshActivePage = () => {
      if (activeSection === "dashboard") {
        void loadAccepted();
        void loadPublished();
      } else if (activeSection === "accepted") {
        void loadAccepted();
      } else if (activeSection === "published") {
        void loadPublished();
      }
    };

    refreshActivePage();
    if (activeSection === "profile" || !activeSection) return;
    const interval = window.setInterval(refreshActivePage, 15000);
    window.addEventListener("focus", refreshActivePage);
    window.addEventListener("online", refreshActivePage);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", refreshActivePage);
      window.removeEventListener("online", refreshActivePage);
    };
  }, [activeSection, loadAccepted, loadPublished]);
  const navigateTo = (section: PublicationSection) => navigate(`/publication/${sectionRoutes[section]}`);
  const logout = async () => { await logoutUser(); navigate("/login", { replace: true }); };
  if (!activeSection) return <Navigate to="/publication/dashboard" replace />;

  const content: Record<PublicationSection, React.ReactNode> = {
    dashboard: <PublicationOverview accepted={accepted} published={published} isLoading={isLoadingAccepted || isLoadingPublished} onOpenQueue={() => navigateTo("accepted")} onOpenPublished={() => navigateTo("published")} />,
    accepted: <AcceptedArticlesPage articles={accepted} isLoading={isLoadingAccepted} error={acceptedError} onRefresh={async () => { await Promise.all([loadAccepted(), loadPublished()]); }} />,
    published: <PublishedArticlesPage publications={published} isLoading={isLoadingPublished} error={publishedError} onRetry={loadPublished} />,
    profile: <PublicationProfilePanel user={user} />,
  };

  return <div className="min-h-screen bg-slate-100 text-slate-900"><PublicationDashboardSidebar activeSection={activeSection} navItems={navItems} onSectionChange={navigateTo} onLogout={logout} isCollapsed={isSidebarCollapsed} /><PublicationDashboardNavbar activeSection={activeSection} navItems={navItems} onSectionChange={navigateTo} user={user} isSidebarCollapsed={isSidebarCollapsed} onToggleSidebar={() => setIsSidebarCollapsed((current) => !current)} sidebarWidthClass={sidebarWidthClass} /><div className={`min-w-0 transition-all duration-300 ${sidebarWidthClass}`}><main className="mx-auto min-h-[calc(100vh-76px)] max-w-7xl px-4 py-6 md:px-6 md:py-8">{content[activeSection]}</main></div></div>;
};

export default PublicationTeam;
