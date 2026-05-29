import { BarChart3, Download, Eye, Quote } from "lucide-react";
import type { PublishedPaper } from "./types";

type PublishedPublicationsPageProps = {
  papers: PublishedPaper[];
};

const PublishedPublicationsPage = ({ papers }: PublishedPublicationsPageProps) => {
  return (
    <section>
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">Publications</span>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Published Papers</h1>
        <p className="mt-1 text-sm text-slate-500">Only live papers with readership and citation performance.</p>
      </div>

      <div className="grid gap-5">
        {papers.map((paper) => (
          <article key={paper.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary">{paper.id}</p>
                <h2 className="mt-2 text-xl font-extrabold text-slate-950">{paper.title}</h2>
                <p className="mt-1 text-sm text-slate-500">{paper.journal} - {paper.publishedDate}</p>
              </div>
              <button className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:border-primary hover:text-primary">
                <Eye size={15} /> View Paper
              </button>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-primary">
                  <Quote size={18} />
                  <p className="text-xs font-bold uppercase tracking-wider">Cites</p>
                </div>
                <p className="mt-2 text-2xl font-extrabold text-slate-950">{paper.cites}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-primary">
                  <Download size={18} />
                  <p className="text-xs font-bold uppercase tracking-wider">Downloads</p>
                </div>
                <p className="mt-2 text-2xl font-extrabold text-slate-950">{paper.downloads}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-primary">
                  <BarChart3 size={18} />
                  <p className="text-xs font-bold uppercase tracking-wider">Views</p>
                </div>
                <p className="mt-2 text-2xl font-extrabold text-slate-950">{paper.views}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PublishedPublicationsPage;
