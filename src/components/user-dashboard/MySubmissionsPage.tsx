import { useCallback, useEffect, useMemo, useState } from "react";
import { format, isValid, parse, parseISO } from "date-fns";
import {
  ArrowLeft,
  BookCopy,
  CalendarDays,
  ChevronRight,
  FileText,
  RefreshCcw,
  Search,
  Plus,
  UserRound,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { clearAuthSession } from "@/lib/authApi";
import { getStoredAuthUser } from "@/lib/adminApi";
import { ApiError, getMyArticles, type UserArticle } from "@/lib/userArticlesApi";
import type { ArticleListItem, ArticleStatus, UserDashboardSection } from "./types";
import { userProfile } from "./userDashboardData";

type MySubmissionsPageProps = {
  onSectionChange: (section: UserDashboardSection) => void;
};

const statusOptions: Array<ArticleStatus | "All"> = [
  "All",
  "Submitted",
  "Admin Approved",
  "Editorial Review",
  "Revision Requested",
  "Accepted",
  "Publication Review",
  "Submitted To Organization",
  "Published",
  "Rejected",
];

const statusTone: Record<string, string> = {
  Submitted: "bg-cyan-50 text-cyan-700",
  "Admin Approved": "bg-sky-50 text-sky-700",
  "Editorial Review": "bg-blue-50 text-blue-700",
  "Revision Requested": "bg-amber-50 text-amber-700",
  Accepted: "bg-emerald-50 text-emerald-700",
  "Publication Review": "bg-violet-50 text-violet-700",
  "Submitted To Organization": "bg-indigo-50 text-indigo-700",
  Published: "bg-emerald-50 text-emerald-700",
  Rejected: "bg-rose-50 text-rose-700",
};

const skeletonCards = Array.from({ length: 6 }, (_, index) => index);

const getDisplayName = () => {
  const authUser = getStoredAuthUser();
  return authUser?.display_name?.trim() || userProfile.name;
};

const buildAuthorName = (article: UserArticle) => {
  const author = article.author;

  if (!author) return getDisplayName();

  const fullName = author.display_name ?? author.name;
  if (fullName?.trim()) return fullName.trim();

  const parts = [author.first_name, author.last_name].filter(Boolean);
  if (parts.length) return parts.join(" ");

  return getDisplayName();
};

const normalizeKeywords = (keywords: UserArticle["keywords"]) => {
  if (!keywords) return [];
  if (Array.isArray(keywords)) return keywords.map((keyword) => keyword.trim()).filter(Boolean);
  return keywords
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);
};

const formatBackendDate = (value?: string) => {
  if (!value) return "Unknown date";

  const parsed = value.includes("T")
    ? parseISO(value)
    : value.includes(":")
      ? parse(value, "yyyy-MM-dd HH:mm:ss", new Date())
      : parse(value, "yyyy-MM-dd", new Date());

  if (!isValid(parsed)) {
    const fallback = new Date(value);
    return isValid(fallback) ? format(fallback, "dd MMM yyyy") : value;
  }

  return format(parsed, "dd MMM yyyy");
};

const toArticleListItem = (article: UserArticle): ArticleListItem => {
  const thumbnailCandidate = article.thumbnail_url ?? article.cover_image_url ?? null;
  const files = (article.files ?? []).map((file) => ({
    fileName: file.file_name,
    fileType: file.file_type,
    filePath: file.file_path,
    fileUrl: file.file_url,
  }));

  return {
    articleId: article.article_id,
    title: article.title,
    abstract: article.abstract?.trim() || "No abstract is available for this article yet.",
    articleType: article.article_type?.trim() || "Article",
    subjectArea: article.subject_area?.trim() || "General",
    status: (article.status?.trim() || "Submitted") as ArticleStatus,
    submittedAt: article.submitted_at || article.updated_at || "",
    updatedAt: article.updated_at || article.submitted_at || "",
    authorName: buildAuthorName(article),
    authorInstitution: article.author?.institution?.trim() || undefined,
    coAuthorCount: article.co_authors?.length ?? 0,
    keywords: normalizeKeywords(article.keywords),
    thumbnailUrl: thumbnailCandidate,
    files,
  };
};

const getThumbnailLabel = (title: string) =>
  title
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "AR";

const MySubmissionsPage = ({ onSectionChange }: MySubmissionsPageProps) => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<ArticleListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<(typeof statusOptions)[number]>("All");
  const [searchTerm, setSearchTerm] = useState("");

  const loadArticles = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getMyArticles();
      setArticles(response.map(toArticleListItem));
    } catch (caughtError) {
      if (caughtError instanceof ApiError && (caughtError.status === 401 || caughtError.status === 403)) {
        clearAuthSession();
        toast({
          title: "Session expired",
          description: "Please sign in again to continue.",
          variant: "destructive",
        });
        navigate("/login", { replace: true });
        return;
      }

      const message = caughtError instanceof Error ? caughtError.message : "We could not load your articles.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    void loadArticles();
  }, [loadArticles]);

  const filteredArticles = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesStatus = statusFilter === "All" || article.status === statusFilter;
      const matchesQuery =
        !query ||
        [article.title, article.articleType, article.subjectArea, article.authorName, article.abstract, article.articleId.toString()]
          .join(" ")
          .toLowerCase()
          .includes(query);

      return matchesStatus && matchesQuery;
    });
  }, [articles, searchTerm, statusFilter]);

  const stats = useMemo(() => {
    const published = articles.filter((article) => article.status === "Published").length;
    const active = articles.filter((article) => !["Published", "Rejected"].includes(article.status)).length;
    const revisions = articles.filter((article) => article.status === "Revision Requested").length;

    return [
      { label: "Total Articles", value: articles.length, note: "All submissions" },
      { label: "Published", value: published, note: "Live on record" },
      { label: "In Review", value: active, note: "Needs attention" },
      { label: "Revisions", value: revisions, note: "Awaiting resubmission" },
    ];
  }, [articles]);

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">My Articles</span>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Articles Created by You</h1>
        </div>
        <button
          type="button"
          onClick={() => onSectionChange("submit")}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
        >
          <Plus size={17} /> Submit New Article
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{item.label}</p>
            <p className="mt-3 text-3xl font-extrabold text-slate-950">{item.value}</p>
            <p className="mt-2 text-xs font-semibold text-slate-500">{item.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[0.8fr_1fr]">
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">Status</label>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            {statusOptions.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">Search</label>
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="Search title, subject area, or article ID"
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skeletonCards.map((index) => (
            <div
              key={index}
              className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex min-h-[15rem] gap-4">
                <div className="flex w-[38%] items-center justify-center rounded-2xl bg-slate-100/90">
                  <div className="h-full w-full rounded-2xl bg-gradient-to-br from-slate-200 to-slate-100" />
                </div>
                <div className="w-px bg-slate-200" />
                <div className="flex flex-1 flex-col justify-between py-2">
                  <div>
                    <div className="h-4 w-28 rounded-full bg-slate-100" />
                    <div className="mt-4 h-6 w-[88%] rounded-full bg-slate-100" />
                    <div className="mt-3 h-4 w-[72%] rounded-full bg-slate-100" />
                    <div className="mt-3 h-4 w-[54%] rounded-full bg-slate-100" />
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="h-8 w-24 rounded-full bg-slate-100" />
                    <div className="h-9 w-28 rounded-xl bg-slate-100" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-rose-700">Unable to load articles</p>
              <h2 className="mt-2 text-2xl font-extrabold text-slate-950">We hit a problem fetching your submissions.</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{error}</p>
            </div>
            <button
              type="button"
              onClick={() => void loadArticles()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-800"
            >
              <RefreshCcw size={16} /> Try Again
            </button>
          </div>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FileText size={28} />
          </div>
          <h2 className="mt-5 text-2xl font-extrabold text-slate-950">
            {articles.length === 0 ? "No articles found" : "No matching articles"}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            {articles.length === 0
              ? "You have not created any articles yet. Start a submission to see it listed here."
              : "Try clearing the search or changing the status filter to view more of your articles."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => onSectionChange("submit")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
            >
              <Plus size={17} /> Submit Article
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("All");
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition-colors hover:border-primary hover:text-primary"
            >
              <X size={17} /> Clear Filters
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredArticles.map((article) => {
            const statusClass = statusTone[article.status] ?? "bg-slate-100 text-slate-700";

            return (
              <article
                key={article.articleId}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-primary/40"
              >
                <div className="grid gap-0">
                  <div className="relative h-44 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900">
                    {article.thumbnailUrl ? (
                      <img
                        src={article.thumbnailUrl}
                        alt={article.title}
                        className="h-full w-full object-cover opacity-90"
                      />
                    ) : (
                      <div className="flex h-full w-full items-end justify-between p-4 text-white">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/70">
                            {article.articleType}
                          </p>
                          <h3 className="mt-2 text-2xl font-extrabold leading-tight">{getThumbnailLabel(article.title)}</h3>
                        </div>
                        <div className="rounded-2xl border border-white/15 bg-white/10 px-3 py-2 text-right text-xs font-bold uppercase tracking-widest text-white/85 backdrop-blur-sm">
                          {article.status}
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/70 to-transparent" />
                  </div>

                  <div className="space-y-4 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                          {article.subjectArea}
                        </span>
                        <h2 className="mt-3 max-h-14 overflow-hidden text-xl font-extrabold leading-tight text-slate-950">
                          {article.title}
                        </h2>
                      </div>
                    </div>

                    <p className="max-h-24 overflow-hidden text-sm leading-6 text-slate-600">{article.abstract}</p>

                    <div className="space-y-2 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <UserRound size={15} className="text-primary" />
                        <span className="font-semibold text-slate-800">{article.authorName}</span>
                      </div>
                      {article.authorInstitution && (
                        <div className="flex items-center gap-2">
                          <BookCopy size={15} className="text-primary" />
                          <span>{article.authorInstitution}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <CalendarDays size={15} className="text-primary" />
                        <span>Submitted {formatBackendDate(article.submittedAt)}</span>
                      </div>
                    </div>

                    {article.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {article.keywords.slice(0, 3).map((keyword) => (
                          <span key={keyword} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold ${statusClass}`}>
                        {article.status}
                      </span>
                      <button
                        type="button"
                        onClick={() => navigate(`/user/my-submissions/${article.articleId}/details`)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:border-primary hover:text-primary"
                      >
                        View details <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default MySubmissionsPage;
