import { useMemo, useState } from "react";
import { Edit3, Eye, Plus, Search } from "lucide-react";
import type { SubmissionStatus, UserDashboardSection, UserSubmission } from "./types";

type MySubmissionsPageProps = {
  submissions: UserSubmission[];
  onSectionChange: (section: UserDashboardSection) => void;
};

const statusTone: Record<SubmissionStatus, string> = {
  "Under Review": "bg-blue-50 text-blue-700",
  "Revision Requested": "bg-amber-50 text-amber-700",
  Accepted: "bg-emerald-50 text-emerald-700",
  Submitted: "bg-cyan-50 text-cyan-700",
  Draft: "bg-slate-100 text-slate-600",
  Rejected: "bg-rose-50 text-rose-700",
};

const statusOptions: Array<SubmissionStatus | "All"> = [
  "All",
  "Under Review",
  "Revision Requested",
  "Accepted",
  "Submitted",
  "Draft",
  "Rejected",
];

const MySubmissionsPage = ({ submissions, onSectionChange }: MySubmissionsPageProps) => {
  const [statusFilter, setStatusFilter] = useState<(typeof statusOptions)[number]>("All");
  const [idFilter, setIdFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<UserSubmission | null>(null);

  const filteredSubmissions = useMemo(
    () =>
      submissions.filter((submission) => {
        const matchesStatus = statusFilter === "All" || submission.status === statusFilter;
        const matchesId = submission.id.toLowerCase().includes(idFilter.toLowerCase());
        const matchesName = submission.manuscript.toLowerCase().includes(nameFilter.toLowerCase());

        return matchesStatus && matchesId && matchesName;
      }),
    [idFilter, nameFilter, statusFilter, submissions]
  );

  const handleView = (submission: UserSubmission) => {
    if (submission.status === "Revision Requested") {
      onSectionChange("revisions");
      return;
    }

    setSelectedSubmission(submission);
  };

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">My Submission</span>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Submitted Papers</h1>
          <p className="mt-1 text-sm text-slate-500">Track manuscript status, revision requests and saved drafts.</p>
        </div>
        <button
          type="button"
          onClick={() => onSectionChange("submit")}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
        >
          <Plus size={17} /> Add New Submission
        </button>
      </div>

      <div className="mb-5 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[0.8fr_1fr_1fr]">
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">Status</label>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as (typeof statusOptions)[number])}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            {statusOptions.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">ID</label>
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={idFilter}
              onChange={(event) => setIdFilter(event.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="Search manuscript ID"
            />
          </div>
        </div>
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">Name</label>
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={nameFilter}
              onChange={(event) => setNameFilter(event.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="Search manuscript name"
            />
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-4">Manuscript</th>
                <th className="px-5 py-4">Journal</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSubmissions.map((submission) => {
                const canEdit = submission.status === "Draft";

                return (
                  <tr key={submission.id} className="hover:bg-slate-50/70">
                    <td className="px-5 py-4">
                      <p className="font-extrabold text-slate-950">{submission.manuscript}</p>
                      <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400">{submission.id}</p>
                    </td>
                    <td className="max-w-[300px] px-5 py-4 text-slate-500">{submission.journal}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusTone[submission.status]}`}>
                        {submission.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-500">{submission.date}</td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleView(submission)}
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-primary hover:text-primary"
                        >
                          <Eye size={15} /> View
                        </button>
                        <button
                          type="button"
                          onClick={() => canEdit && onSectionChange("submit")}
                          disabled={!canEdit}
                          className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-colors ${
                            canEdit
                              ? "bg-slate-950 text-white hover:bg-slate-800"
                              : "cursor-not-allowed bg-slate-100 text-slate-400"
                          }`}
                        >
                          <Edit3 size={15} /> Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selectedSubmission && (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Submission Details</span>
              <h2 className="mt-2 text-xl font-extrabold text-slate-950">{selectedSubmission.manuscript}</h2>
              <p className="mt-1 text-sm text-slate-500">{selectedSubmission.id} - {selectedSubmission.journal}</p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedSubmission(null)}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:border-primary hover:text-primary"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default MySubmissionsPage;
