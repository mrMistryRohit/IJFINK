import { Bell, BookOpenCheck, CheckCircle2, Clock, FileText } from "lucide-react";
import type { Publication, UserNotification } from "./types";
import { userProfile } from "./userDashboardData";

type DashboardOverviewProps = {
  publications: Publication[];
  notifications: UserNotification[];
};

const DashboardOverview = ({ publications, notifications }: DashboardOverviewProps) => {
  const publishedCount = publications.filter((publication) => publication.status === "Published").length;
  const activeCount = publications.filter((publication) => publication.status !== "Published").length;
  const unreadCount = notifications.filter((notification) => notification.unread).length;

  const stats = [
    { label: "Total Publications", value: publications.length, sub: "All submitted documents", icon: FileText, tone: "bg-blue-50 text-blue-600" },
    { label: "Published", value: publishedCount, sub: "Live journal articles", icon: CheckCircle2, tone: "bg-emerald-50 text-emerald-600" },
    { label: "In Progress", value: activeCount, sub: "With editor or reviewer", icon: Clock, tone: "bg-amber-50 text-amber-600" },
    { label: "New Updates", value: unreadCount, sub: "Unread notifications", icon: Bell, tone: "bg-rose-50 text-rose-600" },
  ];

  return (
    <section>
      <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Publisher Dashboard</span>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Welcome, {userProfile.name}</h1>
          <p className="mt-1 text-sm text-slate-500">Track your submitted publications, editor updates and reviewer feedback.</p>
        </div>
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
          Publisher account
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
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

      <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_0.85fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="font-extrabold text-slate-950">Publication Activity</h2>
              <p className="mt-1 text-sm text-slate-500">Latest movement across your submissions.</p>
            </div>
            <BookOpenCheck size={20} className="text-primary" />
          </div>
          <div className="space-y-3">
            {publications.map((publication) => (
              <div key={publication.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-950">{publication.title}</p>
                    <p className="mt-1 text-xs font-medium text-slate-500">{publication.id} - {publication.editor}</p>
                  </div>
                  <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{publication.status}</span>
                </div>
                <p className="mt-3 text-sm text-slate-600">{publication.lastUpdate}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-extrabold text-slate-950">Recent Notifications</h2>
          <div className="mt-4 space-y-3">
            {notifications.slice(0, 3).map((notification) => (
              <div key={notification.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-bold text-slate-950">{notification.title}</p>
                  {notification.unread && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
                </div>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400">{notification.source} - {notification.date}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{notification.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardOverview;

