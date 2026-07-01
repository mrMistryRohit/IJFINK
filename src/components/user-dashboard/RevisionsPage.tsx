import { useState } from "react";
import { ArrowLeft, FileText, MessageSquareText, Send, Upload, X } from "lucide-react";
import type { RevisionComment, RevisionRequest } from "./types";

type RevisionsPageProps = {
  revisions: RevisionRequest[];
};

const sectionTextClass =
  "w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";
const commentPreviewLimit = 120;

const getCommentPreview = (comment: string) =>
  comment.length > commentPreviewLimit ? `${comment.slice(0, commentPreviewLimit).trim()}...` : comment;

const RevisionsPage = ({ revisions }: RevisionsPageProps) => {
  const [selectedRevision, setSelectedRevision] = useState<RevisionRequest | null>(null);
  const [activeSection, setActiveSection] = useState("");
  const [expandedComment, setExpandedComment] = useState<RevisionComment | null>(null);

  if (revisions.length === 0) {
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

  if (!selectedRevision) {
    return (
      <section>
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Revisions</span>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Revision Requests</h1>
          <p className="mt-1 text-sm text-slate-500">Select a revision requested document to view reviewer comments and resubmit files.</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-extrabold text-slate-950">Revision Requested Documents</h2>
              <p className="mt-1 text-sm text-slate-500">Documents that need your response before editorial processing continues.</p>
            </div>
            <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-extrabold text-primary">
              {revisions.length} pending
            </span>
          </div>

          <div className="mt-5 grid gap-4">
            {revisions.map((revision) => (
              <button
                key={revision.id}
                type="button"
                onClick={() => {
                  setSelectedRevision(revision);
                  setActiveSection(revision.comments[0]?.section ?? "");
                }}
                className="group rounded-2xl border border-slate-100 bg-slate-50 p-5 text-left transition-colors hover:border-primary hover:bg-primary/5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-wider text-primary">{revision.id}</p>
                    <h3 className="mt-2 text-lg font-extrabold text-slate-950 group-hover:text-primary">
                      {revision.manuscript}
                    </h3>
                    <p className="mt-2 text-sm text-slate-500">{revision.journal}</p>
                  </div>
                  <span className="w-fit rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                    Revision Requested
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {revision.comments.map((comment) => (
                    <span key={comment.id} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600">
                      {comment.section}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Revisions</span>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Revision Requests</h1>
          <p className="mt-1 text-sm text-slate-500">Address reviewer comments and upload revised documents.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setSelectedRevision(null);
            setActiveSection("");
          }}
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:border-primary hover:text-primary"
        >
          <ArrowLeft size={16} /> All documents
        </button>
      </div>

      <div>
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
                    onClick={() => {
                      setActiveSection(comment.section);
                      setExpandedComment(comment);
                    }}
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
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{getCommentPreview(comment.comment)}</p>
                    {comment.comment.length > commentPreviewLimit && (
                      <span className="mt-3 inline-flex text-xs font-bold text-primary">Click to read full response</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mt-4 block">
                <span className="mb-2 block text-sm font-bold text-slate-700">Response letter</span>
                <textarea rows={5} className={sectionTextClass} defaultValue={selectedRevision.responseLetter} />
              </label>

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

              {/* <label className="mt-4 block">
                <span className="mb-2 block text-sm font-bold text-slate-700">Response letter</span>
                <textarea rows={5} className={sectionTextClass} defaultValue={selectedRevision.responseLetter} />
              </label> */}

              <div className="mt-5 flex justify-end">
                <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-primary/90">
                  <Send size={17} /> Resubmit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {expandedComment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary">{expandedComment.section}</p>
                <h3 className="mt-1 text-xl font-extrabold text-slate-950">{expandedComment.reviewer}</h3>
              </div>
              <button
                type="button"
                onClick={() => setExpandedComment(null)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-colors hover:border-primary hover:text-primary"
                aria-label="Close full comment"
              >
                <X size={17} />
              </button>
            </div>
            <div className="p-5">
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                {expandedComment.severity}
              </span>
              <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-700">{expandedComment.comment}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RevisionsPage;
