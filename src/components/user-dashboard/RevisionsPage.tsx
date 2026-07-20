import { useNavigate } from "react-router-dom";
import { Send } from "lucide-react";
import { type UserArticle } from "@/lib/userArticlesApi";

type RevisionsPageProps = {
  articles: UserArticle[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
};

const RevisionsPage = ({ articles, isLoading, error, onRetry }: RevisionsPageProps) => {
  const navigate = useNavigate();
  const revisionArticles = articles.filter((article) => article.status === "Revision Requested");

  if (isLoading) {
    return (
      <section>
        <span className="text-xs font-bold uppercase tracking-widest text-primary">Revisions</span>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Revision Requests</h1>
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">Loading live revision requests...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <span className="text-xs font-bold uppercase tracking-widest text-primary">Revisions</span>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Revision Requests</h1>
        <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-900 shadow-sm">
          <p>{error}</p>
          <button type="button" onClick={onRetry} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white">
            <Send size={16} /> Try Again
          </button>
        </div>
      </section>
    );
  }

  if (revisionArticles.length === 0) {
    return (
      <section>
        <span className="text-xs font-bold uppercase tracking-widest text-primary">Revisions</span>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Revision Requests</h1>
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">No revision-requested articles were returned by the backend.</div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">Revisions</span>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Revision Requests</h1>
        <p className="mt-1 text-sm text-slate-500">Articles currently marked as revision requested.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-extrabold text-slate-950">Revision Requested Documents</h2>
            <p className="mt-1 text-sm text-slate-500">Open an article to view the editorial review and submit the revision.</p>
          </div>
          <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-extrabold text-primary">{revisionArticles.length} pending</span>
        </div>

        <div className="mt-5 grid gap-4">
          {revisionArticles.map((article) => (
            <button
              key={article.article_id}
              type="button"
              onClick={() => navigate(`/user/my-submissions/revision/revision-submission/${article.article_id}`)}
              className="group rounded-2xl border border-slate-100 bg-slate-50 p-5 text-left transition-colors hover:border-primary hover:bg-primary/5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-primary">Article #{article.article_id}</p>
                  <h3 className="mt-2 text-lg font-extrabold text-slate-950 group-hover:text-primary">{article.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{article.subject_area}</p>
                </div>
                <span className="w-fit rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">Revision Requested</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RevisionsPage;
