import { Eye } from "lucide-react";
import type { ContactQuery } from "./types";

type ContactQueriesPageProps = {
  queries: ContactQuery[];
  onSelectQuery: (query: ContactQuery) => void;
};

const ContactQueriesPage = ({ queries, onSelectQuery }: ContactQueriesPageProps) => {
  return (
    <section>
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">Third Page</span>
        <h2 className="mt-2 text-3xl font-extrabold text-slate-950">Contact Queries</h2>
        <p className="mt-1 text-sm text-slate-500">Submitted messages from the contact page are listed here.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1120px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-4">Query ID</th>
                <th className="px-5 py-4">First Name</th>
                <th className="px-5 py-4">Last Name</th>
                <th className="px-5 py-4">Email Address</th>
                <th className="px-5 py-4">Institution</th>
                <th className="px-5 py-4">Subject</th>
                <th className="px-5 py-4 whitespace-nowrap">Status</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {queries.map((query) => (
                <tr key={query.id} className="hover:bg-slate-50/70">
                  <td className="px-5 py-4 font-bold text-slate-900">{query.id}</td>
                  <td className="px-5 py-4 text-slate-700">{query.firstName}</td>
                  <td className="px-5 py-4 text-slate-700">{query.lastName}</td>
                  <td className="px-5 py-4 text-slate-500">{query.email}</td>
                  <td className="max-w-[220px] px-5 py-4 text-slate-500">{query.institution}</td>
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
                      onClick={() => onSelectQuery(query)}
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
