import { useState } from "react";
import { Eye, FileText, MessageSquareText, Upload, X } from "lucide-react";
import type { Publication } from "./types";

type PublicationsTableProps = {
  publications: Publication[];
};

const statusTone: Record<Publication["status"], string> = {
  Submitted: "bg-blue-50 text-blue-700",
  "Editorial Check": "bg-amber-50 text-amber-700",
  "Edits Requested": "bg-rose-50 text-rose-700",
  "Reviewer Update": "bg-purple-50 text-purple-700",
  Accepted: "bg-emerald-50 text-emerald-700",
  Published: "bg-slate-900 text-white",
};

const PublicationsTable = ({ publications }: PublicationsTableProps) => {
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">My Publications</span>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Publication Table</h1>
          <p className="mt-1 text-sm text-slate-500">Submitted documents, editorial status and latest updates.</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
        >
          <Upload size={17} /> New Publication
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-4">Publication ID</th>
                <th className="px-5 py-4">Title</th>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4">Submitted</th>
                <th className="px-5 py-4">Editor</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {publications.map((publication) => (
                <tr key={publication.id} className="hover:bg-slate-50/70">
                  <td className="px-5 py-4 font-bold text-slate-950">{publication.id}</td>
                  <td className="max-w-[330px] px-5 py-4 font-semibold text-slate-800">{publication.title}</td>
                  <td className="px-5 py-4 text-slate-500">{publication.articleType}</td>
                  <td className="px-5 py-4 text-slate-500">{publication.submitted}</td>
                  <td className="px-5 py-4 text-slate-500">{publication.editor}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusTone[publication.status]}`}>
                      {publication.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedPublication(publication)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-primary hover:text-primary"
                    >
                      <Eye size={15} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FileText size={20} />
          </div>
          <div>
            <h2 className="font-extrabold text-slate-950">Status Updates</h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-500">
              Editor and reviewer updates will appear in notifications and reflect in this table.
            </p>
          </div>
        </div>
      </div>

      {selectedPublication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-6 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-slate-100 p-6 shadow-2xl md:p-8">
            <button
              type="button"
              onClick={() => setSelectedPublication(null)}
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-500 transition-colors hover:text-primary"
              aria-label="Close publication details"
            >
              <X size={22} />
            </button>

            <div className="pr-14">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Publication Details</span>
              <h2 className="mt-3 text-2xl font-extrabold text-slate-950">{selectedPublication.title}</h2>
              <p className="mt-1 text-sm font-medium text-slate-500">
                {selectedPublication.id} - {selectedPublication.submitted}
              </p>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {[
                { label: "Publication ID", value: selectedPublication.id },
                { label: "Article Type", value: selectedPublication.articleType },
                { label: "Submitted", value: selectedPublication.submitted },
                { label: "Editor", value: selectedPublication.editor },
                { label: "Status", value: selectedPublication.status },
                { label: "Current Stage", value: selectedPublication.status },
              ].map((detail) => (
                <div key={detail.label} className="rounded-2xl bg-white p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{detail.label}</p>
                  <p className="mt-2 font-extrabold text-slate-800">{detail.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-white p-5">
              <div className="mb-4 flex items-center gap-2">
                <MessageSquareText size={20} className="text-primary" />
                <h3 className="text-lg font-extrabold text-slate-950">Latest Update</h3>
              </div>
              <p className="leading-relaxed text-slate-600">{selectedPublication.lastUpdate}</p>
            </div>

            <div className="mt-7 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedPublication(null)}
                className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PublicationsTable;

