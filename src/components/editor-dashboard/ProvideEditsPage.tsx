import { Eye, Send, UserRound } from "lucide-react";
import type { Manuscript } from "./types";

type ProvideEditsPageProps = {
  manuscripts: Manuscript[];
  selectedManuscript: Manuscript;
  editText: string;
  onEditTextChange: (editText: string) => void;
  onSelectManuscript: (paperId: string) => void;
  onSendEdits: () => void;
};

const ProvideEditsPage = ({
  manuscripts,
  selectedManuscript,
  editText,
  onEditTextChange,
  onSelectManuscript,
  onSendEdits,
}: ProvideEditsPageProps) => {
  return (
    <section>
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">Editor Edits</span>
        <h2 className="mt-2 text-3xl font-extrabold text-slate-950">Send Changes to Author</h2>
        <p className="mt-1 text-sm text-slate-500">
          This UI shows how editorial edits will appear to the user after they submit for publication.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.82fr_1.18fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-extrabold text-slate-950">Select Manuscript</h3>
          <div className="mt-4 space-y-3">
            {manuscripts.map((paper) => (
              <button
                key={paper.id}
                type="button"
                onClick={() => onSelectManuscript(paper.id)}
                className={`block w-full rounded-xl border p-4 text-left transition-colors ${
                  selectedManuscript.id === paper.id ? "border-primary bg-primary/5" : "border-slate-100 bg-slate-50 hover:border-primary/30"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-slate-950">{paper.id}</p>
                    <p className="mt-1 text-sm text-slate-500">{paper.author}</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600">{paper.priority}</span>
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-800">{paper.title}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">{selectedManuscript.id}</span>
                <h3 className="mt-2 text-xl font-extrabold text-slate-950">{selectedManuscript.title}</h3>
                <p className="mt-1 text-sm text-slate-500">
                  {selectedManuscript.author} - {selectedManuscript.email}
                </p>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                {selectedManuscript.status}
              </span>
            </div>
            <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
              {selectedManuscript.summary}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <label className="text-sm font-bold text-slate-700">Editorial edit request</label>
            <textarea
              value={editText}
              onChange={(event) => onEditTextChange(event.target.value)}
              rows={5}
              placeholder="Write edits for the author..."
              className="mt-3 w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-900 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs font-medium text-slate-400">Sending edits marks the manuscript as Edits Requested.</p>
              <button
                type="button"
                onClick={onSendEdits}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
              >
                <Send size={17} /> Send Edits to User
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Eye size={18} className="text-emerald-700" />
              <h3 className="font-extrabold text-emerald-950">User View Preview</h3>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-white p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <UserRound size={18} />
                </div>
                <div>
                  <p className="font-bold text-slate-950">Author dashboard notification</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {selectedManuscript.editNotes.length > 0
                      ? "Editorial changes requested. Please revise and resubmit your manuscript."
                      : "No editorial edits have been sent to this author yet."}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {selectedManuscript.editNotes.length > 0 ? (
                  selectedManuscript.editNotes.map((note) => (
                    <div key={note} className="rounded-xl bg-slate-50 p-3 text-sm leading-relaxed text-slate-600">
                      {note}
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-400">
                    Sent edit requests will appear here for the user.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProvideEditsPage;

