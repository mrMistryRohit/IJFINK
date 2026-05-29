import { useState } from "react";
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

const navItems: DashboardNavItem[] = [
  { id: "overview", label: "Dashboard", icon: BarChart3 },
  { id: "submissions", label: "My Submission", icon: FileText },
  { id: "submit", label: "Submit Publication", icon: Upload },
  { id: "revisions", label: "Revisions", icon: GitPullRequest },
  { id: "publications", label: "Publications", icon: BookOpen },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "profile", label: "Profile", icon: UserCog },
];

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState<UserDashboardSection>("overview");
  const unreadCount = notifications.filter((notification) => notification.unread).length;
  const sidebarNavItems = navItems.filter((item) => item.id !== "notifications");

  const sectionContent = {
    overview: <DashboardOverview publications={publications} notifications={notifications} />,
    submissions: <MySubmissionsPage submissions={userSubmissions} onSectionChange={setActiveSection} />,
    submit: <SubmitPublicationForm />,
    revisions: <RevisionsPage revisions={revisionRequests} />,
    publications: <PublishedPublicationsPage papers={publishedPapers} />,
    notifications: <NotificationsPanel notifications={notifications} />,
    profile: <UserProfilePanel />,
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <UserDashboardSidebar activeSection={activeSection} navItems={sidebarNavItems} onSectionChange={setActiveSection} />
      <UserDashboardNavbar
        activeSection={activeSection}
        navItems={sidebarNavItems}
        onSectionChange={setActiveSection}
        unreadCount={unreadCount}
      />
      <div className="min-w-0 lg:pl-72">
        <main className="mx-auto min-h-[calc(100vh-134px)] max-w-7xl px-4 py-6 md:px-6 md:py-8">
          {sectionContent[activeSection]}
        </main>
        <UserDashboardFooter />
      </div>
    </div>
  );
};

export default UserDashboard;

