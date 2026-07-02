import { ArrowDown, ArrowUp, ArrowUpDown, Plus, Search } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import type { AdminUser } from "./types";

type SortField = "name" | "email" | "role" | "status";

const sortableColumns: Array<{ field: SortField; label: string }> = [
  { field: "name", label: "Name" },
  { field: "email", label: "Email" },
  { field: "role", label: "Role" },
  { field: "status", label: "Status" },
];

type UserManagementPageProps = {
  users: AdminUser[];
  isLoading: boolean;
  loadError: string;
  updatingUserId: number | null;
  onCreateUserClick: () => void;
  onRetry: () => void;
  onToggleUserStatus: (userId: number) => void;
};

const UserManagementPage = ({ users, isLoading, loadError, updatingUserId, onCreateUserClick, onRetry, onToggleUserStatus }: UserManagementPageProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const changeSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }

    setSortField(field);
    setSortDirection("asc");
  };

  const visibleUsers = useMemo(() => {
    const normalizedSearch = deferredSearchTerm.trim().toLowerCase();
    const filteredUsers = normalizedSearch
      ? users.filter((user) =>
          [user.name, user.email, user.role, user.status].some((value) =>
            value.toLowerCase().includes(normalizedSearch)
          )
        )
      : users;

    return [...filteredUsers].sort((left, right) => {
      const comparison = left[sortField].localeCompare(right[sortField], undefined, { sensitivity: "base" });
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [deferredSearchTerm, sortDirection, sortField, users]);

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-950">User Management</h2>
          <p className="mt-1 text-sm text-slate-500">View authors, editors, publication staff and admins. Activate or deactivate accounts.</p>
        </div>
        <button
          type="button"
          onClick={onCreateUserClick}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
        >
          <Plus size={17} /> Create Privileged User
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-4">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search users..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
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
              {(isLoading || loadError || visibleUsers.length === 0) && (
                <tr>
                  <td colSpan={5} className={`px-5 py-8 text-center font-medium ${loadError ? "text-rose-600" : "text-slate-500"}`}>
                    {isLoading ? (
                      "Loading users..."
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
                      searchTerm ? "No users match your search." : "No users found."
                    )}
                  </td>
                </tr>
              )}
              {visibleUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/70">
                  <td className="px-5 py-4 font-bold text-slate-900">{user.name}</td>
                  <td className="px-5 py-4 text-slate-500">{user.email}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">{user.role}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${user.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => onToggleUserStatus(user.id)}
                      disabled={updatingUserId === user.id}
                      className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-primary hover:text-primary"
                    >
                      {updatingUserId === user.id ? "Updating..." : user.status === "Active" ? "Deactivate" : "Activate"}
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

export default UserManagementPage;
