import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, Download, FileText, Search, UserRound } from "lucide-react";
import { getAdminArticleFile, type AdminArticle, type ArticleFile, type ScreeningArticle } from "@/lib/adminApi";
import { formatApiDate, getApiDateTimestamp } from "@/lib/dateUtils";
import { toast } from "@/hooks/use-toast";

type Props = {
  articles: AdminArticle[];
  detail: ScreeningArticle | null;
  isLoading: boolean;
  detailLoading: boolean;
  error: string;
  onOpen: (id: number) => void;
  onClose: () => void;
  onRetry: () => void;
};
type SortField = "article_id" | "title" | "author_name" | "status" | "submitted_at";

const AllPapersPage = ({ articles, detail, isLoading, detailLoading, error, onOpen, onClose, onRetry }: Props) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortField>("submitted_at");
  const [direction, setDirection] = useState<"asc" | "desc">("desc");
  const [downloadingFileId, setDownloadingFileId] = useState<number | null>(null);

  const downloadFile = async (articleId: number, file: ArticleFile) => {
    setDownloadingFileId(file.file_id);
    try {
      const blob = await getAdminArticleFile(articleId, file.file_id);
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = file.file_name;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60000);
    } catch (downloadError) {
      toast({
        title: "Download failed",
        description: downloadError instanceof Error ? downloadError.message : "The file could not be downloaded.",
        variant: "destructive",
      });
    } finally {
      setDownloadingFileId(null);
    }
  };

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    const filtered = term
      ? articles.filter((article) =>
          [article.title, article.author_name, article.author_email, article.status, article.subject_area, String(article.article_id)]
            .some((value) => value?.toLowerCase().includes(term))
        )
      : articles;
    return [...filtered].sort((left, right) => {
      const result = sort === "submitted_at"
        ? getApiDateTimestamp(left.submitted_at) - getApiDateTimestamp(right.submitted_at)
        : String(left[sort] ?? "").localeCompare(String(right[sort] ?? ""), undefined, { numeric: true, sensitivity: "base" });
      return direction === "asc" ? result : -result;
    });
  }, [articles, direction, search, sort]);

  const changeSort = (field: SortField) => {
    if (field === sort) setDirection((value) => value === "asc" ? "desc" : "asc");
    else { setSort(field); setDirection("asc"); }
  };

  const columns: Array<[SortField, string]> = [
    ["article_id", "Paper ID"],
    ["title", "Title"],
    ["author_name", "Author"],
    ["status", "Status"],
    ["submitted_at", "Submitted"],
  ];

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold text-slate-950">All Papers</h2>
        <p className="mt-1 text-sm text-slate-500">Track every submitted article and its current workflow status.</p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search papers, authors or status..." className="h-11 w-full rounded-xl border border-slate-200 pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                {columns.map(([field, label]) => {
                  const Icon = sort === field ? (direction === "asc" ? ArrowUp : ArrowDown) : ArrowUpDown;
                  return <th key={field} className="px-5 py-4"><button type="button" onClick={() => changeSort(field)} className={`inline-flex items-center gap-2 font-bold hover:text-primary ${sort === field ? "text-primary" : ""}`}>{label}<Icon size={14} /></button></th>;
                })}
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(isLoading || error || !visible.length) && (
                <tr><td colSpan={6} className={`px-5 py-10 text-center ${error ? "text-rose-600" : "text-slate-500"}`}>
                  {isLoading ? "Loading papers..." : error ? <><p>{error}</p><button type="button" onClick={onRetry} className="mt-3 rounded-xl border px-4 py-2 text-xs font-bold">Try Again</button></> : "No papers found."}
                </td></tr>
              )}
              {visible.map((article) => (
                <tr key={article.article_id} className="hover:bg-slate-50/70">
                  <td className="px-5 py-4 font-mono font-bold">#{article.article_id}</td>
                  <td className="max-w-sm px-5 py-4 font-bold text-slate-900">{article.title}</td>
                  <td className="px-5 py-4 text-slate-600">{article.author_name || "Not returned"}</td>
                  <td className="px-5 py-4"><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">{article.status}</span></td>
                  <td className="px-5 py-4 text-slate-500">{formatApiDate(article.submitted_at)}</td>
                  <td className="px-5 py-4 text-right"><button type="button" onClick={() => onOpen(article.article_id)} className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold hover:border-primary hover:text-primary">More Details</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {(detail || detailLoading) && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm md:items-center md:p-6" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl md:rounded-3xl md:p-8">
            {detailLoading ? <p className="py-16 text-center text-sm text-slate-500">Loading article details...</p> : detail && <>
              <div className="flex items-start justify-between gap-4">
                <div><p className="text-xs font-bold uppercase tracking-widest text-primary">Paper #{detail.article_id}</p><h3 className="mt-2 text-2xl font-extrabold text-slate-950">{detail.title}</h3></div>
                <button type="button" onClick={onClose} className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-bold">Close</button>
              </div>
              <p className="mt-5 text-sm leading-7 text-slate-600">{detail.abstract || "No abstract supplied."}</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 font-bold text-slate-900"><UserRound size={17} /> Assigned editor</div>
                  <p className="mt-2 text-sm text-slate-500">{detail.assigned_editor ? `${detail.assigned_editor.first_name} ${detail.assigned_editor.last_name} (${detail.assigned_editor.email})` : "Not returned by the current admin article API."}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 font-bold text-slate-900"><FileText size={17} /> Article files</div>
                  <div className="mt-2 space-y-2">{detail.files?.length ? detail.files.map((file) => (
                    <div key={file.file_id} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-2.5">
                      <div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-700">{file.file_name}</p><p className="text-xs text-slate-400">{file.file_type}</p></div>
                      <button type="button" disabled={downloadingFileId !== null} onClick={() => void downloadFile(detail.article_id, file)} className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-bold text-primary hover:bg-primary/10 disabled:opacity-50">
                        <Download size={14} /> {downloadingFileId === file.file_id ? "Saving..." : "Download"}
                      </button>
                    </div>
                  )) : <p className="text-sm text-slate-500">No files returned for this status.</p>}</div>
                </div>
              </div>
            </>}
          </div>
        </div>
      )}
    </section>
  );
};

export default AllPapersPage;
