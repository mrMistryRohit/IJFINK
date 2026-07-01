import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  Eye,
  FileText,
  GitCompareArrows,
  Pencil,
  Replace,
  Send,
  XCircle,
} from "lucide-react";
import type { AssignedPaper, AssignedPaperStatus } from "./types";

type AssignedPapersPageProps = {
  papers: AssignedPaper[];
  selectedPaperId?: string | null;
  onOpenPaper: (paperId: string) => void;
  onBackToList: () => void;
};

const statusTone: Record<AssignedPaperStatus, string> = {
  "Reviewer Assigned": "border-blue-200 bg-blue-50 text-blue-700",
  "Under Review": "border-violet-200 bg-violet-50 text-violet-700",
  Revision: "border-amber-200 bg-amber-50 text-amber-700",
};

const timelineSteps = [
  "Submitted",
  "Editor Screening",
  "Reviewer Assigned",
  "Review In Progress",
  "Revision",
  "Accepted",
  "Production",
  "Published",
];

const detailTabs = ["File Center", "Screening", "Decision"] as const;
type DetailTab = (typeof detailTabs)[number];

const screeningChecks = [
  { label: "Scope Match", complete: true },
  { label: "Formatting Check", complete: true },
  { label: "Ethical Compliance", complete: true },
  { label: "Plagiarism Check", complete: true },
  { label: "Language Quality", complete: false },
  { label: "References Complete", complete: false },
];

const getCurrentTimelineStep = (status: AssignedPaperStatus) => {
  if (status === "Reviewer Assigned") return 3;
  if (status === "Under Review") return 4;
  return 5;
};

const AssignedPaperDetail = ({ paper, onBackToList }: { paper: AssignedPaper; onBackToList: () => void }) => {
  const [activeTab, setActiveTab] = useState<DetailTab>("File Center");
  const currentStep = getCurrentTimelineStep(paper.status);

  return (
    <section>
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBackToList}
          className="inline-flex w-fit items-center gap-3 text-sm font-bold text-slate-950 transition-colors hover:text-primary"
        >
          <ArrowLeft size={18} />
          Back to assigned papers
        </button>
        <span className={`inline-flex w-fit whitespace-nowrap rounded-full border px-3 py-1 text-xs font-bold ${statusTone[paper.status]}`}>
          {paper.status}
        </span>
      </div>

      <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
        <p className="font-mono text-xs font-bold text-slate-600">
          {paper.id} <span className="mx-2 text-slate-300">·</span> {paper.journal}
        </p>
        <h2 className="mt-4 max-w-5xl text-2xl font-extrabold leading-tight text-slate-950 md:text-3xl">{paper.title}</h2>
        <p className="mt-4 max-w-5xl text-sm leading-relaxed text-slate-600 md:text-base">{paper.summary}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {paper.tags.map((tag) => (
            <span key={tag} className="rounded-md bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          <div className="rounded-xl border border-slate-200 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Authors</p>
            <p className="mt-2 text-sm text-slate-600">
              <span className="font-extrabold text-slate-950">{paper.author}</span>
              <span className="mx-1">·</span>
              {paper.affiliation}
              <span className="mx-1">·</span>
              ORCID {paper.orcid}
            </p>
          </div>

          <div className="grid gap-4 rounded-xl border border-slate-200 p-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500">Submission Date</p>
              <p className="text-sm font-extrabold text-slate-950">{paper.submitted}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Research Area</p>
              <p className="text-sm font-extrabold text-slate-950">{paper.researchArea}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Similarity</p>
              <p className="text-sm font-extrabold text-slate-950">{paper.similarity}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Corresponding</p>
              <p className="text-sm font-extrabold text-slate-950">{paper.corresponding}</p>
            </div>
          </div>
        </div>
      </article>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-extrabold text-slate-950">Submission Timeline</h3>
        <div className="mt-7 flex items-center justify-between gap-1 overflow-hidden">
          {timelineSteps.map((step, index) => {
            const stepNumber = index + 1;
            const isComplete = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;

            return (
              <div key={step} className="flex min-w-fit items-center gap-2">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${
                    isCurrent
                      ? "bg-primary text-white"
                      : isComplete
                        ? "bg-primary/15 text-primary"
                        : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {stepNumber}
                </span>
                <span className={`whitespace-nowrap text-xs font-bold ${isCurrent ? "text-slate-950" : isComplete ? "text-slate-700" : "text-slate-400"}`}>
                  {step}
                </span>
                {stepNumber < timelineSteps.length && <span className="h-px w-3 shrink-0 bg-slate-200 xl:w-5" aria-hidden="true" />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5">
        <div className="inline-flex rounded-2xl bg-slate-200/70 p-1">
          {detailTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-xl px-4 py-2 text-sm font-bold ${
                activeTab === tab ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-950"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "File Center" && (
          <div className="mt-3 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FileText size={20} />
              </span>
              <div>
                <p className="font-extrabold text-slate-950">{paper.fileName}</p>
                <p className="text-xs font-medium text-slate-500">
                  {paper.fileType} · {paper.fileSize}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: "Preview", icon: Eye },
                { label: "Download", icon: Download },
                { label: "Replace", icon: Replace },
                { label: "Compare", icon: GitCompareArrows },
              ].map((action) => (
                <button
                  key={action.label}
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-950 transition-colors hover:bg-slate-100 hover:text-primary"
                >
                  <action.icon size={16} />
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Screening" && (
          <div className="mt-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-extrabold text-slate-950">Editorial Screening Checklist</h3>
              <div className="mt-7 space-y-2.5">
                {screeningChecks.map((check) => (
                  <div key={check.label} className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-3">
                    {check.complete ? (
                      <CheckCircle2 size={19} className="shrink-0 fill-blue-600 text-white" />
                    ) : (
                      <span className="h-[19px] w-[19px] shrink-0 rounded-full border border-blue-600" />
                    )}
                    <span className="text-sm font-medium text-slate-950">{check.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-sm transition-colors hover:border-primary hover:text-primary"
              >
                <Pencil size={17} />
                Request Corrections
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-sm transition-colors hover:border-rose-300 hover:text-rose-600"
              >
                <XCircle size={17} />
                Desk Reject
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-sm shadow-primary/20 transition-colors hover:bg-primary/90"
              >
                Proceed To Review
              </button>
            </div>
          </div>
        )}

        {activeTab === "Decision" && (
          <div className="mt-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-extrabold text-slate-950">Review progress</h3>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-primary/20">
                <div className="h-full w-[29%] rounded-full bg-primary" />
              </div>
              <p className="mt-4 text-sm font-medium text-slate-500">2 of 7 stages complete</p>
            </div>

            <div className="mt-5 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-sm transition-colors hover:border-rose-300 hover:text-rose-600"
              >
                <XCircle size={17} />
                Reject
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-sm transition-colors hover:border-primary hover:text-primary"
              >
                Request Revision
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-sm shadow-primary/20 transition-colors hover:bg-primary/90"
              >
                <CheckCircle2 size={17} />
                Accept
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-sm transition-colors hover:border-primary hover:text-primary"
              >
                <Send size={17} />
                Open Decision Center
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const AssignedPapersPage = ({ papers, selectedPaperId, onOpenPaper, onBackToList }: AssignedPapersPageProps) => {
  const selectedPaper = papers.find((paper) => paper.id === selectedPaperId);

  if (selectedPaper) {
    return <AssignedPaperDetail paper={selectedPaper} onBackToList={onBackToList} />;
  }

  return (
    <section>
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">Assigned Papers</span>
        <h2 className="mt-2 text-3xl font-extrabold text-slate-950">Assigned Papers</h2>
        <p className="mt-1 text-sm text-slate-500">Manuscripts currently assigned to you in the editorial pipeline.</p>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {papers.map((paper) => (
          <article
            key={paper.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-primary/30 hover:shadow-md"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <p className="font-mono text-xs font-bold text-slate-600">
                {paper.id} <span className="mx-2 text-slate-300">·</span> {paper.journal}
              </p>
              <span
                className={`inline-flex w-fit shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-xs font-bold ${
                  statusTone[paper.status]
                }`}
              >
                {paper.status}
              </span>
            </div>

            <h3 className="mt-3 text-lg font-extrabold leading-snug text-slate-950">{paper.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-500 md:text-base">{paper.summary}</p>

            <div className="mt-5 flex flex-col gap-2 text-sm font-medium text-slate-600 sm:flex-row sm:items-center sm:justify-between">
              <p>
                {paper.author} +{paper.coAuthors}
              </p>
              <p>Submitted {paper.submitted}</p>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenPaper(paper.id)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-950 shadow-sm transition-colors hover:border-primary hover:text-primary"
              >
                Open
              </button>
              <button type="button" className="px-2 py-2 text-xs font-bold text-slate-950 transition-colors hover:text-primary">
                Reviews
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AssignedPapersPage;
