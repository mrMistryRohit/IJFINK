import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Bell, BookOpenCheck, CheckCircle2, ChevronLeft, Clock3, Download, FileCheck2, FileText, History, Mail, RefreshCw, Search, ShieldCheck, Upload, UserCog, XCircle } from "lucide-react";
import WorkspaceShell from "@/components/editor-dashboard/WorkspaceShell";
import { WorkspaceError, WorkspaceLoading } from "@/components/editor-dashboard/WorkspaceStates";
import { formatApiDate } from "@/lib/dateUtils";
import { getStoredAuthUser, logoutUser } from "@/lib/authApi";
import { downloadEditorArticleFile, getEditorArticle, getEditorArticles, getEditorDashboard, getEditorNotifications, getEditorPublicationArticles, getEditorReviews, getEditorRevisionRequests, markEditorNotificationRead, submitEditorReview, uploadEditorEditableManuscript, type EditorArticle, type EditorArticleDetail, type EditorDashboardData, type EditorNotification, type EditorialReview, type EditorRevision } from "@/lib/editorApi";
import { toast } from "@/hooks/use-toast";

type Section = "dashboard" | "articles" | "revisions" | "reviews" | "publication" | "notifications" | "profile";
const routes: Record<Section, string> = { dashboard: "dashboard", articles: "articles", revisions: "revisions", reviews: "reviews", publication: "publication", notifications: "notifications", profile: "profile" };
const routeSections = Object.fromEntries(Object.entries(routes).map(([section, route]) => [route, section])) as Record<string, Section>;
const navItems = [
  { id: "dashboard" as const, label: "Dashboard", icon: FileCheck2 },
  { id: "articles" as const, label: "Assigned Articles", icon: FileText },
  { id: "revisions" as const, label: "Revision Queue", icon: RefreshCw },
  { id: "reviews" as const, label: "Review History", icon: History },
  { id: "publication" as const, label: "Publication Tracking", icon: BookOpenCheck },
  { id: "notifications" as const, label: "Notifications", icon: Bell },
  { id: "profile" as const, label: "Profile", icon: UserCog },
];
const Heading = ({ title, text }: { title: string; text: string }) => <div className="mb-7"><h1 className="text-3xl font-extrabold">{title}</h1><p className="mt-1 text-sm text-slate-500">{text}</p></div>;
const Empty = ({ children }: { children: string }) => <p className="rounded-2xl border bg-white p-10 text-center text-sm text-slate-500">{children}</p>;

const EditorIntegrated = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getStoredAuthUser();
  const parts = location.pathname.split("/").filter(Boolean);
  const activeSection = routeSections[parts[1]] as Section | undefined;
  const articleId = activeSection === "articles" && parts[2] ? Number(parts[2]) : null;
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dashboard, setDashboard] = useState<EditorDashboardData | null>(null);
  const [articles, setArticles] = useState<EditorArticle[]>([]);
  const [detail, setDetail] = useState<EditorArticleDetail | null>(null);
  const [revisions, setRevisions] = useState<EditorRevision[]>([]);
  const [reviews, setReviews] = useState<EditorialReview[]>([]);
  const [publication, setPublication] = useState<EditorArticle[]>([]);
  const [notifications, setNotifications] = useState<EditorNotification[]>([]);
  const [search, setSearch] = useState("");
  const [decision, setDecision] = useState("Minor Revision");
  const [comments, setComments] = useState("");
  const [editableFile, setEditableFile] = useState<File | null>(null);
  const [acting, setActing] = useState(false);

  const loadPage = useCallback(async () => {
    if (!activeSection || (activeSection === "articles" && articleId) || activeSection === "profile") { setLoading(false); return; }
    setLoading(true); setError("");
    try {
      if (activeSection === "dashboard") setDashboard(await getEditorDashboard());
      else if (activeSection === "articles") setArticles((await getEditorArticles()).articles);
      else if (activeSection === "revisions") setRevisions((await getEditorRevisionRequests()).articles);
      else if (activeSection === "reviews") setReviews((await getEditorReviews()).reviews);
      else if (activeSection === "publication") setPublication((await getEditorPublicationArticles()).articles);
      else if (activeSection === "notifications") setNotifications((await getEditorNotifications()).notifications);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Unable to load this page."); }
    finally { setLoading(false); }
  }, [activeSection, articleId]);

  const loadDetail = useCallback(async () => {
    if (!articleId || !Number.isInteger(articleId)) return;
    setLoading(true); setError("");
    try { setDetail(await getEditorArticle(articleId)); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Unable to load this article."); }
    finally { setLoading(false); }
  }, [articleId]);

  useEffect(() => {
    setDetail(null);
    if (articleId) void loadDetail(); else void loadPage();
    if (!activeSection || activeSection === "profile" || articleId) return;
    const interval = window.setInterval(() => void loadPage(), activeSection === "notifications" ? 10000 : 20000);
    return () => window.clearInterval(interval);
  }, [activeSection, articleId, loadDetail, loadPage]);

  const visibleArticles = useMemo(() => {
    const term = search.trim().toLowerCase();
    return term ? articles.filter((article) => [article.title, article.author_name, article.article_status, article.subject_area, String(article.article_id)].some((value) => value?.toLowerCase().includes(term))) : articles;
  }, [articles, search]);

  const download = async (fileId: number, fileName: string) => {
    if (!detail) return;
    setActing(true);
    try {
      const blob = await downloadEditorArticleFile(detail.article.article_id, fileId);
      const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = fileName; link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch (cause) { toast({ title: "Download failed", description: cause instanceof Error ? cause.message : "Unable to download.", variant: "destructive" }); }
    finally { setActing(false); }
  };
  const upload = async () => {
    if (!detail || !editableFile) return;
    setActing(true);
    try { await uploadEditorEditableManuscript(detail.article.article_id, editableFile); setEditableFile(null); toast({ title: "Editable manuscript uploaded" }); await loadDetail(); }
    catch (cause) { toast({ title: "Upload failed", description: cause instanceof Error ? cause.message : "Unable to upload.", variant: "destructive" }); }
    finally { setActing(false); }
  };
  const submitDecision = async () => {
    if (!detail) return;
    setActing(true);
    try { await submitEditorReview(detail.article.assignment_id, decision, comments.trim()); setComments(""); toast({ title: "Editorial decision submitted" }); await loadDetail(); }
    catch (cause) { toast({ title: "Decision failed", description: cause instanceof Error ? cause.message : "Unable to submit.", variant: "destructive" }); }
    finally { setActing(false); }
  };
  const markRead = async (id: number) => {
    try { await markEditorNotificationRead(id); setNotifications((items) => items.map((item) => item.notification_id === id ? { ...item, is_read: true } : item)); }
    catch (cause) { toast({ title: "Notification update failed", description: cause instanceof Error ? cause.message : "Please try again.", variant: "destructive" }); }
  };

  if (!activeSection) return <Navigate to="/editor/dashboard" replace />;
  const retry = () => void (articleId ? loadDetail() : loadPage());
  const goTo = (section: Section) => navigate(`/editor/${routes[section]}`);
  const logout = async () => { await logoutUser(); navigate("/login", { replace: true }); };
  let content: React.ReactNode;

  if (loading) content = <WorkspaceLoading />;
  else if (error) content = <WorkspaceError message={error} onRetry={retry} />;
  else if (activeSection === "dashboard" && dashboard) content = <section><Heading title="Editor Dashboard" text="Your assigned workload and editorial decisions." /><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{[
    ["Assigned Articles", dashboard.assigned_articles, FileText, "bg-blue-50 text-blue-600"], ["Pending Reviews", dashboard.pending_reviews, Clock3, "bg-amber-50 text-amber-600"], ["Completed Reviews", dashboard.completed_reviews, CheckCircle2, "bg-emerald-50 text-emerald-600"], ["Revision Requests", dashboard.revision_requests, RefreshCw, "bg-violet-50 text-violet-600"], ["Accepted", dashboard.accepted_articles, BookOpenCheck, "bg-teal-50 text-teal-600"], ["Rejected", dashboard.rejected_articles, XCircle, "bg-rose-50 text-rose-600"],
  ].map(([label, value, Icon, tone]) => <div key={String(label)} className="rounded-2xl border bg-white p-5 shadow-sm"><div className="flex justify-between"><div><p className="text-sm font-bold text-slate-500">{String(label)}</p><p className="mt-2 text-3xl font-extrabold">{String(value)}</p></div><span className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone}`}><Icon size={20} /></span></div></div>)}</div></section>;
  else if (activeSection === "articles" && detail) content = <section><button onClick={() => navigate("/editor/articles")} className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-primary"><ChevronLeft size={17} /> Back to articles</button><div className="rounded-2xl border bg-white p-6 shadow-sm md:p-8">
    <div className="flex flex-col justify-between gap-4 border-b pb-5 md:flex-row"><div><p className="text-xs font-bold uppercase tracking-widest text-primary">Article #{detail.article.article_id}</p><h1 className="mt-2 text-2xl font-extrabold">{detail.article.title}</h1><p className="mt-1 text-sm text-slate-500">{detail.article.author_name} / {detail.article.subject_area}</p></div><span className="h-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">{detail.current_status}</span></div>
    <div className="mt-5 grid gap-4 md:grid-cols-3">{[["Author email", detail.article.author_email || "Not available"], ["Institution", detail.article.author_institution || "Not available"], ["Assigned", formatApiDate(detail.article.assigned_at)]].map(([label, value]) => <div key={label} className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase text-slate-400">{label}</p><p className="mt-1 font-bold">{value}</p></div>)}</div>
    <h2 className="mt-6 font-extrabold">Abstract</h2><p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-600">{detail.article.abstract || "No abstract supplied."}</p>
    <h2 className="mt-7 font-extrabold">Article files</h2><div className="mt-3 grid gap-3 md:grid-cols-2">{detail.files.map((file) => <div key={file.file_id} className="flex items-center gap-3 rounded-xl border p-4"><FileText className="text-primary" size={19} /><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{file.file_name}</p><p className="text-xs text-slate-500">{file.file_type} / Version {file.version}</p></div><button disabled={acting} onClick={() => void download(file.file_id, file.file_name)} className="rounded-lg p-2 text-primary hover:bg-primary/10"><Download size={17} /></button></div>)}</div>
    <div className="mt-7 grid gap-5 lg:grid-cols-2"><div className="rounded-2xl border p-5"><h2 className="font-extrabold">Upload edited manuscript</h2><p className="mt-1 text-xs text-slate-500">DOC, DOCX, ODT or RTF. Previous versions remain available.</p><input type="file" accept=".doc,.docx,.odt,.rtf" onChange={(event) => setEditableFile(event.target.files?.[0] || null)} className="mt-4 block w-full text-sm" /><button disabled={!editableFile || acting} onClick={() => void upload()} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50"><Upload size={16} /> Upload new version</button></div>
    <div className="rounded-2xl border p-5"><h2 className="font-extrabold">Editorial decision</h2><select value={decision} onChange={(event) => setDecision(event.target.value)} className="mt-4 h-11 w-full rounded-xl border px-3 text-sm"><option>Accepted</option><option>Minor Revision</option><option>Major Revision</option><option>Rejected</option></select><textarea value={comments} onChange={(event) => setComments(event.target.value)} placeholder="Comments for the author..." className="mt-3 min-h-24 w-full rounded-xl border p-3 text-sm" /><button disabled={acting} onClick={() => void submitDecision()} className="mt-3 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50">Submit decision</button></div></div>
    <div className="mt-7 grid gap-5 lg:grid-cols-2"><div><h2 className="font-extrabold">Review history</h2>{detail.review_history.length ? detail.review_history.map((review) => <div key={review.editorial_review_id} className="mt-3 rounded-xl bg-slate-50 p-4"><p className="font-bold text-primary">{review.decision}</p><p className="mt-1 text-sm">{review.comments || "No comments"}</p></div>) : <p className="mt-2 text-sm text-slate-500">No reviews yet.</p>}</div><div><h2 className="font-extrabold">Revision history</h2>{detail.revision_history.length ? detail.revision_history.map((revision, index) => <div key={revision.revision_id || index} className="mt-3 rounded-xl bg-slate-50 p-4"><p className="font-bold">Revision {revision.revision_number || index + 1}</p><p className="mt-1 text-sm">{revision.response_letter || "No response letter"}</p></div>) : <p className="mt-2 text-sm text-slate-500">No revisions yet.</p>}</div></div>
  </div></section>;
  else if (activeSection === "articles") content = <section><Heading title="Assigned Articles" text="Articles assigned to your editorial account." /><div className="overflow-hidden rounded-2xl border bg-white shadow-sm"><div className="p-4"><div className="relative"><Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search title, author, subject or status..." className="h-11 w-full rounded-xl border pl-11 pr-4 text-sm outline-none focus:border-primary" /></div></div><div className="overflow-x-auto"><table className="w-full min-w-[800px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-5 py-4">Article</th><th className="px-5 py-4">Author</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Assigned</th><th className="px-5 py-4 text-right">Action</th></tr></thead><tbody className="divide-y">{visibleArticles.map((article) => <tr key={article.article_id}><td className="px-5 py-4"><p className="font-bold">{article.title}</p><p className="text-xs text-slate-500">#{article.article_id} / {article.article_type}</p></td><td className="px-5 py-4">{article.author_name}</td><td className="px-5 py-4"><span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{article.article_status}</span></td><td className="px-5 py-4 text-slate-500">{formatApiDate(article.assigned_at)}</td><td className="px-5 py-4 text-right"><button onClick={() => navigate(`/editor/articles/${article.article_id}`)} className="rounded-xl border px-4 py-2 text-xs font-bold hover:border-primary hover:text-primary">Open</button></td></tr>)}</tbody></table></div></div>{!visibleArticles.length && <Empty>No assigned articles found.</Empty>}</section>;
  else if (activeSection === "revisions") content = <section><Heading title="Revision Queue" text="Articles currently awaiting or returning from author revision." />{revisions.length ? <div className="grid gap-4">{revisions.map((item, index) => <button key={item.editorial_review_id || index} onClick={() => item.article_id && navigate(`/editor/articles/${item.article_id}`)} className="rounded-2xl border bg-white p-5 text-left shadow-sm hover:border-primary"><div className="flex justify-between"><div><h2 className="font-extrabold">{item.title}</h2><p className="mt-1 text-sm text-slate-500">{item.author_name} / {item.decision}</p></div><span className="text-xs text-primary">{formatApiDate(item.reviewed_at)}</span></div></button>)}</div> : <Empty>No revision requests are currently assigned to you.</Empty>}</section>;
  else if (activeSection === "reviews") content = <section><Heading title="Review History" text="Every editorial decision submitted from your account." />{reviews.length ? <div className="space-y-3">{reviews.map((review) => <div key={review.editorial_review_id} className="rounded-2xl border bg-white p-5 shadow-sm"><div className="flex justify-between"><div><p className="font-extrabold">{review.title || `Article #${review.article_id}`}</p><p className="mt-1 font-bold text-primary">{review.decision}</p></div><span className="text-xs text-slate-500">{formatApiDate(review.reviewed_at)}</span></div><p className="mt-3 text-sm text-slate-600">{review.comments || "No comments provided."}</p></div>)}</div> : <Empty>No reviews have been submitted yet.</Empty>}</section>;
  else if (activeSection === "publication") content = <section><Heading title="Publication Tracking" text="Accepted articles moving through publication." />{publication.length ? <div className="grid gap-4 md:grid-cols-2">{publication.map((article) => <div key={article.article_id} className="rounded-2xl border bg-white p-5 shadow-sm"><span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{article.article_status}</span><h2 className="mt-4 font-extrabold">{article.title}</h2><p className="mt-1 text-sm text-slate-500">{article.author_name}</p><p className="mt-4 text-xs text-slate-400">Updated {formatApiDate(article.updated_at)}</p></div>)}</div> : <Empty>No assigned articles have entered publication yet.</Empty>}</section>;
  else if (activeSection === "notifications") content = <section><Heading title="Notifications" text="Assignment, revision, and publication updates." />{notifications.length ? <div className="space-y-3">{notifications.map((item) => <button key={item.notification_id} onClick={() => !item.is_read && void markRead(item.notification_id)} className={`w-full rounded-2xl border p-5 text-left shadow-sm ${item.is_read ? "bg-white" : "border-primary/30 bg-primary/5"}`}><div className="flex justify-between"><h2 className="font-extrabold">{item.title}</h2><span className="text-xs text-slate-400">{formatApiDate(item.created_at)}</span></div><p className="mt-2 text-sm text-slate-600">{item.message}</p>{!item.is_read && <p className="mt-3 text-xs font-bold text-primary">Click to mark as read</p>}</button>)}</div> : <Empty>You have no notifications.</Empty>}</section>;
  else content = <section><Heading title="Editor Profile" text="Your authenticated editorial workspace identity." /><div className="rounded-2xl border bg-white p-6 shadow-sm"><div className="rounded-2xl bg-gradient-to-r from-slate-950 to-emerald-950 p-8 text-center text-white"><ShieldCheck size={36} className="mx-auto" /><h2 className="mt-4 text-2xl font-extrabold">{user?.display_name || "Editor"}</h2><p className="text-emerald-300">Editor</p></div><div className="mt-5 grid gap-4 md:grid-cols-3">{[[Mail, "Email", user?.email || "Not available"], [ShieldCheck, "Status", user?.status || "Not available"], [UserCog, "Profile ID", String(user?.profile_id || "Not available")]].map(([Icon, label, value]) => <div key={String(label)} className="rounded-xl bg-slate-50 p-4"><Icon size={18} className="text-primary" /><p className="mt-3 text-xs font-bold uppercase text-slate-400">{String(label)}</p><p className="mt-1 break-words font-bold">{String(value)}</p></div>)}</div></div></section>;

  return <WorkspaceShell activeSection={activeSection} navItems={navItems} onSectionChange={goTo} onLogout={() => void logout()} user={user} deskLabel="Editor Workspace" fallbackName="Editor" isCollapsed={collapsed} onToggleSidebar={() => setCollapsed((value) => !value)}>{content}</WorkspaceShell>;
};

export default EditorIntegrated;
