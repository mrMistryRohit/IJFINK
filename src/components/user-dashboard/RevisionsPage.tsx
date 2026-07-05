import { useState } from "react";
import { ArrowLeft, MessageSquareText, Send, Upload, X } from "lucide-react";
import type { RevisionComment, UserDashboardSection } from "./types";
import type { UserArticle } from "@/lib/userArticlesApi";

type RevisionsPageProps = {
  articles: UserArticle[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
};

const sectionTextClass = "w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";

const RevisionsPage = ({ articles, isLoading, error, onRetry }: RevisionsPageProps) => {
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);
  const [expandedComment, setExpandedComment] = useState<RevisionComment | null>(null);

  const revisionArticles = articles.filter((article) => article.status === "Revision Requested");
  const selectedArticle = revisionArticles.find((article) => article.article_id === selectedArticleId) ?? null;

  if (isLoading) {
    return <section><span className="text-xs font-bold uppercase tracking-widest text-primary">Revisions</span><h1 className="mt-2 text-3xl font-extrabold text-slate-950">Revision Requests</h1><div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">Loading live revision requests...</div></section>;
  }

  if (error) {
    return <section><span className="text-xs font-bold uppercase tracking-widest text-primary">Revisions</span><h1 className="mt-2 text-3xl font-extrabold text-slate-950">Revision Requests</h1><div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-900 shadow-sm"><p>{error}</p><button type="button" onClick={onRetry} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white"><Send size={16} /> Try Again</button></div></section>;
  }

  if (revisionArticles.length === 0) {
    return <section><span className="text-xs font-bold uppercase tracking-widest text-primary">Revisions</span><h1 className="mt-2 text-3xl font-extrabold text-slate-950">Revision Requests</h1><div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">No revision-requested articles were returned by the backend.</div></section>;
  }

  if (!selectedArticle) {
    return (
      <section>
        <div className="mb-6"><span className="text-xs font-bold uppercase tracking-widest text-primary">Revisions</span><h1 className="mt-2 text-3xl font-extrabold text-slate-950">Revision Requests</h1><p className="mt-1 text-sm text-slate-500">Articles currently marked as revision requested.</p></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="font-extrabold text-slate-950">Revision Requested Documents</h2><p className="mt-1 text-sm text-slate-500">Loaded from your current article records.</p></div><span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-extrabold text-primary">{revisionArticles.length} pending</span></div><div className="mt-5 grid gap-4">{revisionArticles.map((article) => <button key={article.article_id} type="button" onClick={() => setSelectedArticleId(article.article_id)} className="group rounded-2xl border border-slate-100 bg-slate-50 p-5 text-left transition-colors hover:border-primary hover:bg-primary/5"><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-extrabold uppercase tracking-wider text-primary">Article #{article.article_id}</p><h3 className="mt-2 text-lg font-extrabold text-slate-950 group-hover:text-primary">{article.title}</h3><p className="mt-2 text-sm text-slate-500">{article.subject_area}</p></div><span className="w-fit rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">Revision Requested</span></div></button>)}</div></div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><span className="text-xs font-bold uppercase tracking-widest text-primary">Revisions</span><h1 className="mt-2 text-3xl font-extrabold text-slate-950">Revision Requests</h1><p className="mt-1 text-sm text-slate-500">The author API exposes article status and the article detail payload for the selected manuscript.</p></div><button type="button" onClick={() => setSelectedArticleId(null)} className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:border-primary hover:text-primary"><ArrowLeft size={16} /> All documents</button></div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5"><div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Article #{selectedArticle.article_id}</p><h2 className="mt-2 text-2xl font-extrabold text-slate-950">{selectedArticle.title}</h2></div><span className="w-fit rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">Revision Requested</span></div></div>
        <div className="grid gap-5 p-5 xl:grid-cols-[0.9fr_1fr]"><div><div className="mb-4 flex items-center gap-2"><MessageSquareText size={18} className="text-primary" /><h3 className="font-extrabold text-slate-950">Available backend data</h3></div><p className="text-sm leading-7 text-slate-600">The documented author API does not return reviewer comments for revisions in the list endpoint. We show the live revision status and offer the article detail record below instead of inventing review feedback.</p><div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700"><p className="font-bold text-slate-900">Subject area</p><p className="mt-1">{selectedArticle.subject_area || "General"}</p><p className="mt-4 font-bold text-slate-900">Updated</p><p className="mt-1">{selectedArticle.updated_at || selectedArticle.submitted_at || "Unknown"}</p></div></div><div><label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">Response letter</span><textarea rows={5} className={sectionTextClass} value="The backend currently does not expose revision responses on the author dashboard." readOnly /></label><div className="mt-4 grid gap-3 md:grid-cols-2">{["Revised manuscript", "Highlighted version"].map((label) => <label key={label} className="flex min-h-[110px] cursor-not-allowed flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center opacity-70"><Upload size={22} className="text-primary" /><span className="mt-2 text-sm font-bold text-slate-700">{label}</span><span className="mt-1 text-xs text-slate-400">Upload support not listed in the author API</span></label>)}</div></div></div>
      </div>
      {expandedComment && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm"><div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-2xl"><div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5"><div><p className="text-xs font-bold uppercase tracking-wider text-primary">{expandedComment.section}</p><h3 className="mt-1 text-xl font-extrabold text-slate-950">{expandedComment.reviewer}</h3></div><button type="button" onClick={() => setExpandedComment(null)} className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-colors hover:border-primary hover:text-primary" aria-label="Close full comment"><X size={17} /></button></div><div className="p-5"><span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">{expandedComment.severity}</span><p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-700">{expandedComment.comment}</p></div></div></div>}
    </section>
  );
};

export default RevisionsPage;
