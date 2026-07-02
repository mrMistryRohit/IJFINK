import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowUpRight,
  Bell,
  BookOpen,
  CheckCircle2,
  Clock,
  FileText,
  MessageSquareText,
  Plus,
  Send,
} from "lucide-react";
import type { Publication, SubmissionStatus, UserDashboardSection, UserNotification, UserSubmission } from "./types";
import { userProfile } from "./userDashboardData";

type DashboardOverviewProps = {
  publications: Publication[];
  notifications: UserNotification[];
  submissions: UserSubmission[];
  onSectionChange: (section: UserDashboardSection) => void;
};

const submissionActivity = [
  { month: "Dec", submissions: 2, accepted: 1 },
  { month: "Jan", submissions: 3, accepted: 2 },
  { month: "Feb", submissions: 4, accepted: 2 },
  { month: "Mar", submissions: 5, accepted: 3 },
  { month: "Apr", submissions: 3, accepted: 2 },
  { month: "May", submissions: 6, accepted: 4 },
];

const reviewProgress = [
  { id: "IYJ-2026-118", progress: 65 },
  { id: "IYJ-2026-114", progress: 80 },
  { id: "IYJ-2026-112", progress: 15 },
];

const statusTone: Record<SubmissionStatus, string> = {
  "Under Review": "border-blue-200 bg-blue-50 text-blue-700",
  "Revision Requested": "border-amber-200 bg-amber-50 text-amber-700",
  Accepted: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Submitted: "border-cyan-200 bg-cyan-50 text-cyan-700",
  Draft: "border-slate-200 bg-slate-100 text-slate-600",
  Rejected: "border-rose-200 bg-rose-50 text-rose-700",
};

const timelineIcon: Record<UserNotification["source"], typeof Bell> = {
  Editor: MessageSquareText,
  Reviewer: CheckCircle2,
  System: Send,
};

const DashboardOverview = ({ publications, notifications, submissions, onSectionChange }: DashboardOverviewProps) => {
  const publishedCount = publications.filter((publication) => publication.status === "Published").length;
  const activeCount = submissions.filter((submission) => submission.status !== "Accepted" && submission.status !== "Rejected").length;
  const acceptedCount = submissions.filter((submission) => submission.status === "Accepted").length;
  const unreadCount = notifications.filter((notification) => notification.unread).length;

  const stats = [
    {
      label: "Active Submissions",
      value: activeCount,
      sub: "+2 this month",
      icon: FileText,
      tone: "bg-blue-50 text-blue-600",
    },
    {
      label: "Publications",
      value: publications.length + publishedCount,
      sub: "+3 this year",
      icon: BookOpen,
      tone: "bg-violet-50 text-violet-600",
    },
    {
      label: "Accepted",
      value: acceptedCount,
      sub: "Ready for publication",
      icon: CheckCircle2,
      tone: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "New Updates",
      value: unreadCount,
      sub: "Unread notifications",
      icon: Bell,
      tone: "bg-rose-50 text-rose-600",
    },
  ];

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm text-slate-500">Welcome back,</p>
          <h1 className="mt-1 text-3xl font-extrabold text-slate-950">{userProfile.name}</h1>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onSectionChange("submissions")}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-950 shadow-sm transition-colors hover:border-primary hover:text-primary"
          >
            View submissions
          </button>
          <button
            type="button"
            onClick={() => onSectionChange("submit")}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-sm shadow-primary/20 transition-colors hover:bg-primary/90"
          >
            <Plus size={17} /> New submission
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-slate-500">{stat.label}</p>
                <p className="mt-2 text-3xl font-extrabold text-slate-950">{stat.value}</p>
                <p className="mt-2 text-xs font-semibold text-emerald-600">{stat.sub}</p>
              </div>
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.tone}`}>
                <stat.icon size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.9fr_0.95fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="font-extrabold text-slate-950">Submission activity</h2>
              <p className="mt-1 text-xs text-slate-500">Last 6 months</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-700">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" /> Submissions
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[hsl(168_70%_24%)]" /> Accepted
              </span>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={submissionActivity} margin={{ left: -24, right: 8, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="submissionsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.24} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.04} />
                  </linearGradient>
                  <linearGradient id="acceptedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(168 70% 24%)" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="hsl(168 70% 24%)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#475569" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#475569" }} domain={[0, 8]} />
                <Tooltip
                  contentStyle={{
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
                  }}
                />
                <Area type="monotone" dataKey="submissions" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#submissionsGradient)" />
                <Area type="monotone" dataKey="accepted" stroke="hsl(168 70% 24%)" strokeWidth={2.5} fill="url(#acceptedGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-extrabold text-slate-950">Review progress</h2>
          <p className="mt-1 text-xs text-slate-500">Active manuscripts</p>
          <div className="mt-6 space-y-5">
            {reviewProgress.map((item) => (
              <div key={item.id}>
                <div className="mb-2 flex items-center justify-between gap-3 text-xs font-bold">
                  <span className="text-slate-950">{item.id}</span>
                  <span className="text-slate-500">{item.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-primary/15">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${item.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.9fr_0.95fr]">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-start justify-between gap-3 p-5">
            <div>
              <h2 className="font-extrabold text-slate-950">Recent submissions</h2>
              <p className="mt-1 text-xs text-slate-500">Your latest manuscripts</p>
            </div>
            <button
              type="button"
              onClick={() => onSectionChange("submissions")}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-950 transition-colors hover:text-primary"
            >
              View all <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="overflow-hidden">
            <table className="w-full table-fixed text-left text-sm">
              <thead className="border-y border-slate-200 text-xs font-semibold text-slate-500">
                <tr>
                  <th className="w-[42%] px-5 py-3">Title</th>
                  <th className="w-[28%] px-5 py-3">Journal</th>
                  <th className="w-[19%] px-5 py-3">Status</th>
                  <th className="w-[11%] px-5 py-3 text-right">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {submissions.slice(0, 5).map((submission) => (
                  <tr key={submission.id} className="hover:bg-slate-50/70">
                    <td className="px-5 py-3">
                      <p className="font-extrabold text-slate-950">{submission.manuscript}</p>
                      <p className="mt-1 text-xs font-semibold text-slate-500">{submission.id}</p>
                    </td>
                    <td className="px-5 py-3 text-xs text-slate-500">{submission.journal}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex whitespace-nowrap rounded-full border px-3 py-1 text-xs font-bold ${statusTone[submission.status]}`}>
                        {submission.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right text-xs font-medium text-slate-500">{submission.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-extrabold text-slate-950">Activity timeline</h2>
          <p className="mt-1 text-xs text-slate-500">Latest events</p>
          <div className="mt-6 space-y-5">
            {notifications.map((notification) => {
              const Icon = timelineIcon[notification.source];

              return (
                <div key={notification.id} className="flex gap-3">
                  <div className="relative flex flex-col items-center">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/10">
                      <Icon size={15} />
                    </span>
                    <span className="mt-2 h-full w-px bg-slate-200 last:hidden" />
                  </div>
                  <div className="pb-1">
                    <p className="text-sm font-extrabold text-slate-950">{notification.title}</p>
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      {notification.source} - {notification.date}
                    </p>
                  </div>
                </div>
              );
            })}
            <div className="flex gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/10">
                <Clock size={15} />
              </div>
              <div>
                <p className="text-sm font-extrabold text-slate-950">Manuscript accepted for publication</p>
                <p className="mt-1 text-xs font-medium text-slate-500">IYJ-2026-109 - 12 May 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardOverview;
