import { Download, Eye, Quote } from "lucide-react";
import type { UserArticle } from "@/lib/userArticlesApi";

type PublishedPublicationsPageProps = {
  articles: UserArticle[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
};

const PublishedPublicationsPage = ({ articles, isLoading, error, onRetry }: PublishedPublicationsPageProps) => {
  const published = articles.filter((article) => article.status === "Published");

  return (
    <section>
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">Publications</span>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Publications Records</h1>
      </div>
      {error && <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"><div className="flex items-center justify-between gap-3"><p>{error}</p><button type="button" onClick={onRetry} className="rounded-lg bg-slate-950 px-3 py-2 text-xs font-bold text-white">Retry</button></div></div>}
      {isLoading ? <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">Loading publication records...</div> : published.length === 0 ? <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">No published articles were returned by the backend.</div> : <div className="grid gap-5">{published.map((paper) => <article key={paper.article_id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center"><div className="min-w-0"><span className="inline-flex w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{paper.subject_area || "Published record"}</span><h2 className="mt-4 text-2xl font-extrabold leading-tight text-slate-950">{paper.title}</h2><p className="mt-3 text-sm font-medium text-slate-500">{paper.author?.display_name || [paper.author?.first_name, paper.author?.last_name].filter(Boolean).join(" ") || "Author information returned by backend only"}</p><p className="mt-4 max-w-4xl text-sm leading-6 text-slate-600">{paper.abstract || "Published article data was retrieved from the author endpoint, but citation metrics are not available from the documented API."}</p><div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-500"><span>Article ID: {paper.article_id}</span><span>{paper.article_type || "Article"}</span><span>{paper.updated_at || paper.submitted_at || "Published"}</span></div></div><div className="grid grid-cols-3 gap-3 lg:w-[290px]"><div className="rounded-2xl bg-slate-50 p-4 text-center"><Quote size={18} className="mx-auto text-primary" /><p className="mt-2 text-lg font-extrabold text-slate-950">0</p><p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">Cites</p></div><div className="rounded-2xl bg-slate-50 p-4 text-center"><Download size={18} className="mx-auto text-primary" /><p className="mt-2 text-lg font-extrabold text-slate-950">0</p><p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">Downloads</p></div><div className="rounded-2xl bg-slate-50 p-4 text-center"><Eye size={18} className="mx-auto text-primary" /><p className="mt-2 text-lg font-extrabold text-slate-950">0</p><p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">Views</p></div></div></div></article>)}</div>}
    </section>
  );
};

export default PublishedPublicationsPage;
