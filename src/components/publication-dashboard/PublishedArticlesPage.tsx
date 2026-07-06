import { ExternalLink, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { downloadPublishedArticleFile } from "@/lib/publicationApi";
import type { PublicationRecord } from "@/lib/publicationApi";

const PublishedArticlesPage = ({ publications, isLoading, error, onRetry }: { publications: PublicationRecord[]; isLoading: boolean; error: string; onRetry: () => void }) => {
  const [query, setQuery] = useState("");
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const filtered = useMemo(() => publications.filter((item) => `${item.title} ${item.author_name} ${item.doi} ${item.organization_name}`.toLowerCase().includes(query.toLowerCase())), [publications, query]);

  const openPublishedArticle = async (item: PublicationRecord) => {
    setDownloadingId(item.article_id);
    try {
      const blob = await downloadPublishedArticleFile(item.article_id);
      const objectUrl = URL.createObjectURL(blob);
      const pdfTab = window.open(objectUrl, "_blank", "noopener,noreferrer");

      if (!pdfTab) {
        toast({ title: "Popup blocked", description: "Please allow popups to open the published PDF.", variant: "destructive" });
      }

      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60000);
      if (item.article_url) window.open(item.article_url, "_blank", "noopener,noreferrer");
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : "Unable to open the published PDF.";
      if (/forbidden|not allowed|access denied/i.test(message)) {
        toast({ title: "Access denied", description: "Your account is not allowed to download this published file.", variant: "destructive" });
      } else {
        toast({ title: "Download failed", description: message, variant: "destructive" });
      }
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <section>
      <div className="mb-6"><span className="text-xs font-bold uppercase tracking-widest text-primary">Archive</span><h1 className="mt-2 text-3xl font-extrabold text-slate-950">Published articles</h1></div>
      <div className="mb-5 flex max-w-md items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 shadow-sm"><Search size={17} className="text-slate-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search title, DOI or organization" className="h-12 w-full bg-transparent text-sm outline-none" /></div>
      {error && <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm font-semibold text-rose-700">{error}<button onClick={onRetry} className="ml-3 underline">Try again</button></div>}
      {isLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">Loading publication archive...</div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-2">
          {filtered.map((item) => (
            <article key={item.publication_id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4"><div><p className="font-mono text-xs font-bold text-primary">DOI {item.doi}</p><h2 className="mt-2 text-lg font-extrabold leading-snug text-slate-950">{item.title || `Article #${item.article_id}`}</h2></div><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Published</span></div>
              <p className="mt-3 text-sm text-slate-500">{item.author_name || "Author unavailable"} | {item.organization_name}</p>
              <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-4 text-sm sm:grid-cols-4"><div><p className="text-xs text-slate-400">Volume</p><p className="font-bold">{item.volume}</p></div><div><p className="text-xs text-slate-400">Issue</p><p className="font-bold">{item.issue}</p></div><div><p className="text-xs text-slate-400">Pages</p><p className="font-bold">{item.pages}</p></div><div><p className="text-xs text-slate-400">Date</p><p className="font-bold">{item.publication_date}</p></div></div>
              <button
                type="button"
                disabled={downloadingId === item.article_id}
                onClick={() => void openPublishedArticle(item)}
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary disabled:cursor-not-allowed disabled:opacity-60"
              >
                <ExternalLink size={15} /> {downloadingId === item.article_id ? "Opening file..." : "Download Published File"}
              </button>
            </article>
          ))}
          {filtered.length === 0 && <div className="col-span-full rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">No published articles match your search.</div>}
        </div>
      )}
    </section>
  );
};

export default PublishedArticlesPage;
