import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { BarChart3, ClipboardList, FileCheck2, PenLine, ScrollText, UserCog, UserPlus } from "lucide-react";
import AssignedPapersPage from "@/components/editor-dashboard/AssignedPapersPage";
import EditorDashboardNavbar from "@/components/editor-dashboard/EditorDashboardNavbar";
import EditorDashboardSidebar from "@/components/editor-dashboard/EditorDashboardSidebar";
import EditorOverview from "@/components/editor-dashboard/EditorOverview";
import EditorProfilePanel from "@/components/editor-dashboard/EditorProfilePanel";
import PublicationQueuePage from "@/components/editor-dashboard/PublicationQueuePage";
import ProvideEditsPage from "@/components/editor-dashboard/ProvideEditsPage";
import ReviewerAssignmentPage from "@/components/editor-dashboard/ReviewerAssignmentPage";
import ReviewsReceivedPage from "@/components/editor-dashboard/ReviewsReceivedPage";
import { assignedPapers, initialManuscripts } from "@/components/editor-dashboard/editorDashboardData";
import type { EditorDashboardSection, EditorNavItem } from "@/components/editor-dashboard/types";
import { logoutUser } from "@/lib/authApi";

const navItems: EditorNavItem[] = [
  { id: "dashboard", label: "Editor Dashboard", icon: BarChart3 },
  { id: "submissions", label: "New Submissions", icon: ClipboardList },
  { id: "assigned", label: "Assigned Papers", icon: FileCheck2 },
  { id: "reviewer-assignment", label: "Reviewer Assignment", icon: UserPlus },
  { id: "reviews", label: "Reviews Received", icon: ScrollText },
  { id: "edits", label: "Provide Edits", icon: PenLine },
  { id: "profile", label: "Editor Profile", icon: UserCog },
];

const editorSectionRoutes: Record<EditorDashboardSection, string> = {
  dashboard: "dashboard",
  submissions: "new-submissions",
  assigned: "assigned-papers",
  "reviewer-assignment": "reviewer-assignment",
  reviews: "reviews-received",
  edits: "provide-edits",
  profile: "profile",
};

const editorRouteSections = Object.fromEntries(
  Object.entries(editorSectionRoutes).map(([section, route]) => [route, section])
) as Record<string, EditorDashboardSection>;

const Editor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [manuscripts, setManuscripts] = useState(initialManuscripts);
  const [selectedId, setSelectedId] = useState(initialManuscripts[0].id);
  const [selectedAssignedPaperId, setSelectedAssignedPaperId] = useState<string | null>(null);
  const [editText, setEditText] = useState(
    "Please refine the introduction, check journal formatting, and upload a clean revised manuscript."
  );

  const selectedManuscript = manuscripts.find((paper) => paper.id === selectedId) ?? manuscripts[0];
  const sidebarWidthClass = isSidebarCollapsed ? "lg:ml-16" : "lg:ml-[12.5rem]";
  const sectionRoute = location.pathname.split("/").filter(Boolean)[1];
  const activeSection = sectionRoute ? editorRouteSections[sectionRoute] : undefined;

  const navigateToSection = (section: EditorDashboardSection) => {
    navigate(`/editor/${editorSectionRoutes[section]}`);
  };

  const logout = async () => {
    await logoutUser();
    navigate("/login", { replace: true });
  };

  const sendEditsToAuthor = () => {
    const trimmedEdit = editText.trim();
    if (!trimmedEdit) return;

    setManuscripts((currentManuscripts) =>
      currentManuscripts.map((paper) =>
        paper.id === selectedManuscript.id
          ? {
              ...paper,
              status: "Edits Requested",
              editNotes: [trimmedEdit, ...paper.editNotes],
            }
          : paper
      )
    );
    setEditText("");
  };

  const moveToReview = (paperId: string) => {
    setManuscripts((currentManuscripts) =>
      currentManuscripts.map((paper) =>
        paper.id === paperId
          ? {
              ...paper,
              status: "Ready for Review",
            }
          : paper
      )
    );
  };

  if (!activeSection) {
    return <Navigate to="/editor/dashboard" replace />;
  }

  const sectionContent = {
    dashboard: (
      <EditorOverview manuscripts={manuscripts} />
    ),
    submissions: (
      <PublicationQueuePage
        manuscripts={manuscripts}
        onSelectManuscript={setSelectedId}
        onMoveToReview={moveToReview}
        onSectionChange={navigateToSection}
      />
    ),
    assigned: (
      <AssignedPapersPage
        papers={assignedPapers}
        selectedPaperId={selectedAssignedPaperId}
        onOpenPaper={setSelectedAssignedPaperId}
        onBackToList={() => setSelectedAssignedPaperId(null)}
      />
    ),
    "reviewer-assignment": <ReviewerAssignmentPage />,
    reviews: <ReviewsReceivedPage />,
    edits: (
      <ProvideEditsPage
        manuscripts={manuscripts}
        selectedManuscript={selectedManuscript}
        editText={editText}
        onEditTextChange={setEditText}
        onSelectManuscript={setSelectedId}
        onSendEdits={sendEditsToAuthor}
      />
    ),
    profile: <EditorProfilePanel />,
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <EditorDashboardSidebar
        activeSection={activeSection}
        navItems={navItems}
        onSectionChange={navigateToSection}
        onLogout={logout}
        isCollapsed={isSidebarCollapsed}
      />
      <EditorDashboardNavbar
        activeSection={activeSection}
        navItems={navItems}
        onSectionChange={navigateToSection}
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
        sidebarWidthClass={sidebarWidthClass}
      />
      <div className={`min-w-0 transition-all duration-300 ${sidebarWidthClass}`}>
        <main className="mx-auto min-h-[calc(100vh-134px)] max-w-7xl px-4 py-6 md:px-6 md:py-8">
          {sectionContent[activeSection]}
        </main>
      </div>
    </div>
  );
};

export default Editor;
