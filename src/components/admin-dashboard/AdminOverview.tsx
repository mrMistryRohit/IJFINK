import { Activity, CheckCircle2, ClipboardList, FileText, MessageSquareText, Users } from "lucide-react";
import type { UserRole } from "./types";

type AdminOverviewProps = {
  totalUsers: number;
  activeUsers: number;
  queryCount: number;
  roleCounts: Record<UserRole, number>;
};

const AdminOverview = ({ totalUsers, activeUsers, queryCount, roleCounts }: AdminOverviewProps) => {
  const dashboardStats = [
    { label: "Total Users", value: totalUsers, sub: "All registered accounts", icon: Users, tone: "text-blue-600 bg-blue-50" },
    { label: "Active Users", value: activeUsers, sub: "Currently enabled", icon: CheckCircle2, tone: "text-emerald-600 bg-emerald-50" },
    { label: "Submitted Queries", value: queryCount, sub: "Contact page entries", icon: MessageSquareText, tone: "text-amber-600 bg-amber-50" },
    { label: "Published Articles", value: 0, sub: "Live journal records", icon: FileText, tone: "text-purple-600 bg-purple-50" },
    { label: "Manuscripts", value: 0, sub: "Pending submissions", icon: ClipboardList, tone: "text-cyan-600 bg-cyan-50" },
    { label: "Site Health", value: "98%", sub: "Static admin estimate", icon: Activity, tone: "text-rose-600 bg-rose-50" },
  ];

  return (
    <section>
      <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Admin Dashboard</span>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-950">Website Statistics</h2>
          <p className="mt-1 text-sm text-slate-500">Overview of users, queries, publishing and platform activity.</p>
        </div>
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
          System online
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {dashboardStats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-slate-500">{stat.label}</p>
                <p className="mt-2 text-3xl font-extrabold text-slate-950">{stat.value}</p>
                <p className="mt-1 text-xs font-medium text-slate-400">{stat.sub}</p>
              </div>
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.tone}`}>
                <stat.icon size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[1fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-extrabold text-slate-950">Role Distribution</h3>
          <div className="mt-5 space-y-4">
            {(Object.keys(roleCounts) as UserRole[]).map((role) => (
              <div key={role}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-bold text-slate-700">{role}</span>
                  <span className="text-slate-500">{roleCounts[role]}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${Math.max((roleCounts[role] / totalUsers) * 100, 4)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-extrabold text-slate-950">Recent Activity</h3>
          <div className="mt-4 space-y-3">
            {["New contact query received", "Reviewer account activated", "Editor profile reviewed", "Dashboard statistics refreshed"].map((activity) => (
              <div key={activity} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
                <CheckCircle2 size={16} className="text-primary" />
                {activity}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminOverview;
