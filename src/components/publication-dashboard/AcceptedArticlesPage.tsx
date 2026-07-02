import { ArrowLeft, CheckCircle2, FileText, Loader2, RotateCcw, Search, Send, Upload, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "@/hooks/use-toast";
import {
  getPublicationArticle,
  publishArticle,
  rejectPublicationArticle,
  returnArticleToEditor,
  startPublicationReview,
  submitArticleToOrganization,
  type ArticleDetails,
  type PublicationArticle,
  type PublishArticleInput,
} from "@/lib/publicationApi";

type Props = { articles: PublicationArticle[]; isLoading: boolean; error: string; onRefresh: () => Promise<void> };

const formatDate = (value?: string) => {
  if (!value) return "Not available";
  const date = new Date(value.replace(" ", "T"));
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

const emptyPublication: PublishArticleInput = { organization_name: "", doi: "", article_url: "", volume: "", issue: "", pages: "", publication_date: "" };

const AcceptedArticlesPage = ({ articles, isLoading, error, onRefresh }: Props) => {
  const [query, setQuery] = useState("");
  const [details, setDetails] = useState<ArticleDetails | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isActing, setIsActing] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [organizationRemarks, setOrganizationRemarks] = useState("");
  const [rejectionRemarks, setRejectionRemarks] = useState("");
  const [publicationData, setPublicationData] = useState(emptyPublication);
  const [publishedFile, setPublishedFile] = useState<File | null>(null);
  const filtered = useMemo(() => articles.filter((article) => `${article.title} ${article.author_name} ${article.subject_area}`.toLowerCase().includes(query.toLowerCase())), [articles, query]);

  const openArticle = async (articleId: number) => {
    setIsLoadingDetails(true);
    try { setDetails(await getPublicationArticle(articleId)); }
    catch (err) { toast({ title: "Article unavailable", description: err instanceof Error ? err.message : "Unable to load article details.", variant: "destructive" }); }
    finally { setIsLoadingDetails(false); }
  };

  const setStatus = (status: string) => setDetails((current) => current ? { ...current, article: { ...current.article, status } } : current);
  const runAction = async (action: () => Promise<{ message?: string; data?: unknown }>, successTitle: string, nextStatus?: string) => {
    setIsActing(true);
    try {
      const response = await action();
      if (nextStatus) setStatus(nextStatus);
      toast({ title: successTitle, description: response.message });
      await onRefresh();
      return true;
    } catch (err) {
      toast({ title: "Action failed", description: err instanceof Error ? err.message : "Please try again.", variant: "destructive" });
      return false;
    } finally { setIsActing(false); }
  };

  if (details) {
    const article = details.article;
    const authorName = article.author_name || [article.author_first_name, article.author_last_name].filter(Boolean).join(" ") || String(details.author?.["display_name"] || "Author unavailable");
    const status = article.status;
    return <section>
      <button type="button" onClick={() => setDetails(null)} className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-primary"><ArrowLeft size={17} /> Back to accepted queue</button>
      <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-7"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><p className="font-mono text-xs font-bold text-primary">ARTICLE #{article.article_id}</p><h1 className="mt-3 max-w-4xl text-2xl font-extrabold leading-tight text-slate-950 md:text-3xl">{article.title}</h1></div><span className="w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{status}</span></div>{article.abstract && <p className="mt-5 max-w-5xl text-sm leading-relaxed text-slate-600">{article.abstract}</p>}<div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[{ label: "Author", value: authorName }, { label: "Article type", value: article.article_type }, { label: "Subject area", value: article.subject_area }, { label: "Submitted", value: formatDate(article.submitted_at) }].map((item) => <div key={item.label} className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">{item.label}</p><p className="mt-1 text-sm font-bold text-slate-800">{item.value || "Not available"}</p></div>)}</div></article>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.15fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="font-extrabold text-slate-950">Production files</h2><div className="mt-4 space-y-3">{details.files?.map((file, index) => <div key={file.file_id ?? index} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3"><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-primary"><FileText size={18} /></span><div className="min-w-0"><p className="truncate text-sm font-bold">{file.file_name || "Article file"}</p><p className="text-xs text-slate-500">{file.file_type || "Document"}{file.version ? ` · Version ${file.version}` : ""}</p></div></div>)}{!details.files?.length && <p className="py-6 text-center text-sm text-slate-500">No article files were returned.</p>}</div>{Boolean(details.co_authors?.length) && <><h3 className="mt-6 text-sm font-extrabold text-slate-900">Co-authors</h3><div className="mt-2 flex flex-wrap gap-2">{details.co_authors?.map((author, index) => <span key={index} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{String(author.full_name || author.email || `Co-author ${index + 1}`)}</span>)}</div></>}</article>
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="font-extrabold text-slate-950">Publication action</h2><p className="mt-1 text-sm text-slate-500">Actions are enabled according to the article’s current status.</p>
          {status === "Accepted" && <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5"><p className="text-sm font-bold text-amber-900">Ready for production review</p><p className="mt-1 text-sm text-amber-700">Start the publication review before preparing the external submission.</p><button disabled={isActing} onClick={() => runAction(() => startPublicationReview(article.article_id), "Publication review started", "Publication Review")} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white disabled:opacity-60">{isActing ? <Loader2 className="animate-spin" size={17} /> : <CheckCircle2 size={17} />} Start publication review</button></div>}
          {status === "Publication Review" && <div className="mt-5 space-y-6"><div><label className="text-sm font-bold text-slate-700">Organization name</label><input value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} placeholder="e.g. IEEE Xplore Digital Library" className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-primary" /><textarea value={organizationRemarks} onChange={(e) => setOrganizationRemarks(e.target.value)} placeholder="Optional submission notes" className="mt-3 min-h-24 w-full rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-primary" /><button disabled={isActing || !organizationName.trim()} onClick={() => runAction(() => submitArticleToOrganization(article.article_id, organizationName.trim(), organizationRemarks.trim()), "Article submitted to organization", "Submitted To Organization")} className="mt-3 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white disabled:opacity-50"><Send size={17} /> Submit to organization</button></div><div className="border-t border-slate-100 pt-5"><label className="text-sm font-bold text-slate-700">Return feedback</label><textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Explain the corrections required from the editor" className="mt-2 min-h-24 w-full rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-primary" /><button disabled={isActing || !feedback.trim()} onClick={() => runAction(() => returnArticleToEditor(article.article_id, feedback.trim()), "Article returned to editor", "Editorial Review")} className="mt-3 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-800 hover:border-primary disabled:opacity-50"><RotateCcw size={17} /> Return to editor</button></div></div>}
          {status === "Submitted To Organization" && <div className="mt-5 space-y-5"><div className="grid gap-3 sm:grid-cols-2">{(["organization_name", "doi", "article_url", "volume", "issue", "pages", "publication_date"] as const).map((field) => <div key={field} className={field === "article_url" || field === "organization_name" ? "sm:col-span-2" : ""}><label className="text-xs font-bold uppercase tracking-wider text-slate-500">{field.replaceAll("_", " ")}</label><input type={field === "publication_date" ? "date" : field === "article_url" ? "url" : "text"} value={publicationData[field]} onChange={(e) => setPublicationData((current) => ({ ...current, [field]: e.target.value }))} placeholder={field === "doi" ? "10.1234/article.001" : ""} className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-primary" /></div>)}</div><label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm font-bold text-slate-700 hover:border-primary"><Upload size={18} className="text-primary" /><span className="truncate">{publishedFile?.name || "Choose final published PDF or document"}</span><input type="file" accept=".pdf,.doc,.docx" className="sr-only" onChange={(e) => setPublishedFile(e.target.files?.[0] ?? null)} /></label><button disabled={isActing || !publishedFile || Object.values(publicationData).some((value) => !value.trim())} onClick={async () => { if (!publishedFile) return; const ok = await runAction(() => publishArticle(article.article_id, publicationData, publishedFile), "Article published", "Published"); if (ok) { setPublicationData(emptyPublication); setPublishedFile(null); } }} className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white disabled:opacity-50"><Upload size={17} /> Publish article</button><div className="border-t border-slate-100 pt-5"><label className="text-sm font-bold text-slate-700">Organization rejection reason</label><textarea value={rejectionRemarks} onChange={(e) => setRejectionRemarks(e.target.value)} placeholder="Optional reason or notes" className="mt-2 min-h-20 w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-rose-400" /><button disabled={isActing} onClick={() => runAction(() => rejectPublicationArticle(article.article_id, rejectionRemarks.trim()), "Article marked as rejected", "Rejected")} className="mt-3 inline-flex items-center gap-2 rounded-xl border border-rose-200 px-5 py-3 text-sm font-bold text-rose-600 hover:bg-rose-50 disabled:opacity-50"><XCircle size={17} /> Mark as rejected</button></div></div>}
          {!["Accepted", "Publication Review", "Submitted To Organization"].includes(status) && <div className="mt-6 rounded-xl bg-slate-50 p-6 text-center"><CheckCircle2 className="mx-auto text-primary" /><p className="mt-3 text-sm font-bold text-slate-800">This workflow is now {status.toLowerCase()}.</p><p className="mt-1 text-xs text-slate-500">No further publication actions are available for this article.</p></div>}
        </article>
      </div>
    </section>;
  }

  return <section><div className="mb-6"><span className="text-xs font-bold uppercase tracking-widest text-primary">Production intake</span><h1 className="mt-2 text-3xl font-extrabold text-slate-950">Accepted articles</h1><p className="mt-1 text-sm text-slate-500">Review manuscripts approved by the editorial team and prepare them for publication.</p></div><div className="mb-5 flex max-w-md items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 shadow-sm"><Search size={17} className="text-slate-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search title, author or subject" className="h-12 w-full bg-transparent text-sm outline-none" /></div>{error && <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm font-semibold text-rose-700">{error}<button onClick={onRefresh} className="ml-3 underline">Try again</button></div>}{isLoading ? <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-sm text-slate-500">Loading accepted articles…</div> : <div className="grid gap-5 xl:grid-cols-2">{filtered.map((article) => <article key={article.article_id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-primary/30"><div className="flex items-start justify-between gap-4"><p className="font-mono text-xs font-bold text-primary">ARTICLE #{article.article_id}</p><span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">{article.status}</span></div><h2 className="mt-3 text-lg font-extrabold leading-snug text-slate-950">{article.title}</h2><p className="mt-3 text-sm text-slate-500">{article.author_name || article.author_email || "Author unavailable"} · {article.subject_area || "General"}</p><div className="mt-5 flex items-center justify-between gap-3"><p className="text-xs font-semibold text-slate-400">Accepted {formatDate(article.updated_at)}</p><button disabled={isLoadingDetails} onClick={() => openArticle(article.article_id)} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white disabled:opacity-60">{isLoadingDetails ? <Loader2 size={15} className="animate-spin" /> : <FileText size={15} />} Open workflow</button></div></article>)}{filtered.length === 0 && <div className="col-span-full rounded-2xl border border-slate-200 bg-white p-12 text-center text-sm text-slate-500">No accepted articles match your search.</div>}</div>}</section>;
};

export default AcceptedArticlesPage;
