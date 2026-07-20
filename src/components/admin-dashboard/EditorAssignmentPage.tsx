import { useEffect, useState } from "react";
import { ArrowLeft, Check, UserRound } from "lucide-react";
import type { AssignableEditor, ScreeningArticle } from "@/lib/adminApi";

type Props = {
  article: ScreeningArticle | null;
  editors: AssignableEditor[];
  isLoading: boolean;
  error: string;
  isAssigning: boolean;
  onBack: () => void;
  onAssign: (editorId: number) => void;
};

const EditorAssignmentPage = ({ article, editors, isLoading, error, isAssigning, onBack, onAssign }: Props) => {
  const [selectedEditorId, setSelectedEditorId] = useState<number | null>(null);
  useEffect(() => setSelectedEditorId(null), [article?.article_id]);

  return (
    <section>
      <button type="button" onClick={onBack} className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-primary">
        <ArrowLeft size={17} /> Back to paper screening
      </button>
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Approved submission</p>
        <h2 className="mt-2 text-3xl font-extrabold text-slate-950">Assign an Editor</h2>
        <p className="mt-1 text-sm text-slate-500">Choose an active editor to begin editorial review.</p>
      </div>

      {article && (
        <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold text-slate-400">PAPER #{article.article_id}</p>
          <h3 className="mt-2 text-lg font-extrabold text-slate-950">{article.title}</h3>
          <p className="mt-1 text-sm text-slate-500">{article.subject_area} | {article.article_type}</p>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="font-extrabold text-slate-950">Available editors</h3>
        {isLoading ? (
          <p className="py-10 text-center text-sm text-slate-500">Loading editors...</p>
        ) : error ? (
          <p className="py-10 text-center text-sm text-rose-600">{error}</p>
        ) : (
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {editors.map((editor) => {
              const selected = selectedEditorId === editor.editor_id;
              return (
                <button
                  key={editor.editor_id}
                  type="button"
                  onClick={() => setSelectedEditorId(editor.editor_id)}
                  className={`flex items-center gap-4 rounded-xl border p-4 text-left transition-colors ${selected ? "border-primary bg-primary/5 ring-2 ring-primary/15" : "border-slate-200 hover:border-primary/40"}`}
                >
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${selected ? "bg-primary text-white" : "bg-slate-100 text-slate-500"}`}>
                    {selected ? <Check size={20} /> : <UserRound size={20} />}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-extrabold text-slate-950">{editor.first_name} {editor.last_name}</span>
                    <span className="block truncate text-xs text-slate-500">{editor.email}</span>
                    <span className="mt-1 block text-xs font-medium text-slate-400">{editor.institution || "Institution not provided"}</span>
                  </span>
                </button>
              );
            })}
            {!editors.length && <p className="text-sm text-slate-500">No active editors are currently available.</p>}
          </div>
        )}
        <div className="mt-6 flex justify-end">
          <button type="button" disabled={!selectedEditorId || isAssigning} onClick={() => selectedEditorId && onAssign(selectedEditorId)} className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary/90 disabled:opacity-50">
            {isAssigning ? "Assigning..." : "Confirm Assignment"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default EditorAssignmentPage;
