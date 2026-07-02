import { ArrowRight, BookOpenCheck, CheckCircle2, Clock3, Send } from "lucide-react";
import type { PublicationArticle, PublicationRecord } from "@/lib/publicationApi";

type Props = { accepted: PublicationArticle[]; published: PublicationRecord[]; isLoading: boolean; onOpenQueue: () => void; onOpenPublished: () => void };

const PublicationOverview = ({ accepted, published, isLoading, onOpenQueue, onOpenPublished }: Props) => {
  const thisMonth = published.filter((item) => {
    const date = new Date(`${item.publication_date}T00:00:00`);
    const now = new Date();
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }).length;
  const cards = [
    { label: "Ready for review", value: accepted.length, icon: Clock3, tone: "bg-amber-50 text-amber-600" },
    { label: "Published articles", value: published.length, icon: BookOpenCheck, tone: "bg-emerald-50 text-emerald-600" },
    { label: "Published this month", value: thisMonth, icon: CheckCircle2, tone: "bg-blue-50 text-blue-600" },
  ];
  return <section>
    <div className="mb-7"><span className="text-xs font-bold uppercase tracking-widest text-primary">Publication Team</span><h1 className="mt-2 text-3xl font-extrabold text-slate-950">Publishing dashboard</h1><p className="mt-1 text-sm text-slate-500">Move accepted manuscripts through production and maintain the published record.</p></div>
    <div className="grid gap-4 md:grid-cols-3">{cards.map((card) => <article key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.tone}`}><card.icon size={21} /></div><p className="mt-5 text-3xl font-extrabold text-slate-950">{isLoading ? "—" : card.value}</p><p className="mt-1 text-sm font-semibold text-slate-500">{card.label}</p></article>)}</div>
    <div className="mt-5 grid gap-5 lg:grid-cols-2">
      <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><div><h2 className="font-extrabold text-slate-950">Accepted queue</h2><p className="mt-1 text-sm text-slate-500">Manuscripts waiting for production review.</p></div><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><Send size={20} /></span></div><div className="mt-5 space-y-3">{accepted.slice(0, 3).map((item) => <div key={item.article_id} className="rounded-xl border border-slate-100 bg-slate-50 p-3"><p className="line-clamp-1 text-sm font-bold text-slate-900">{item.title}</p><p className="mt-1 text-xs text-slate-500">{item.author_name || item.author_email || "Author unavailable"}</p></div>)}{!isLoading && accepted.length === 0 && <p className="py-5 text-center text-sm text-slate-500">The accepted queue is clear.</p>}</div><button onClick={onOpenQueue} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">Open queue <ArrowRight size={16} /></button></article>
      <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="font-extrabold text-slate-950">Recent publications</h2><p className="mt-1 text-sm text-slate-500">Latest completed publication records.</p><div className="mt-5 space-y-3">{published.slice(0, 3).map((item) => <div key={item.publication_id} className="rounded-xl border border-slate-100 bg-slate-50 p-3"><p className="line-clamp-1 text-sm font-bold text-slate-900">{item.title || `Article #${item.article_id}`}</p><p className="mt-1 text-xs text-slate-500">{item.doi} · {item.publication_date}</p></div>)}{!isLoading && published.length === 0 && <p className="py-5 text-center text-sm text-slate-500">No publications are recorded yet.</p>}</div><button onClick={onOpenPublished} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">View archive <ArrowRight size={16} /></button></article>
    </div>
  </section>;
};
export default PublicationOverview;
