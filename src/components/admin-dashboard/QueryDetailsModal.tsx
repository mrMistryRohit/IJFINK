import { MessageSquareText, X } from "lucide-react";
import type { ContactQuery } from "./types";

type QueryDetailsModalProps = {
  query: ContactQuery;
  onClose: () => void;
};

const QueryDetailsModal = ({ query, onClose }: QueryDetailsModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-md">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/45 bg-white/85 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-xl md:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Query Details</span>
            <h3 className="mt-2 text-2xl font-extrabold text-slate-950">{query.subject}</h3>
            <p className="mt-1 text-sm text-slate-500">
              {query.id} - {query.date}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-500 transition-colors hover:border-primary hover:text-primary"
            aria-label="Close query details popup"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            { label: "First Name", value: query.firstName },
            { label: "Last Name", value: query.lastName },
            { label: "Email Address", value: query.email },
            { label: "Institution / Affiliation", value: query.institution },
            { label: "Subject", value: query.subject },
            { label: "Status", value: query.status },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-100 bg-white/80 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{item.label}</p>
              <p className="mt-1 font-bold text-slate-800">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border border-slate-100 bg-white/80 p-4">
          <div className="mb-3 flex items-center gap-2">
            <MessageSquareText size={18} className="text-primary" />
            <p className="font-extrabold text-slate-950">Message</p>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">{query.message}</p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QueryDetailsModal;
