import { Bell, CheckCircle2 } from "lucide-react";
import type { UserArticle } from "@/lib/userArticlesApi";

type NotificationsPanelProps = {
  articles: UserArticle[];
};

const sourceTone = {
  Editor: "bg-blue-50 text-blue-700",
  Reviewer: "bg-purple-50 text-purple-700",
  System: "bg-slate-100 text-slate-700",
} as const;

const NotificationsPanel = ({ articles }: NotificationsPanelProps) => {
  const notifications = articles.slice(0, 6).map((article) => ({
    id: String(article.article_id),
    title: article.status === "Published" ? "Article published" : article.status === "Revision Requested" ? "Revision requested" : "Article update",
    source: "System" as const,
    message: `${article.title} is currently marked as ${article.status || "Submitted"}.`,
    date: article.updated_at || article.submitted_at || "Unknown date",
    unread: article.status !== "Published",
  }));

  return (
    <section>
      <div className="mb-6"><span className="text-xs font-bold uppercase tracking-widest text-primary">Notifications</span><h1 className="mt-2 text-3xl font-extrabold text-slate-950">Author Updates</h1><p className="mt-1 text-sm text-slate-500">Derived from your live article records.</p></div>
      {notifications.length === 0 ? <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">No notifications can be derived from the current author article data.</div> : <div className="grid gap-4">{notifications.map((notification) => <div key={notification.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between"><div className="flex gap-3"><div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">{notification.unread ? <Bell size={19} /> : <CheckCircle2 size={19} />}</div><div><h2 className="font-extrabold text-slate-950">{notification.title}</h2><p className="mt-1 text-sm leading-relaxed text-slate-600">{notification.message}</p><p className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-400">{notification.date}</p></div></div><span className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${sourceTone[notification.source]}`}>{notification.source}</span></div></div>)}</div>}
    </section>
  );
};

export default NotificationsPanel;
