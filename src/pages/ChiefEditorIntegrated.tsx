import { useCallback, useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Activity, BarChart3, Bell, BookOpenCheck, CheckCircle2, ChevronLeft, Clock3, Download, Eye, FileText, Mail, RefreshCw, Search, ShieldCheck, UserCog, Users, XCircle } from "lucide-react";
import WorkspaceShell from "@/components/editor-dashboard/WorkspaceShell";
import { WorkspaceError, WorkspaceLoading } from "@/components/editor-dashboard/WorkspaceStates";
import { formatApiDate } from "@/lib/dateUtils";
import { getStoredAuthUser, logoutUser } from "@/lib/authApi";
import { downloadChiefArticleFile, getChiefEditorAllocationDetail, getChiefEditorAllocations, getChiefEditorDashboard, getChiefEditorProfile, getChiefEditors, getChiefNotifications, getChiefPendingAssignments, getChiefRevisions, getChiefStatistics, markChiefNotificationRead, type ChiefEditorAllocation, type ChiefEditorArticleDetail, type ChiefEditorDashboardData, type ChiefEditorProfile, type ChiefNotification, type ChiefPendingAssignment, type ChiefRevision, type ChiefStatistics } from "@/lib/chiefEditorApi";
import { toast } from "@/hooks/use-toast";

type Section = "dashboard" | "articles" | "pending" | "revisions" | "editors" | "statistics" | "notifications" | "profile";
const routes: Record<Section, string> = { dashboard: "dashboard", articles: "articles", pending: "pending", revisions: "revisions", editors: "editors", statistics: "statistics", notifications: "notifications", profile: "profile" };
const routeSections = Object.fromEntries(Object.entries(routes).map(([section, route]) => [route, section])) as Record<string, Section>;
const navItems = [
  { id: "dashboard" as const, label: "Dashboard", icon: BarChart3 },
  { id: "articles" as const, label: "All Allocations", icon: FileText },
  { id: "pending" as const, label: "Pending Reviews", icon: Clock3 },
  { id: "revisions" as const, label: "Revision Queue", icon: RefreshCw },
  { id: "editors" as const, label: "Editor Performance", icon: Users },
  { id: "statistics" as const, label: "Statistics", icon: Activity },
  { id: "notifications" as const, label: "Notifications", icon: Bell },
  { id: "profile" as const, label: "Profile", icon: UserCog },
];
const Heading = ({ title, text }: { title: string; text: string }) => <div className="mb-7"><h1 className="text-3xl font-extrabold">{title}</h1><p className="mt-1 text-sm text-slate-500">{text}</p></div>;
const Empty = ({ children }: { children: string }) => <p className="rounded-2xl border bg-white p-10 text-center text-sm text-slate-500">{children}</p>;

const ChiefEditorIntegrated = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getStoredAuthUser();
  const parts = location.pathname.split("/").filter(Boolean);
  const activeSection = routeSections[parts[1]] as Section | undefined;
  const articleId = activeSection === "articles" && parts[2] ? Number(parts[2]) : null;
  const editorId = activeSection === "editors" && parts[2] ? Number(parts[2]) : null;
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dashboard, setDashboard] = useState<ChiefEditorDashboardData | null>(null);
  const [articles, setArticles] = useState<ChiefEditorAllocation[]>([]);
  const [detail, setDetail] = useState<ChiefEditorArticleDetail | null>(null);
  const [pending, setPending] = useState<ChiefPendingAssignment[]>([]);
  const [revisions, setRevisions] = useState<ChiefRevision[]>([]);
  const [editors, setEditors] = useState<ChiefEditorProfile[]>([]);
  const [editorDetail, setEditorDetail] = useState<ChiefEditorProfile | null>(null);
  const [statistics, setStatistics] = useState<ChiefStatistics | null>(null);
  const [notifications, setNotifications] = useState<ChiefNotification[]>([]);
  const [profile, setProfile] = useState<ChiefEditorProfile | null>(null);
  const [search, setSearch] = useState("");
  const [acting, setActing] = useState(false);

  const loadPage = useCallback(async () => {
    if (!activeSection || articleId || editorId) return;
    setLoading(true); setError("");
    try {
      if (activeSection === "dashboard") setDashboard(await getChiefEditorDashboard());
      else if (activeSection === "articles") setArticles((await getChiefEditorAllocations()).articles);
      else if (activeSection === "pending") setPending((await getChiefPendingAssignments()).assignments);
      else if (activeSection === "revisions") setRevisions((await getChiefRevisions()).articles);
      else if (activeSection === "editors") setEditors((await getChiefEditors()).editors);
      else if (activeSection === "statistics") setStatistics(await getChiefStatistics());
      else if (activeSection === "notifications") setNotifications((await getChiefNotifications()).notifications);
      else {
        if (!user?.profile_id) throw new Error("Chief Editor profile ID is missing from this session.");
        setProfile((await getChiefEditorProfile(user.profile_id)).editor);
      }
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Unable to load this page."); }
    finally { setLoading(false); }
  }, [activeSection, articleId, editorId, user?.profile_id]);

  const loadDetail = useCallback(async () => {
    if (!articleId) return;
    setLoading(true); setError("");
    try { setDetail(await getChiefEditorAllocationDetail(articleId)); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Unable to load this article."); }
    finally { setLoading(false); }
  }, [articleId]);
  const loadEditor = useCallback(async () => {
    if (!editorId) return;
    setLoading(true); setError("");
    try { setEditorDetail((await getChiefEditorProfile(editorId)).editor); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Unable to load this editor."); }
    finally { setLoading(false); }
  }, [editorId]);

  useEffect(() => {
    setDetail(null); setEditorDetail(null);
    if (articleId) void loadDetail(); else if (editorId) void loadEditor(); else void loadPage();
    if (!activeSection || articleId || editorId || activeSection === "profile") return;
    const interval = window.setInterval(() => void loadPage(), activeSection === "notifications" ? 10000 : 20000);
    return () => window.clearInterval(interval);
  }, [activeSection, articleId, editorId, loadDetail, loadEditor, loadPage]);

  const visibleArticles = useMemo(() => {
    const term = search.trim().toLowerCase();
    return term ? articles.filter((item) => [item.title, item.author_name, item.editor_name, item.article_status, String(item.assignment_id)].some((value) => value.toLowerCase().includes(term))) : articles;
  }, [articles, search]);

  const accessFile = async (fileId: number, fileName: string, action: "view" | "download") => {
    if (!detail) return;
    const preview = action === "view" ? window.open("", "_blank", "noopener,noreferrer") : null;
    setActing(true);
    try {
      const blob = await downloadChiefArticleFile(detail.article.article_id, fileId);
      const url = URL.createObjectURL(blob);
      if (action === "view") {
        if (preview) preview.location.href = url; else window.open(url, "_blank", "noopener,noreferrer");
      } else {
        const link = document.createElement("a"); link.href = url; link.download = fileName; link.click();
      }
      window.setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch (cause) { preview?.close(); toast({ title: action === "view" ? "Unable to open file" : "Download failed", description: cause instanceof Error ? cause.message : "Unable to access file.", variant: "destructive" }); }
    finally { setActing(false); }
  };
  const markRead = async (id: number) => {
    try { await markChiefNotificationRead(id); setNotifications((items) => items.map((item) => item.notification_id === id ? { ...item, is_read: true } : item)); }
    catch (cause) { toast({ title: "Notification update failed", description: cause instanceof Error ? cause.message : "Please try again.", variant: "destructive" }); }
  };

  if (!activeSection) return <Navigate to="/chief-editor/dashboard" replace />;
  const goTo = (section: Section) => navigate(`/chief-editor/${routes[section]}`);
  const logout = async () => { await logoutUser(); navigate("/login", { replace: true }); };
  const retry = () => void (articleId ? loadDetail() : editorId ? loadEditor() : loadPage());
  let content: React.ReactNode;

  if (loading) content = <WorkspaceLoading />;
  else if (error) content = <WorkspaceError message={error} onRetry={retry} />;
  else if (activeSection === "dashboard" && dashboard) content = <section><Heading title="Chief Editor Dashboard" text="Organization-wide editorial workload and outcomes." /><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{([
    ["Total Allocations", dashboard.total_assigned_articles, FileText], ["Pending Reviews", dashboard.pending_editorial_reviews, Clock3], ["Active Editors", dashboard.active_editors, Users], ["Revision Requests", dashboard.revision_requested, RefreshCw], ["Accepted", dashboard.accepted, CheckCircle2], ["Rejected", dashboard.rejected, XCircle], ["Published", dashboard.published, BookOpenCheck], ["Avg. Review", `${Math.round(dashboard.average_review_time / 60)}h`, Activity],
  ] as Array<[string, string | number, LucideIcon]>).map(([label, value, Icon]) => <div key={label} className="rounded-2xl border bg-white p-5 shadow-sm"><div className="flex justify-between"><div><p className="text-sm font-bold text-slate-500">{label}</p><p className="mt-2 text-3xl font-extrabold">{value}</p></div><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon size={20} /></span></div></div>)}</div></section>;
  else if (activeSection === "articles" && detail) content = <section><button onClick={() => navigate("/chief-editor/articles")} className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-primary"><ChevronLeft size={17} /> Back to allocations</button><div className="rounded-2xl border bg-white p-6 shadow-sm md:p-8">
    <div className="flex flex-col justify-between gap-4 border-b pb-5 md:flex-row"><div><p className="text-xs font-bold uppercase tracking-widest text-primary">Allocation #{detail.article.assignment_id}</p><h1 className="mt-2 text-2xl font-extrabold">{detail.article.title}</h1><p className="mt-1 text-sm text-slate-500">{detail.article.author_name} / Editor: {detail.article.editor_name}</p></div><span className="h-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">{detail.article.article_status}</span></div>
    <p className="mt-6 whitespace-pre-wrap text-sm leading-7 text-slate-600">{detail.article.abstract || "No abstract supplied."}</p>
    <h2 className="mt-7 font-extrabold">Files</h2><p className="mt-1 text-sm text-slate-500">Chief Editor access is read-only. Files can be viewed or downloaded.</p><div className="mt-3 grid gap-3 md:grid-cols-2">{detail.files.map((file) => <div key={file.file_id} className="flex items-center gap-3 rounded-xl border p-4"><FileText size={18} className="text-primary" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{file.file_name}</p><p className="text-xs text-slate-500">{file.file_type} / Version {file.version}</p></div><div className="flex gap-1"><button disabled={acting} onClick={() => void accessFile(file.file_id, file.file_name, "view")} className="inline-flex items-center gap-1 rounded-lg px-2 py-2 text-xs font-bold text-slate-600 hover:bg-primary/10 hover:text-primary"><Eye size={15} /> View</button><button disabled={acting} onClick={() => void accessFile(file.file_id, file.file_name, "download")} className="inline-flex items-center gap-1 rounded-lg px-2 py-2 text-xs font-bold text-primary hover:bg-primary/10"><Download size={15} /> Download</button></div></div>)}</div>
    <div className="mt-7 grid gap-5 lg:grid-cols-3"><div><h2 className="font-extrabold">Reviews</h2>{detail.review_history.map((item) => <div key={item.editorial_review_id} className="mt-2 rounded-xl bg-slate-50 p-3"><p className="font-bold text-primary">{item.decision}</p><p className="text-sm">{item.comments || "No comments"}</p></div>)}</div><div><h2 className="font-extrabold">Revisions</h2>{detail.revision_history.map((item) => <div key={item.revision_id} className="mt-2 rounded-xl bg-slate-50 p-3"><p className="font-bold">Revision {item.revision_number}</p><p className="text-sm">{item.response_letter || "No letter"}</p></div>)}</div><div><h2 className="font-extrabold">Timeline</h2>{detail.article_timeline?.map((item, index) => <div key={index} className="mt-2 border-l-2 border-primary/30 pl-3"><p className="text-sm font-bold">{item.event}</p><p className="text-xs text-slate-500">{formatApiDate(item.at)}</p></div>)}</div></div>
  </div></section>;
  else if (activeSection === "articles") content = <section><Heading title="All Editor Allocations" text="Every article allocated across the editorial team." /><div className="overflow-hidden rounded-2xl border bg-white shadow-sm"><div className="p-4"><div className="relative"><Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search article, author, editor or status..." className="h-11 w-full rounded-xl border pl-11 pr-4 text-sm" /></div></div><div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-5 py-4">Article</th><th className="px-5 py-4">Author</th><th className="px-5 py-4">Editor</th><th className="px-5 py-4">Status</th><th className="px-5 py-4 text-right">Action</th></tr></thead><tbody className="divide-y">{visibleArticles.map((item) => <tr key={item.assignment_id}><td className="px-5 py-4"><p className="font-bold">{item.title}</p><p className="text-xs text-slate-500">#{item.article_id}</p></td><td className="px-5 py-4">{item.author_name}</td><td className="px-5 py-4">{item.editor_name}</td><td className="px-5 py-4"><span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{item.article_status}</span></td><td className="px-5 py-4 text-right"><button onClick={() => navigate(`/chief-editor/articles/${item.article_id}`)} className="rounded-xl border px-4 py-2 text-xs font-bold">Details</button></td></tr>)}</tbody></table></div></div>{!visibleArticles.length && <Empty>No allocations found.</Empty>}</section>;
  else if (activeSection === "pending") content = <section><Heading title="Pending Editorial Reviews" text="Active assignments currently in Editorial Review." />{pending.length ? <div className="space-y-3">{pending.map((item) => <button key={item.assignment_id} onClick={() => navigate(`/chief-editor/articles/${item.article_id}`)} className="w-full rounded-2xl border bg-white p-5 text-left shadow-sm hover:border-primary"><div className="flex justify-between"><div><h2 className="font-extrabold">{item.title}</h2><p className="mt-1 text-sm text-slate-500">Editor: {item.editor_name}</p></div><span className="text-xs text-slate-400">{formatApiDate(item.assigned_at)}</span></div></button>)}</div> : <Empty>No editorial reviews are pending.</Empty>}</section>;
  else if (activeSection === "revisions") content = <section><Heading title="Organization Revision Queue" text="Revision-requested articles across all Editors." />{revisions.length ? <div className="space-y-3">{revisions.map((item) => <button key={item.editorial_review_id} onClick={() => navigate(`/chief-editor/articles/${item.article_id}`)} className="w-full rounded-2xl border bg-white p-5 text-left shadow-sm"><h2 className="font-extrabold">{item.title}</h2><p className="mt-1 text-sm text-slate-500">{item.author_name} / {item.decision} / {formatApiDate(item.reviewed_at)}</p></button>)}</div> : <Empty>No articles currently require revision.</Empty>}</section>;
  else if (activeSection === "editors" && editorDetail) content = <section><button onClick={() => navigate("/chief-editor/editors")} className="mb-5 inline-flex items-center gap-2 font-bold text-primary"><ChevronLeft size={17} /> Back to Editors</button><Heading title={`${editorDetail.first_name} ${editorDetail.last_name}`} text={editorDetail.email} /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[["Assigned", editorDetail.assigned_articles], ["Completed", editorDetail.completed_reviews], ["Accepted", editorDetail.accepted], ["Rejected", editorDetail.rejected]].map(([label, value]) => <div key={String(label)} className="rounded-2xl border bg-white p-5 shadow-sm"><p className="text-sm font-bold text-slate-500">{label}</p><p className="mt-2 text-3xl font-extrabold">{value}</p></div>)}</div></section>;
  else if (activeSection === "editors") content = <section><Heading title="Editor Performance" text="Profiles, workloads, outcomes, and completion times." />{editors.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{editors.map((editor) => <button key={editor.editor_id} onClick={() => navigate(`/chief-editor/editors/${editor.editor_id}`)} className="rounded-2xl border bg-white p-5 text-left shadow-sm hover:border-primary"><div className="flex justify-between"><div><h2 className="font-extrabold">{editor.first_name} {editor.last_name}</h2><p className="text-sm text-slate-500">{editor.email}</p></div><span className="text-xs font-bold text-primary">{editor.status}</span></div><div className="mt-4 flex gap-4 text-xs text-slate-500"><span>{editor.assigned_articles} assigned</span><span>{editor.completed_reviews} completed</span></div></button>)}</div> : <Empty>No Editors were returned.</Empty>}</section>;
  else if (activeSection === "statistics" && statistics) content = <section><Heading title="Editorial Statistics" text="Decision rates and Editor workload distribution." /><div className="grid gap-4 md:grid-cols-4">{[["Acceptance Rate", statistics.acceptance_rate], ["Rejection Rate", statistics.rejection_rate], ["Revision Rate", statistics.revision_rate], ["Average Review", Math.round(statistics.average_review_time / 60)]].map(([label, value], index) => <div key={String(label)} className="rounded-2xl border bg-white p-5 shadow-sm"><p className="text-sm font-bold text-slate-500">{label}</p><p className="mt-2 text-3xl font-extrabold">{value}{index < 3 ? "%" : "h"}</p></div>)}</div><div className="mt-6 rounded-2xl border bg-white p-5 shadow-sm"><h2 className="font-extrabold">Editor workload</h2><div className="mt-4 space-y-3">{statistics.editor_workload.map((item) => <div key={item.editor_id} className="grid gap-2 rounded-xl bg-slate-50 p-4 md:grid-cols-4"><span className="font-bold">{item.first_name} {item.last_name}</span><span className="text-sm">{item.assigned_articles} assigned</span><span className="text-sm">{item.active_assignments} active</span><span className="text-sm">{item.completed_reviews} completed</span></div>)}</div></div></section>;
  else if (activeSection === "notifications") content = <section><Heading title="Notifications" text="Organization-wide editorial alerts addressed to you." />{notifications.length ? <div className="space-y-3">{notifications.map((item) => <button key={item.notification_id} onClick={() => !item.is_read && void markRead(item.notification_id)} className={`w-full rounded-2xl border p-5 text-left shadow-sm ${item.is_read ? "bg-white" : "border-primary/30 bg-primary/5"}`}><div className="flex justify-between"><h2 className="font-extrabold">{item.title}</h2><span className="text-xs text-slate-400">{formatApiDate(item.created_at)}</span></div><p className="mt-2 text-sm text-slate-600">{item.message}</p></button>)}</div> : <Empty>You have no notifications.</Empty>}</section>;
  else content = profile ? <section><Heading title="Chief Editor Profile" text="Your editorial leadership identity and performance." /><div className="rounded-2xl border bg-white p-6 shadow-sm"><div className="rounded-2xl bg-gradient-to-r from-slate-950 to-emerald-950 p-8 text-center text-white"><ShieldCheck size={36} className="mx-auto" /><h2 className="mt-4 text-2xl font-extrabold">{profile.first_name} {profile.last_name}</h2><p className="text-emerald-300">Chief Editor</p></div><div className="mt-5 grid gap-4 md:grid-cols-3">{([[Mail, "Email", profile.email], [BookOpenCheck, "Institution", profile.institution || "Not available"], [CheckCircle2, "Completed Reviews", profile.completed_reviews]] as Array<[LucideIcon, string, string | number]>).map(([Icon, label, value]) => <div key={label} className="rounded-xl bg-slate-50 p-4"><Icon size={18} className="text-primary" /><p className="mt-3 text-xs font-bold uppercase text-slate-400">{label}</p><p className="mt-1 font-bold">{value}</p></div>)}</div></div></section> : <Empty>Profile details are unavailable.</Empty>;

  return <WorkspaceShell activeSection={activeSection} navItems={navItems} onSectionChange={goTo} onLogout={() => void logout()} user={user} deskLabel="Chief Editor Desk" fallbackName="Chief Editor" isCollapsed={collapsed} onToggleSidebar={() => setCollapsed((value) => !value)}>{content}</WorkspaceShell>;
};

export default ChiefEditorIntegrated;
