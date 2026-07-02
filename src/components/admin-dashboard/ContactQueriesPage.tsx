import { ArrowDown, ArrowUp, ArrowUpDown, Eye, Search } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import type { ContactQuery } from "./types";

type SortField = "date" | "queryId" | "firstName" | "lastName" | "email" | "subject" | "status";

const sortableColumns: Array<{ field: SortField; label: string }> = [
  { field: "queryId", label: "Query ID" },
  { field: "firstName", label: "First Name" },
  { field: "lastName", label: "Last Name" },
  { field: "email", label: "Email Address" },
  { field: "subject", label: "Subject" },
  { field: "status", label: "Status" },
  { field: "date", label: "Date" },
];

type ContactQueriesPageProps = {
  queries: ContactQuery[];
  isLoading: boolean;
  loadError: string;
  onRetry: () => void;
  onSelectQuery: (queryId: number) => void;
};

const ContactQueriesPage = ({ queries, isLoading, loadError, onRetry, onSelectQuery }: ContactQueriesPageProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const changeSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }

    setSortField(field);
    setSortDirection(field === "date" || field === "queryId" ? "desc" : "asc");
  };

  const visibleQueries = useMemo(() => {
    const normalizedSearch = deferredSearchTerm.trim().toLowerCase();
    const filteredQueries = normalizedSearch
      ? queries.filter((query) =>
          [
            query.id,
            query.firstName,
            query.lastName,
            query.email,
            query.subject,
            query.status,
          ].some((value) => value.toLowerCase().includes(normalizedSearch))
        )
      : queries;

    return [...filteredQueries].sort((left, right) => {
      let comparison = 0;

      if (sortField === "date") {
        comparison = new Date(left.createdAt.replace(" ", "T")).getTime() - new Date(right.createdAt.replace(" ", "T")).getTime();
      } else if (sortField === "queryId") {
        comparison = left.queryId - right.queryId;
      } else {
        comparison = left[sortField].localeCompare(right[sortField], undefined, { sensitivity: "base" });
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [deferredSearchTerm, queries, sortDirection, sortField]);

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold text-slate-950">Contact Queries</h2>
        <p className="mt-1 text-sm text-slate-500">Submitted messages from the contact page are listed here.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-4">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search queries..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                {sortableColumns.map((column) => {
                  const isActive = sortField === column.field;
                  const SortIcon = isActive ? (sortDirection === "asc" ? ArrowUp : ArrowDown) : ArrowUpDown;

                  return (
                    <th key={column.field} className="px-5 py-4 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => changeSort(column.field)}
                        className={`inline-flex items-center gap-2 font-bold transition-colors hover:text-primary ${
                          isActive ? "text-primary" : "text-slate-500"
                        }`}
                        aria-label={`Sort by ${column.label}`}
                      >
                        {column.label}
                        <SortIcon size={14} />
                      </button>
                    </th>
                  );
                })}
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(isLoading || loadError || visibleQueries.length === 0) && (
                <tr>
                  <td colSpan={8} className={`px-5 py-8 text-center font-medium ${loadError ? "text-rose-600" : "text-slate-500"}`}>
                    {isLoading ? (
                      "Loading contact queries..."
                    ) : loadError ? (
                      <div className="flex flex-col items-center gap-3">
                        <span>{loadError}</span>
                        <button
                          type="button"
                          onClick={onRetry}
                          className="rounded-xl border border-rose-200 bg-white px-4 py-2 text-xs font-bold text-rose-700 transition-colors hover:border-rose-400"
                        >
                          Try Again
                        </button>
                      </div>
                    ) : (
                      searchTerm ? "No queries match your search." : "No contact queries found."
                    )}
                  </td>
                </tr>
              )}
              {visibleQueries.map((query) => (
                <tr key={query.id} className="hover:bg-slate-50/70">
                  <td className="px-5 py-4 font-bold text-slate-900">{query.id}</td>
                  <td className="px-5 py-4 text-slate-700">{query.firstName}</td>
                  <td className="px-5 py-4 text-slate-700">{query.lastName}</td>
                  <td className="px-5 py-4 text-slate-500">{query.email}</td>
                  <td className="px-5 py-4 font-medium text-slate-800">{query.subject}</td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="inline-flex whitespace-nowrap rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                      {query.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-500">{query.date}</td>
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => onSelectQuery(query.queryId)}
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
    </section>
  );
};

export default ContactQueriesPage;
