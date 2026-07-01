import { Download, Eye, Quote } from "lucide-react";
import type { PublishedPaper } from "./types";

type PublishedPublicationsPageProps = {
  papers: PublishedPaper[];
};

const paperDetails: Record<string, { area: string; authors: string; summary: string; doi: string; issue: string }> = {
  "IYJ-2026-109": {
    area: "Microbiology",
    authors: "Ananya Das, Rakesh Sen",
    summary:
      "A field-based analysis of soil microbial diversity across organic farming systems and its relationship with soil health indicators.",
    doi: "10.5281/iyj.2026.109",
    issue: "Vol. 15, Issue 2, pp. 118-129",
  },
  "IYJ-2026-088": {
    area: "Biomedical Sciences",
    authors: "Ananya Das, Meera Kapoor",
    summary:
      "Evaluation of plant-derived compounds with wound healing potential using phytochemical screening and antimicrobial response profiling.",
    doi: "10.5281/iyj.2026.088",
    issue: "Vol. 15, Issue 1, pp. 82-94",
  },
  "IYJ-2026-071": {
    area: "Biotechnology",
    authors: "Ananya Das, Pradeep Kumar Das",
    summary:
      "A study on nanoparticle-assisted enzyme stabilization methods for improving activity retention in applied biotechnology workflows.",
    doi: "10.5281/iyj.2026.071",
    issue: "Vol. 14, Issue 4, pp. 211-224",
  },
};

const getPublishedYear = (date: string) => {
  const parts = date.split(" ");
  return parts[parts.length - 1] ?? date;
};

const PublishedPublicationsPage = ({ papers }: PublishedPublicationsPageProps) => {
  return (
    <section>
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">Publications</span>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Publications</h1>
        <p className="mt-1 text-sm text-slate-500">Your published research across all journals.</p>
      </div>

      <div className="grid gap-5">
        {papers.map((paper) => {
          const details = paperDetails[paper.id];

          return (
            <article key={paper.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="min-w-0">
                  <span className="inline-flex w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                    {details?.area ?? "Research Article"}
                  </span>
                  <h2 className="mt-4 text-2xl font-extrabold leading-tight text-slate-950">{paper.title}</h2>
                  <p className="mt-3 text-sm font-medium text-slate-500">{details?.authors ?? "Ananya Das"}</p>
                  <p className="mt-4 max-w-4xl text-sm leading-6 text-slate-600">
                    {details?.summary ?? "Published research article with active readership and citation performance."}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-500">
                    <span>DOI: {details?.doi ?? paper.id}</span>
                    <span>{details?.issue ?? paper.journal}</span>
                    <span>{getPublishedYear(paper.publishedDate)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 lg:w-[290px]">
                  <div className="rounded-2xl bg-slate-50 p-4 text-center">
                    <Quote size={18} className="mx-auto text-primary" />
                    <p className="mt-2 text-lg font-extrabold text-slate-950">{paper.cites.toLocaleString()}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">Cites</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4 text-center">
                    <Download size={18} className="mx-auto text-primary" />
                    <p className="mt-2 text-lg font-extrabold text-slate-950">{paper.downloads.toLocaleString()}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">Downloads</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4 text-center">
                    <Eye size={18} className="mx-auto text-primary" />
                    <p className="mt-2 text-lg font-extrabold text-slate-950">{paper.views.toLocaleString()}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">Views</p>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default PublishedPublicationsPage;
