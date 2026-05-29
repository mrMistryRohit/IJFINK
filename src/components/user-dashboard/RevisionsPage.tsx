import { useState } from "react";
import { FileText, MessageSquareText, Send, Upload } from "lucide-react";
import type { RevisionRequest } from "./types";

type RevisionsPageProps = {
  revisions: RevisionRequest[];
};

const sectionTextClass =
  "w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";

const RevisionsPage = ({ revisions }: RevisionsPageProps) => {
  const [selectedRevision, setSelectedRevision] = useState(revisions[0]);
  const [activeSection, setActiveSection] = useState(selectedRevision?.comments[0]?.section ?? "");

  if (!selectedRevision) {
    return (
      <section>
        <span className="text-xs font-bold uppercase tracking-widest text-primary">Revisions</span>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Revision Requests</h1>
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
          No revision requests are pending.
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">Revisions</span>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Revision Requests</h1>
        <p className="mt-1 text-sm text-slate-500">Address reviewer comments and upload revised documents.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.34fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="px-1 font-extrabold text-slate-950">Documents</h2>
          <div className="mt-4 space-y-2">
            {revisions.map((revision) => (
              <button
                key={revision.id}
                type="button"
                onClick={() => {
                  setSelectedRevision(revision);
                  setActiveSection(revision.comments[0]?.section ?? "");
                }}
                className={`w-full rounded-xl p-4 text-left transition-colors ${
                  revision.id === selectedRevision.id ? "bg-primary/10 text-primary" : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <p className="text-xs font-bold uppercase tracking-wider">{revision.id}</p>
                <p className="mt-2 text-sm font-extrabold">{revision.manuscript}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {selectedRevision.id} - {selectedRevision.journal}
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-slate-950">{selectedRevision.manuscript}</h2>
              </div>
              <span className="w-fit rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                Revision Requested
              </span>
            </div>
          </div>

          <div className="grid gap-5 p-5 xl:grid-cols-[0.9fr_1fr]">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <MessageSquareText size={18} className="text-primary" />
                <h3 className="font-extrabold text-slate-950">Reviewer Comments</h3>
              </div>
              <div className="space-y-3">
                {selectedRevision.comments.map((comment) => (
                  <button
                    key={comment.id}
                    type="button"
                    onClick={() => setActiveSection(comment.section)}
                    className={`w-full rounded-xl border p-4 text-left transition-colors ${
                      activeSection === comment.section
                        ? "border-primary bg-primary/5"
                        : "border-slate-100 bg-slate-50 hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-extrabold text-slate-950">{comment.reviewer}</p>
                      <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                        {comment.severity}
                      </span>
                    </div>
                    <p className="mt-2 text-xs font-bold uppercase tracking-wider text-primary">{comment.section}</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{comment.comment}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center gap-2">
                <FileText size={18} className="text-primary" />
                <h3 className="font-extrabold text-slate-950">Edit {activeSection || "Revision"}</h3>
              </div>
              <textarea
                rows={8}
                className={sectionTextClass}
                defaultValue={`Updated ${activeSection.toLowerCase()} content addressing reviewer feedback.`}
              />

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {["Revised manuscript", "Highlighted version"].map((label) => (
                  <label
                    key={label}
                    className="flex min-h-[110px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center hover:border-primary hover:bg-primary/5"
                  >
                    <Upload size={22} className="text-primary" />
                    <span className="mt-2 text-sm font-bold text-slate-700">{label}</span>
                    <span className="mt-1 text-xs text-slate-400">PDF / DOCX</span>
                    <input type="file" className="hidden" />
                  </label>
                ))}
              </div>

              <label className="mt-4 block">
                <span className="mb-2 block text-sm font-bold text-slate-700">Response letter</span>
                <textarea rows={5} className={sectionTextClass} defaultValue={selectedRevision.responseLetter} />
              </label>

              <div className="mt-5 flex justify-end">
                <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-primary/90">
                  <Send size={17} /> Resubmit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevisionsPage;
