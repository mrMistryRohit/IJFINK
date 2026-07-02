import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BookOpenCheck, ClipboardList, FileText, MessageSquareText } from "lucide-react";
import { editorRecentActivity, monthlyDecisionData, reviewerResponseData } from "./editorDashboardData";
import type { Manuscript } from "./types";

type EditorOverviewProps = {
  manuscripts: Manuscript[];
};

const EditorOverview = ({ manuscripts }: EditorOverviewProps) => {
  const dashboardStats = [
    {
      label: "Submitted Papers",
      value: manuscripts.length,
      sub: "Author submissions in editor queue",
      icon: FileText,
      tone: "bg-blue-50 text-blue-600",
    },
    {
      label: "Need Editorial Check",
      value: manuscripts.filter((paper) => paper.status === "New Submission" || paper.status === "Editorial Check").length,
      sub: "Scope, format and ethics review",
      icon: ClipboardList,
      tone: "bg-amber-50 text-amber-600",
    },
    {
      label: "Edits Sent",
      value: manuscripts.filter((paper) => paper.editNotes.length > 0).length,
      sub: "Visible to authors in UI",
      icon: MessageSquareText,
      tone: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Ready for Review",
      value: manuscripts.filter((paper) => paper.status === "Ready for Review").length,
      sub: "Prepared for reviewer assignment",
      icon: BookOpenCheck,
      tone: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <section>
      <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Editor Dashboard</span>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-950">Publication Overview</h2>
          <p className="mt-1 text-sm text-slate-500">
            Recent submissions, editorial checks and author-visible revision activity.
          </p>
        </div>
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
          Editors only
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-extrabold text-slate-950">Monthly Submissions vs Decisions</h3>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyDecisionData} margin={{ left: -18, right: 8, top: 8, bottom: 0 }}>
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#475569" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#475569" }} domain={[0, 80]} />
                <Tooltip
                  cursor={{ fill: "rgba(15, 23, 42, 0.04)" }}
                  contentStyle={{
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
                  }}
                />
                <Legend iconType="square" wrapperStyle={{ color: "#475569", fontSize: 12, fontWeight: 600 }} />
                <Bar dataKey="submissions" name="Submissions" fill="hsl(209, 53%, 63%)" radius={[5, 5, 0, 0]} />
                <Bar dataKey="accepted" name="Accepted" fill="hsl(168 70% 34%)" radius={[5, 5, 0, 0]} />
                <Bar dataKey="rejected" name="Rejected" fill="hsl(346 77% 49%)" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-extrabold text-slate-950">Reviewer Response Rate</h3>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={reviewerResponseData} margin={{ left: -18, right: 8, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="reviewerResponseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.22} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.04} />
                  </linearGradient>
                  <linearGradient id="reviewerTargetGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(168 70% 34%)" stopOpacity={0.16} />
                    <stop offset="95%" stopColor="hsl(168 70% 34%)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#475569" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#475569" }} domain={[0, 24]} />
                <Tooltip
                  contentStyle={{
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="responseRate"
                  name="Response rate"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2.5}
                  fill="url(#reviewerResponseGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="targetRate"
                  name="Target rate"
                  stroke="hsl(168 70% 34%)"
                  strokeWidth={2.5}
                  fill="url(#reviewerTargetGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="font-extrabold text-slate-950">Recent Activity</h3>
        <div className="mt-7 space-y-0">
          {editorRecentActivity.map((activity, index) => (
            <div key={activity.title} className="relative flex gap-6 pb-6 last:pb-0">
              {index < editorRecentActivity.length - 1 && (
                <span className="absolute left-[7px] top-4 h-full w-px bg-slate-200" aria-hidden="true" />
              )}
              <span className="relative z-10 mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-primary/15">
                <span className="h-3 w-3 rounded-full bg-primary shadow-sm shadow-primary/30" />
              </span>
              <div>
                <p className="text-sm font-medium text-slate-950 md:text-base">{activity.title}</p>
                <p className="mt-1 text-sm text-slate-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default EditorOverview;
