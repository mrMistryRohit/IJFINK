import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowUp, ArrowUpDown, CheckCircle2, Download, Eye, FileText, Search, XCircle } from "lucide-react";
import { getAdminArticleFile, type AdminArticle, type ArticleFile, type ScreeningArticle } from "@/lib/adminApi";
import { formatApiDate, getApiDateTimestamp } from "@/lib/dateUtils";
import { toast } from "@/hooks/use-toast";

type Props = {
  articles: AdminArticle[];
  selectedArticle: ScreeningArticle | null;
  isLoading: boolean;
  error: string;
  isSubmitting: boolean;
  onOpen: (articleId: number) => void;
  onBack: () => void;
  onRetry: () => void;
  onDecision: (decision: "Approved" | "Rejected", remarks: string) => void;
};

type SortField = "article_id" | "title" | "author" | "submitted_at";

const getAuthorName = (article: AdminArticle) =>
  article.author_name ?? `${article.first_name ?? ""} ${article.last_name ?? ""}`.trim();

const PaperScreeningPage = ({
  articles,
  selectedArticle,
  isLoading,
  error,
  isSubmitting,
  onOpen,
  onBack,
  onRetry,
  onDecision,
}: Props) => {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("submitted_at");
  const [direction, setDirection] = useState<"asc" | "desc">("desc");
  const [remarks, setRemarks] = useState("");
  const [activeFileAction, setActiveFileAction] = useState("");

  useEffect(() => setRemarks(""), [selectedArticle?.article_id]);

  const visibleArticles = useMemo(() => {
    const term = search.trim().toLowerCase();
    const filtered = term
      ? articles.filter((article) =>
          [article.title, getAuthorName(article), article.email, article.subject_area, String(article.article_id)]
            .some((value) => value?.toLowerCase().includes(term))
        )
      : articles;

    return [...filtered].sort((leftArticle, rightArticle) => {
      const left = sortField === "author" ? getAuthorName(leftArticle) : String(leftArticle[sortField] ?? "");
      const right = sortField === "author" ? getAuthorName(rightArticle) : String(rightArticle[sortField] ?? "");
      const result = sortField === "submitted_at"
        ? getApiDateTimestamp(leftArticle.submitted_at) - getApiDateTimestamp(rightArticle.submitted_at)
        : left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" });
      return direction === "asc" ? result : -result;
    });
  }, [articles, direction, search, sortField]);

  const changeSort = (field: SortField) => {
    if (field === sortField) {
      setDirection((value) => value === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setDirection("asc");
    }
  };

  const loadFile = async (file: ArticleFile, action: "view" | "download") => {
    const actionKey = `${action}-${file.file_id}`;
    const previewWindow = action === "view" ? window.open("", "_blank", "noopener,noreferrer") : null;
    setActiveFileAction(actionKey);
    try {
      const blob = await getAdminArticleFile(selectedArticle.article_id, file.file_id);
      const objectUrl = URL.createObjectURL(blob);
      if (action === "view") {
        if (previewWindow) previewWindow.location.href = objectUrl;
        else window.open(objectUrl, "_blank", "noopener,noreferrer");
      } else {
        const link = document.createElement("a");
        link.href = objectUrl;
        link.download = file.file_name;
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60000);
    } catch (error) {
      previewWindow?.close();
      toast({
        title: action === "view" ? "Unable to open file" : "Download failed",
        description: error instanceof Error ? error.message : "The file could not be loaded.",
        variant: "destructive",
      });
    } finally {
      setActiveFileAction("");
    }
  };

  const SortButton = ({ field, children }: { field: SortField; children: string }) => {
    const Icon = sortField === field ? (direction === "asc" ? ArrowUp : ArrowDown) : ArrowUpDown;
    return (
      <button
        type="button"
        onClick={() => changeSort(field)}
        className={`inline-flex items-center gap-2 font-bold hover:text-primary ${sortField === field ? "text-primary" : ""}`}
      >
        {children}<Icon size={14} />
      </button>
    );
  };

  if (selectedArticle) {
    return (
      <section>
        <button type="button" onClick={onBack} className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-primary">
          <ArrowLeft size={17} /> Back to pending papers
        </button>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Paper #{selectedArticle.article_id}</p>
              <h2 className="mt-2 text-2xl font-extrabold text-slate-950 md:text-3xl">{selectedArticle.title}</h2>
              <p className="mt-2 text-sm text-slate-500">
                {getAuthorName(selectedArticle)} | {selectedArticle.email ?? selectedArticle.author_email}
              </p>
            </div>
            <span className="w-fit rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">{selectedArticle.status}</span>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h3 className="font-extrabold text-slate-950">Abstract</h3>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-600">{selectedArticle.abstract || "No abstract supplied."}</p>
            </div>
            <dl className="space-y-4 rounded-xl bg-slate-50 p-5 text-sm">
              <div><dt className="font-bold text-slate-400">Article type</dt><dd className="mt-1 font-bold text-slate-900">{selectedArticle.article_type}</dd></div>
              <div><dt className="font-bold text-slate-400">Subject area</dt><dd className="mt-1 font-bold text-slate-900">{selectedArticle.subject_area}</dd></div>
              <div><dt className="font-bold text-slate-400">Institution</dt><dd className="mt-1 font-bold text-slate-900">{selectedArticle.institution || "Not provided"}</dd></div>
            </dl>
          </div>

          <div className="mt-7">
            <h3 className="font-extrabold text-slate-950">Submitted files</h3>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {selectedArticle.files.length ? selectedArticle.files.map((file) => (
                <div key={file.file_id} className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
                  <span className="rounded-lg bg-blue-50 p-2 text-blue-600"><FileText size={19} /></span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-slate-900">{file.file_name}</p>
                    <p className="text-xs text-slate-500">{file.file_type} | Version {file.version}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <button type="button" onClick={() => loadFile(file, "view")} disabled={Boolean(activeFileAction)} className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-bold text-slate-600 hover:bg-primary/10 hover:text-primary disabled:opacity-50" title="View file">
                      <Eye size={15} /> {activeFileAction === `view-${file.file_id}` ? "Opening..." : "View"}
                    </button>
                    <button type="button" onClick={() => loadFile(file, "download")} disabled={Boolean(activeFileAction)} className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-bold text-slate-600 hover:bg-primary/10 hover:text-primary disabled:opacity-50" title="Download file">
                      <Download size={15} /> {activeFileAction === `download-${file.file_id}` ? "Saving..." : "Download"}
                    </button>
                  </div>
                </div>
              )) : <p className="text-sm text-slate-500">No files were returned by the API.</p>}
            </div>
          </div>

          <div className="mt-7 border-t border-slate-100 pt-6">
            <label htmlFor="screening-remarks" className="text-sm font-extrabold text-slate-900">Screening remarks</label>
            <textarea
              id="screening-remarks"
              value={remarks}
              onChange={(event) => setRemarks(event.target.value)}
              rows={4}
              placeholder="Add a clear reason, especially when rejecting a submission..."
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <div className="mt-4 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                disabled={isSubmitting || !remarks.trim()}
                onClick={() => onDecision("Rejected", remarks)}
                className="inline-flex items-center gap-2 rounded-xl border border-rose-200 px-5 py-3 text-sm font-bold text-rose-700 hover:bg-rose-50 disabled:opacity-50"
              >
                <XCircle size={17} /> Reject & Notify Author
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => onDecision("Approved", remarks)}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-primary/90 disabled:opacity-50"
              >
                <CheckCircle2 size={17} /> {isSubmitting ? "Submitting..." : "Approve & Assign Editor"}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const columns: Array<[SortField, string]> = [
    ["article_id", "Paper ID"],
    ["title", "Title"],
    ["author", "Author"],
    ["submitted_at", "Submitted"],
  ];

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold text-slate-950">Paper Screening</h2>
        <p className="mt-1 text-sm text-slate-500">Review newly submitted manuscripts before assigning them to an editor.</p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search pending papers..." className="h-11 w-full rounded-xl border border-slate-200 pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>{columns.map(([field, label]) => <th key={field} className="px-5 py-4"><SortButton field={field}>{label}</SortButton></th>)}<th className="px-5 py-4">Subject</th><th className="px-5 py-4 text-right">Action</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(isLoading || error || !visibleArticles.length) && (
                <tr><td colSpan={6} className={`px-5 py-10 text-center ${error ? "text-rose-600" : "text-slate-500"}`}>
                  {isLoading ? "Loading pending papers..." : error ? <><p>{error}</p><button type="button" onClick={onRetry} className="mt-3 rounded-xl border px-4 py-2 text-xs font-bold">Try Again</button></> : search ? "No papers match your search." : "No papers are waiting for screening."}
                </td></tr>
              )}
              {visibleArticles.map((article) => (
                <tr key={article.article_id} className="hover:bg-slate-50/70">
                  <td className="px-5 py-4 font-mono font-bold">#{article.article_id}</td>
                  <td className="max-w-xs px-5 py-4 font-bold text-slate-900">{article.title}</td>
                  <td className="px-5 py-4 text-slate-600">{getAuthorName(article)}</td>
                  <td className="px-5 py-4 text-slate-500">{formatApiDate(article.submitted_at)}</td>
                  <td className="px-5 py-4 text-slate-600">{article.subject_area}</td>
                  <td className="px-5 py-4 text-right"><button type="button" onClick={() => onOpen(article.article_id)} className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold hover:border-primary hover:text-primary">Review</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PaperScreeningPage;
