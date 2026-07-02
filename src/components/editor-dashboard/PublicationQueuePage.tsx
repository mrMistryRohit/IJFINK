import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import type { EditorDashboardSection, Manuscript } from "./types";

type PublicationQueuePageProps = {
  manuscripts: Manuscript[];
  onSelectManuscript: (paperId: string) => void;
  onMoveToReview: (paperId: string) => void;
  onSectionChange: (section: EditorDashboardSection) => void;
};

const searchFields = ["Paper ID", "Title", "Author"] as const;
type SearchField = (typeof searchFields)[number];

const PublicationQueuePage = ({
  manuscripts,
  onSelectManuscript,
  onMoveToReview,
  onSectionChange,
}: PublicationQueuePageProps) => {
  const [searchField, setSearchField] = useState<SearchField>("Paper ID");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const typeOptions = useMemo(() => ["All Types", ...Array.from(new Set(manuscripts.map((paper) => paper.category)))], [manuscripts]);
  const statusOptions = useMemo(() => ["All Status", ...Array.from(new Set(manuscripts.map((paper) => paper.status)))], [manuscripts]);

  const filteredManuscripts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return manuscripts.filter((paper) => {
      const searchableValue =
        searchField === "Paper ID" ? paper.id : searchField === "Title" ? paper.title : paper.author;
      const matchesSearch = !normalizedQuery || searchableValue.toLowerCase().includes(normalizedQuery);
      const matchesType = typeFilter === "All Types" || paper.category === typeFilter;
      const matchesStatus = statusFilter === "All Status" || paper.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [manuscripts, searchField, searchQuery, statusFilter, typeFilter]);

  const openEdits = (paperId: string) => {
    onSelectManuscript(paperId);
    onSectionChange("edits");
  };

  const searchPlaceholder = `Search by ${searchField.toLowerCase()}...`;

  return (
    <section>
      <div className="mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Publication Queue</span>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-950">User Submissions</h2>
          <p className="mt-1 text-sm text-slate-500">Papers sent by users for publication are shown here for editorial handling.</p>
        </div>
      </div>

      <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-[minmax(260px,1fr)_180px_180px_180px]">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={searchPlaceholder}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="relative">
            <select
              value={searchField}
              onChange={(event) => setSearchField(event.target.value as SearchField)}
              className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-950 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              {searchFields.map((field) => (
                <option key={field}>{field}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          </div>

          <div className="relative">
            <select
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value)}
              className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-950 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              {typeOptions.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-950 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              {statusOptions.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-4">Paper ID</th>
                <th className="px-5 py-4">Title</th>
                <th className="px-5 py-4">Author</th>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4">Submitted</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredManuscripts.map((paper) => (
                <tr key={paper.id} className="hover:bg-slate-50/70">
                  <td className="px-5 py-4 font-bold text-slate-900">{paper.id}</td>
                  <td className="max-w-[300px] px-5 py-4 font-medium text-slate-800">{paper.title}</td>
                  <td className="px-5 py-4 text-slate-500">{paper.author}</td>
                  <td className="px-5 py-4 text-slate-500">{paper.category}</td>
                  <td className="px-5 py-4 text-slate-500">{paper.submitted}</td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary whitespace-nowrap">
                      {paper.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEdits(paper.id)}
                        className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-primary hover:text-primary"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => openEdits(paper.id)}
                        className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-primary hover:text-primary"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onMoveToReview(paper.id)}
                        className="rounded-xl bg-slate-950 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-slate-800"
                      >
                        Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredManuscripts.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-sm font-medium text-slate-500">
                    No papers match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PublicationQueuePage;
