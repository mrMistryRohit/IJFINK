import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  Activity,
  BarChart3,
  BookOpenCheck,
  CheckCircle2,
  ChevronLeft,
  Clock3,
  FileText,
  Hash,
  LoaderCircle,
  LogOut,
  Mail,
  PanelLeftClose,
  PanelLeftOpen,
  RefreshCw,
  Search,
  ShieldCheck,
  UserCog,
  Users,
  XCircle,
} from "lucide-react";
import inkIcon from "@/assets/ink-icon.png";
import { formatApiDate } from "@/lib/dateUtils";
import { getStoredAuthUser, logoutUser } from "@/lib/authApi";
import {
  getChiefEditorAllocationDetail,
  getChiefEditorAllocations,
  getChiefEditorDashboard,
  getChiefEditorProfile,
  type ChiefEditorAllocation,
  type ChiefEditorArticleDetail,
  type ChiefEditorDashboardData,
  type ChiefEditorProfile,
} from "@/lib/chiefEditorApi";

type ChiefSection = "dashboard" | "allocations" | "profile";

const routes: Record<ChiefSection, string> = {
  dashboard: "dashboard",
  allocations: "editor-allocations",
  profile: "profile",
};

const routeSections = Object.fromEntries(
  Object.entries(routes).map(([section, route]) => [route, section])
) as Record<string, ChiefSection>;

const navItems = [
  { id: "dashboard" as const, label: "Dashboard", icon: BarChart3 },
  { id: "allocations" as const, label: "Editor Allocations", icon: BookOpenCheck },
  { id: "profile" as const, label: "Profile", icon: UserCog },
];

const Loading = () => (
  <div className="flex min-h-56 items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white text-sm font-bold text-slate-500">
    <LoaderCircle size={20} className="animate-spin text-primary" /> Loading current data...
  </div>
);

const ErrorState = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center">
    <p className="font-bold text-rose-700">{message}</p>
    <button type="button" onClick={onRetry} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-sm font-bold text-white">
      <RefreshCw size={16} /> Try again
    </button>
  </div>
);

const ChiefEditor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getStoredAuthUser();
  const profileId = user?.profile_id;
  const route = location.pathname.split("/").filter(Boolean)[1];
  const activeSection = route ? routeSections[route] : undefined;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [dashboard, setDashboard] = useState<ChiefEditorDashboardData | null>(null);
  const [allocations, setAllocations] = useState<ChiefEditorAllocation[]>([]);
  const [profile, setProfile] = useState<ChiefEditorProfile | null>(null);
  const [detail, setDetail] = useState<ChiefEditorArticleDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const sidebarWidth = isCollapsed ? "lg:ml-16" : "lg:ml-[12.5rem]";

  const loadActivePage = useCallback(async () => {
    if (!activeSection) return;
    setIsLoading(true);
    setError("");
    try {
      if (activeSection === "dashboard") {
        setDashboard(await getChiefEditorDashboard());
      } else if (activeSection === "allocations") {
        setAllocations((await getChiefEditorAllocations()).articles);
      } else {
        if (!profileId) throw new Error("Chief Editor profile ID is missing from this login session.");
        setProfile((await getChiefEditorProfile(profileId)).editor);
      }
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load this page.");
    } finally {
      setIsLoading(false);
    }
  }, [activeSection, profileId]);

  useEffect(() => {
    setDetail(null);
    void loadActivePage();
    if (activeSection === "profile" || !activeSection) return;
    const interval = window.setInterval(() => void loadActivePage(), 15000);
    return () => window.clearInterval(interval);
  }, [activeSection, loadActivePage]);

  const openDetail = async (articleId: number) => {
    setIsDetailLoading(true);
    setError("");
    try {
      setDetail(await getChiefEditorAllocationDetail(articleId));
    } catch (detailError) {
      setError(detailError instanceof Error ? detailError.message : "Unable to load allocation details.");
    } finally {
      setIsDetailLoading(false);
    }
  };

  const filteredAllocations = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return allocations;
    return allocations.filter((item) =>
      [item.title, item.author_name, item.editor_name, item.article_status, String(item.assignment_id)]
        .some((value) => value.toLowerCase().includes(term))
    );
  }, [allocations, search]);

  const goTo = (section: ChiefSection) => navigate(`/chief-editor/${routes[section]}`);
  const logout = async () => {
    await logoutUser();
    navigate("/login", { replace: true });
  };

  if (!activeSection) return <Navigate to="/chief-editor/dashboard" replace />;

  const name = profile ? `${profile.first_name} ${profile.last_name}` : user?.display_name || "Chief Editor";
  const initials = name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();

  const dashboardContent = dashboard && (
    <section>
      <div className="mb-7">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Editorial leadership</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Chief Editor Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Editorial workload, decisions, and publication progress at a glance.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total Allocations", value: dashboard.total_assigned_articles, icon: FileText, tone: "bg-blue-50 text-blue-600" },
          { label: "Pending Reviews", value: dashboard.pending_editorial_reviews, icon: Clock3, tone: "bg-amber-50 text-amber-600" },
          { label: "Active Editors", value: dashboard.active_editors, icon: Users, tone: "bg-cyan-50 text-cyan-600" },
          { label: "Revision Requests", value: dashboard.revision_requested, icon: RefreshCw, tone: "bg-violet-50 text-violet-600" },
          { label: "Accepted", value: dashboard.accepted, icon: CheckCircle2, tone: "bg-emerald-50 text-emerald-600" },
          { label: "Rejected", value: dashboard.rejected, icon: XCircle, tone: "bg-rose-50 text-rose-600" },
          { label: "Published", value: dashboard.published, icon: BookOpenCheck, tone: "bg-teal-50 text-teal-600" },
          { label: "Avg. Review Time", value: `${Math.round(dashboard.average_review_time / 60)}h`, icon: Activity, tone: "bg-slate-100 text-slate-600" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div><p className="text-sm font-bold text-slate-500">{stat.label}</p><p className="mt-2 text-3xl font-extrabold text-slate-950">{stat.value}</p></div>
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.tone}`}><stat.icon size={20} /></span>
            </div>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => goTo("allocations")} className="mt-6 flex w-full items-center justify-between rounded-2xl bg-gradient-to-r from-slate-950 to-emerald-950 p-6 text-left text-white shadow-lg">
        <span><span className="block text-lg font-extrabold">Review editor allocations</span><span className="mt-1 block text-sm text-white/65">Inspect assigned papers, editors, files, and review history.</span></span>
        <BookOpenCheck size={28} />
      </button>
    </section>
  );

  const allocationsContent = (
    <section>
      <div className="mb-7"><h1 className="text-3xl font-extrabold text-slate-950">Editor Allocations</h1><p className="mt-1 text-sm text-slate-500">Track every paper assigned to the editorial team.</p></div>
      {detail ? (
        <div>
          <button type="button" onClick={() => setDetail(null)} className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-primary"><ChevronLeft size={17} /> Back to allocations</button>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 md:flex-row">
              <div><p className="text-xs font-extrabold uppercase tracking-wider text-primary">Allocation #{detail.article.assignment_id}</p><h2 className="mt-2 text-2xl font-extrabold">{detail.article.title}</h2><p className="mt-1 text-sm text-slate-500">{detail.article.article_type} / {detail.article.subject_area}</p></div>
              <span className="h-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">{detail.article.article_status}</span>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {[["Author", detail.article.author_name], ["Assigned Editor", detail.article.editor_name], ["Assigned On", formatApiDate(detail.article.assigned_at, { day: "2-digit", month: "short", year: "numeric" })]].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p><p className="mt-1 font-bold text-slate-800">{value}</p></div>
              ))}
            </div>
            {detail.article.abstract && <div className="mt-5"><h3 className="font-extrabold">Abstract</h3><p className="mt-2 text-sm leading-6 text-slate-600">{detail.article.abstract}</p></div>}
            <div className="mt-6 grid gap-5 lg:grid-cols-3">
              <div><h3 className="font-extrabold">Files ({detail.files.length})</h3><div className="mt-3 space-y-2">{detail.files.length ? detail.files.map((file) => <div key={file.file_id} className="rounded-xl border border-slate-200 p-3 text-sm"><p className="font-bold">{file.file_name}</p><p className="text-xs text-slate-500">{file.file_type} / Version {file.version}</p></div>) : <p className="text-sm text-slate-400">No files found.</p>}</div></div>
              <div><h3 className="font-extrabold">Reviews ({detail.review_history.length})</h3><div className="mt-3 space-y-2">{detail.review_history.length ? detail.review_history.map((review) => <div key={review.editorial_review_id} className="rounded-xl border border-slate-200 p-3 text-sm"><p className="font-bold text-primary">{review.decision}</p><p className="mt-1 text-xs text-slate-500">{review.comments || "No comments"}</p></div>) : <p className="text-sm text-slate-400">No reviews yet.</p>}</div></div>
              <div><h3 className="font-extrabold">Revisions ({detail.revision_history.length})</h3><div className="mt-3 space-y-2">{detail.revision_history.length ? detail.revision_history.map((revision) => <div key={revision.revision_id} className="rounded-xl border border-slate-200 p-3 text-sm"><p className="font-bold">Revision {revision.revision_number}</p><p className="mt-1 text-xs text-slate-500">{revision.response_letter || "No response letter"}</p></div>) : <p className="text-sm text-slate-400">No revisions submitted.</p>}</div></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-4"><div className="relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search paper, author, editor, status or allocation ID..." className="h-12 w-full rounded-xl border border-slate-200 pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" /></div></div>
          <div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left"><thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500"><tr><th className="px-5 py-4">Allocation</th><th className="px-5 py-4">Paper</th><th className="px-5 py-4">Author</th><th className="px-5 py-4">Assigned Editor</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Assigned</th><th className="px-5 py-4 text-right">Action</th></tr></thead>
          <tbody className="divide-y divide-slate-100">{filteredAllocations.map((item) => <tr key={item.assignment_id} className="hover:bg-slate-50/70"><td className="px-5 py-4 font-bold">#{item.assignment_id}</td><td className="max-w-xs px-5 py-4"><p className="truncate font-bold">{item.title}</p><p className="text-xs text-slate-500">Paper #{item.article_id}</p></td><td className="px-5 py-4 text-sm text-slate-600">{item.author_name}</td><td className="px-5 py-4 text-sm font-semibold">{item.editor_name}</td><td className="px-5 py-4"><span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{item.article_status}</span></td><td className="px-5 py-4 text-sm text-slate-500">{formatApiDate(item.assigned_at, { day: "2-digit", month: "short", year: "numeric" })}</td><td className="px-5 py-4 text-right"><button type="button" onClick={() => void openDetail(item.article_id)} className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold hover:border-primary hover:text-primary">More Details</button></td></tr>)}</tbody></table></div>
          {!filteredAllocations.length && <p className="p-10 text-center text-sm text-slate-500">No editor allocations match your search.</p>}
        </div>
      )}
    </section>
  );

  const profileContent = profile && (
    <section>
      <div className="mb-7"><h1 className="text-3xl font-extrabold text-slate-950">Chief Editor Profile</h1><p className="mt-1 text-sm text-slate-500">Your editorial identity and performance summary.</p></div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="rounded-2xl bg-gradient-to-r from-slate-950 to-emerald-950 p-8 text-center text-white"><span className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10"><ShieldCheck size={36} /></span><h2 className="mt-4 text-2xl font-extrabold">{profile.first_name} {profile.last_name}</h2><p className="mt-1 font-bold text-emerald-300">Chief Editor</p></div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            { label: "Email", value: profile.email, icon: Mail },
            { label: "Institution", value: profile.institution || "Not available", icon: BookOpenCheck },
            { label: "Account Status", value: profile.status, icon: ShieldCheck },
            { label: "Assigned Articles", value: String(profile.assigned_articles), icon: FileText },
            { label: "Completed Reviews", value: String(profile.completed_reviews), icon: CheckCircle2 },
            { label: "Editor ID", value: String(profile.editor_id), icon: Hash },
          ].map((item) => <div key={item.label} className="rounded-xl border border-slate-100 bg-slate-50 p-4"><item.icon size={18} className="text-primary" /><p className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-400">{item.label}</p><p className="mt-1 break-words font-bold">{item.value}</p></div>)}
        </div>
      </div>
    </section>
  );

  const content = isLoading ? <Loading /> : error ? <ErrorState message={error} onRetry={() => void loadActivePage()} /> : activeSection === "dashboard" ? dashboardContent : activeSection === "allocations" ? allocationsContent : profileContent;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <aside className={`fixed bottom-0 left-0 top-0 z-40 hidden border-r border-white/10 bg-gradient-to-b from-[hsl(220,55%,10%)] via-[hsl(220,48%,13%)] to-[hsl(168,55%,14%)] text-white transition-all duration-300 lg:flex lg:flex-col ${isCollapsed ? "w-16" : "w-[12.5rem]"}`}>
        <div className={`flex items-center border-b border-white/10 px-4 ${isCollapsed ? "justify-center py-5" : "gap-3 py-4"}`}><img src={inkIcon} alt="IJFINK" className="h-10 w-10 rounded-xl object-contain" />{!isCollapsed && <div><p className="text-sm font-extrabold">IJFINK</p><p className="text-xs font-semibold text-white/65">Chief Editor Desk</p></div>}</div>
        <nav className={`space-y-2 ${isCollapsed ? "p-2" : "p-3"}`}>{navItems.map((item) => <button key={item.id} type="button" onClick={() => goTo(item.id)} title={isCollapsed ? item.label : undefined} className={`flex items-center rounded-xl text-sm font-bold transition-colors ${activeSection === item.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-white/65 hover:bg-white/[0.08] hover:text-white"} ${isCollapsed ? "mx-auto h-10 w-10 justify-center" : "w-full gap-3 px-4 py-3"}`}><item.icon size={18} />{!isCollapsed && item.label}</button>)}</nav>
        <div className={`mt-auto ${isCollapsed ? "p-2" : "p-3"}`}><button type="button" onClick={() => void logout()} className={`flex items-center rounded-xl border border-white/10 bg-white/[0.06] text-sm font-bold text-white/80 hover:bg-rose-500 ${isCollapsed ? "mx-auto h-10 w-10 justify-center" : "w-full gap-3 px-4 py-3"}`}><LogOut size={18} />{!isCollapsed && "Logout"}</button></div>
      </aside>
      <header className={`sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur transition-all duration-300 ${sidebarWidth}`}>
        <div className="flex min-h-[76px] items-center justify-between px-4 md:px-6"><button type="button" onClick={() => setIsCollapsed((current) => !current)} className="hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:border-primary hover:text-primary lg:flex">{isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}</button><button type="button" onClick={() => goTo("profile")} className="hidden items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3 text-sm font-bold hover:bg-slate-100 sm:flex"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-extrabold text-white">{initials}</span>{name}</button></div>
        <div className="border-t border-slate-100 px-4 py-3 lg:hidden"><div className="flex gap-2 overflow-x-auto">{navItems.map((item) => <button key={item.id} type="button" onClick={() => goTo(item.id)} className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-xl px-4 text-xs font-bold ${activeSection === item.id ? "bg-primary text-white" : "bg-slate-100 text-slate-600"}`}><item.icon size={15} />{item.label}</button>)}</div></div>
      </header>
      <div className={`min-w-0 transition-all duration-300 ${sidebarWidth}`}><main className="mx-auto min-h-[calc(100vh-76px)] max-w-7xl px-4 py-6 md:px-6 md:py-8">{isDetailLoading ? <Loading /> : content}</main></div>
    </div>
  );
};

export default ChiefEditor;
