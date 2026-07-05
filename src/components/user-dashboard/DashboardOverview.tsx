import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowUpRight, Bell, BookOpen, CheckCircle2, FileText, MessageSquareText, Plus, Send } from "lucide-react";
import type { AuthorProfile, ArticleListItem, UserDashboardSection, UserNotification } from "./types";

type DashboardOverviewProps = {
  profile: AuthorProfile | null;
  articles: import("@/lib/userArticlesApi").UserArticle[];
  isLoading: boolean;
  error: string | null;
  onSectionChange: (section: UserDashboardSection) => void;
  onRetry: () => void;
};

const DashboardOverview = ({ profile, articles, isLoading, error, onSectionChange, onRetry }: DashboardOverviewProps) => {
  const displayName = profile?.display_name?.trim() || profile?.email || "Author";

  const liveItems = useMemo<ArticleListItem[]>(() => articles.map((article) => ({
    articleId: article.article_id,
    title: article.title,
    abstract: article.abstract?.trim() || "No abstract is available for this article yet.",
    articleType: article.article_type?.trim() || "Article",
    subjectArea: article.subject_area?.trim() || "General",
    status: article.status || "Submitted",
    submittedAt: article.submitted_at || article.updated_at || "",
    updatedAt: article.updated_at || article.submitted_at || "",
    authorName: article.author?.display_name?.trim() || [article.author?.first_name, article.author?.last_name].filter(Boolean).join(" ") || displayName,
    authorInstitution: article.author?.institution?.trim() || undefined,
    coAuthorCount: article.co_authors?.length ?? 0,
    keywords: Array.isArray(article.keywords) ? article.keywords : typeof article.keywords === "string" ? article.keywords.split(",").map((keyword) => keyword.trim()).filter(Boolean) : [],
    thumbnailUrl: article.thumbnail_url ?? article.cover_image_url ?? null,
    files: (article.files ?? []).map((file) => ({ fileName: file.file_name, fileType: file.file_type, filePath: file.file_path, fileUrl: file.file_url })),
  })), [articles, displayName]);

  const publishedCount = liveItems.filter((article) => article.status === "Published").length;
  const activeCount = liveItems.filter((article) => !["Accepted", "Rejected", "Published"].includes(article.status)).length;
  const acceptedCount = liveItems.filter((article) => article.status === "Accepted").length;
  const unreadCount = liveItems.filter((article) => article.status && article.status !== "Published").length;

  const stats = [
    { label: "Active Submissions", value: activeCount, sub: "From the backend", icon: FileText, tone: "bg-blue-50 text-blue-600" },
    { label: "Publications", value: publishedCount, sub: "Published records", icon: BookOpen, tone: "bg-violet-50 text-violet-600" },
    { label: "Accepted", value: acceptedCount, sub: "Ready for publication", icon: CheckCircle2, tone: "bg-emerald-50 text-emerald-600" },
    { label: "New Updates", value: unreadCount, sub: "Article status updates", icon: Bell, tone: "bg-rose-50 text-rose-600" },
  ];

  const chartData = liveItems.slice(0, 6).map((article, index) => ({ month: `#${index + 1}`, submissions: index + 1, accepted: article.status === "Accepted" ? 1 : 0 }));

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm text-slate-500">Welcome back,</p>
          <h1 className="mt-1 text-3xl font-extrabold text-slate-950">{displayName}</h1>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Live author data from `/api/user/articles`</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => onSectionChange("submissions")} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-950 shadow-sm transition-colors hover:border-primary hover:text-primary">View articles</button>
          <button type="button" onClick={() => onSectionChange("submit")} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-sm shadow-primary/20 transition-colors hover:bg-primary/90"><Plus size={17} /> New submission</button>
        </div>
      </div>

      {error && <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"><div className="flex items-center justify-between gap-3"><p>{error}</p><button type="button" onClick={onRetry} className="rounded-lg bg-slate-950 px-3 py-2 text-xs font-bold text-white">Retry</button></div></div>}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((stat) => <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-medium uppercase tracking-widest text-slate-500">{stat.label}</p><p className="mt-2 text-3xl font-extrabold text-slate-950">{stat.value}</p><p className="mt-2 text-xs font-semibold text-emerald-600">{stat.sub}</p></div><div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.tone}`}><stat.icon size={20} /></div></div></div>)}</div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.9fr_0.95fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><h2 className="font-extrabold text-slate-950">Submission activity</h2><p className="mt-1 text-xs text-slate-500">Live article snapshots</p></div></div>
          <div className="h-64"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData} margin={{ left: -24, right: 8, top: 8, bottom: 0 }}><CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#475569" }} /><YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#475569" }} domain={[0, 6]} /><Tooltip /><Area type="monotone" dataKey="submissions" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="hsl(var(--primary) / 0.12)" /><Area type="monotone" dataKey="accepted" stroke="hsl(168 70% 24%)" strokeWidth={2.5} fill="rgba(15, 118, 110, 0.08)" /></AreaChart></ResponsiveContainer></div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="font-extrabold text-slate-950">Recent updates</h2><p className="mt-1 text-xs text-slate-500">Derived from current article records</p><div className="mt-6 space-y-5">{liveItems.slice(0, 4).map((article) => { const Icon = MessageSquareText; return <div key={article.articleId} className="flex gap-3"><div className="relative flex flex-col items-center"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/10"><Icon size={15} /></span></div><div className="pb-1"><p className="text-sm font-extrabold text-slate-950">{article.title}</p><p className="mt-1 text-xs font-medium text-slate-500">{article.status}</p></div></div>; })}{liveItems.length === 0 && <p className="text-sm text-slate-500">No live article updates are available yet.</p>}</div></div>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-start justify-between gap-3 p-5"><div><h2 className="font-extrabold text-slate-950">Recent articles</h2><p className="mt-1 text-xs text-slate-500">Fetched from the author endpoint</p></div><button type="button" onClick={() => onSectionChange("submissions")} className="inline-flex items-center gap-2 text-xs font-bold text-slate-950 transition-colors hover:text-primary">View all <ArrowUpRight size={14} /></button></div>
        <div className="overflow-hidden"><table className="w-full table-fixed text-left text-sm"><thead className="border-y border-slate-200 text-xs font-semibold text-slate-500"><tr><th className="w-[42%] px-5 py-3">Title</th><th className="w-[28%] px-5 py-3">Subject</th><th className="w-[19%] px-5 py-3">Status</th><th className="w-[11%] px-5 py-3 text-right">Updated</th></tr></thead><tbody className="divide-y divide-slate-100">{liveItems.slice(0, 5).map((submission) => <tr key={submission.articleId} className="hover:bg-slate-50/70"><td className="px-5 py-3"><p className="font-extrabold text-slate-950">{submission.title}</p><p className="mt-1 text-xs font-semibold text-slate-500">#{submission.articleId}</p></td><td className="px-5 py-3 text-xs text-slate-500">{submission.subjectArea}</td><td className="px-5 py-3"><span className="inline-flex whitespace-nowrap rounded-full border border-slate-200 px-3 py-1 text-xs font-bold text-slate-700">{submission.status}</span></td><td className="px-5 py-3 text-right text-xs font-medium text-slate-500">{submission.updatedAt || submission.submittedAt}</td></tr>)}</tbody></table></div>
      </div>
    </section>
  );
};

export default DashboardOverview;
