import { useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  Eye,
  FileText,
  LogOut,
  Mail,
  MessageSquareText,
  Plus,
  ShieldCheck,
  UserCog,
  Users,
} from "lucide-react";

type AdminTab = "dashboard" | "users" | "queries" | "profile";
type UserRole = "User" | "Reviewer" | "Editor" | "Admin";

const sidebarItems: Array<{ id: AdminTab; label: string; icon: typeof BarChart3 }> = [
  { id: "dashboard", label: "Admin Dashboard", icon: BarChart3 },
  { id: "users", label: "User Management", icon: Users },
  { id: "queries", label: "Contact Queries", icon: MessageSquareText },
  { id: "profile", label: "Admin Profile", icon: UserCog },
];

const initialUsers = [
  { id: 1, name: "Dr. Sarah Mitchell", email: "sarah.mitchell@journal.org", role: "Editor" as UserRole, status: "Active" },
  { id: 2, name: "Prof. Rakesh Sen", email: "rakesh.sen@review.edu", role: "Reviewer" as UserRole, status: "Active" },
  { id: 3, name: "Ananya Das", email: "ananya.das@research.edu", role: "User" as UserRole, status: "Inactive" },
  { id: 4, name: "Admin Operations", email: "admin@ijink.com", role: "Admin" as UserRole, status: "Active" },
  { id: 5, name: "Dr. Meera Kapoor", email: "meera.kapoor@journal.org", role: "Editor" as UserRole, status: "Active" },
  { id: 6, name: "Rahul Verma", email: "rahul.verma@institution.edu", role: "User" as UserRole, status: "Active" },
];

const contactQueries = [
  { id: "CQ-1042", name: "Arjun Patel", email: "arjun.patel@bio.edu", subject: "Submission timeline", category: "Publishing", status: "New", date: "21 May 2026" },
  { id: "CQ-1041", name: "Dr. Lin Wei", email: "lin.wei@lab.org", subject: "Reviewer invitation", category: "Editorial", status: "In Review", date: "20 May 2026" },
  { id: "CQ-1040", name: "Priya Shah", email: "priya.shah@pharma.edu", subject: "Article processing fee", category: "Billing", status: "Resolved", date: "19 May 2026" },
  { id: "CQ-1039", name: "Michael Brown", email: "m.brown@research.net", subject: "Indexing information", category: "Journal", status: "Resolved", date: "18 May 2026" },
];

const adminProfile = {
  name: "Admin Operations",
  email: "admin@ijink.com",
  role: "Super Admin",
  department: "Journal Administration",
  lastLogin: "21 May 2026, 04:10 PM",
};

const Admin = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [users, setUsers] = useState(initialUsers);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Reviewer" as Exclude<UserRole, "User"> });

  const roleCounts = useMemo(
    () =>
      users.reduce(
        (counts, user) => ({
          ...counts,
          [user.role]: counts[user.role] + 1,
        }),
        { User: 0, Reviewer: 0, Editor: 0, Admin: 0 } as Record<UserRole, number>
      ),
    [users]
  );

  const dashboardStats = [
    { label: "Total Users", value: users.length, sub: "All registered accounts", icon: Users, tone: "text-blue-600 bg-blue-50" },
    { label: "Active Users", value: users.filter((user) => user.status === "Active").length, sub: "Currently enabled", icon: CheckCircle2, tone: "text-emerald-600 bg-emerald-50" },
    { label: "Submitted Queries", value: contactQueries.length, sub: "Contact page entries", icon: MessageSquareText, tone: "text-amber-600 bg-amber-50" },
    { label: "Published Articles", value: 0, sub: "Live journal records", icon: FileText, tone: "text-purple-600 bg-purple-50" },
    { label: "Manuscripts", value: 0, sub: "Pending submissions", icon: ClipboardList, tone: "text-cyan-600 bg-cyan-50" },
    { label: "Site Health", value: "98%", sub: "Static admin estimate", icon: Activity, tone: "text-rose-600 bg-rose-50" },
  ];

  const toggleUserStatus = (userId: number) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === userId ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" } : user
      )
    );
  };

  const createPrivilegedUser = () => {
    if (!newUser.name.trim() || !newUser.email.trim()) return;

    setUsers((currentUsers) => [
      ...currentUsers,
      {
        id: Math.max(...currentUsers.map((user) => user.id)) + 1,
        name: newUser.name.trim(),
        email: newUser.email.trim(),
        role: newUser.role,
        status: "Active",
      },
    ]);
    setNewUser({ name: "", email: "", role: "Reviewer" });
    setShowCreateUser(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-white/10 bg-gradient-to-b from-[hsl(220,55%,10%)] via-[hsl(220,48%,13%)] to-[hsl(168,55%,14%)] p-5 text-white lg:flex lg:flex-col">
          <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
              <ShieldCheck size={21} />
            </div>
            <h1 className="mt-4 text-xl font-extrabold">Admin Panel</h1>
            <p className="mt-1 text-sm leading-relaxed text-white/55">International Journal for Invention of Nobel Knowledge management workspace.</p>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition-colors ${
                  activeTab === item.id
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-white/65 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm text-white/60">
            <p className="font-bold text-white">Logged in as</p>
            <p>{adminProfile.email}</p>
          </div>
        </aside>

        <main className="min-w-0 flex-1 lg:pl-72">
          <div className="border-b border-slate-200 bg-white px-4 py-4 lg:hidden">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                <ShieldCheck size={19} />
              </div>
              <div>
                <h1 className="font-extrabold">Admin Panel</h1>
                <p className="text-xs text-slate-500">International Journal for Invention of Nobel Knowledge</p>
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold ${
                    activeTab === item.id ? "bg-primary text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-5 md:p-8">
            {activeTab === "dashboard" && (
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
                            <div
                              className="h-full rounded-full bg-primary"
                              style={{ width: `${Math.max((roleCounts[role] / users.length) * 100, 4)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="font-extrabold text-slate-950">Recent Activity</h3>
                    <div className="mt-4 space-y-3">
                      {["New contact query received", "Reviewer account activated", "Editor profile reviewed", "Dashboard statistics refreshed"].map(
                        (activity) => (
                          <div key={activity} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
                            <CheckCircle2 size={16} className="text-primary" />
                            {activity}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "users" && (
              <section>
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">Second Page</span>
                    <h2 className="mt-2 text-3xl font-extrabold text-slate-950">User Management</h2>
                    <p className="mt-1 text-sm text-slate-500">View users, reviewers, editors and admins. Activate or deactivate accounts.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowCreateUser((value) => !value)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
                  >
                    <Plus size={17} /> Create Admin, Editor or Reviewer
                  </button>
                </div>

                {showCreateUser && (
                  <div className="mb-5 grid gap-3 rounded-2xl border border-primary/15 bg-white p-4 shadow-sm md:grid-cols-[1fr_1fr_180px_auto]">
                    <input
                      value={newUser.name}
                      onChange={(event) => setNewUser((value) => ({ ...value, name: event.target.value }))}
                      placeholder="Full name"
                      className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                    <input
                      value={newUser.email}
                      onChange={(event) => setNewUser((value) => ({ ...value, email: event.target.value }))}
                      placeholder="Email address"
                      className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                    <select
                      value={newUser.role}
                      onChange={(event) => setNewUser((value) => ({ ...value, role: event.target.value as Exclude<UserRole, "User"> }))}
                      className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option>Admin</option>
                      <option>Editor</option>
                      <option>Reviewer</option>
                    </select>
                    <button
                      type="button"
                      onClick={createPrivilegedUser}
                      className="h-11 rounded-xl bg-slate-950 px-5 text-sm font-bold text-white transition-colors hover:bg-slate-800"
                    >
                      Add User
                    </button>
                  </div>
                )}

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] text-left text-sm">
                      <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                        <tr>
                          <th className="px-5 py-4">Name</th>
                          <th className="px-5 py-4">Email</th>
                          <th className="px-5 py-4">Role</th>
                          <th className="px-5 py-4">Status</th>
                          <th className="px-5 py-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {users.map((user) => (
                          <tr key={user.id} className="hover:bg-slate-50/70">
                            <td className="px-5 py-4 font-bold text-slate-900">{user.name}</td>
                            <td className="px-5 py-4 text-slate-500">{user.email}</td>
                            <td className="px-5 py-4">
                              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">{user.role}</span>
                            </td>
                            <td className="px-5 py-4">
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-bold ${
                                  user.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                                }`}
                              >
                                {user.status}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-right">
                              <button
                                type="button"
                                onClick={() => toggleUserStatus(user.id)}
                                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-primary hover:text-primary"
                              >
                                {user.status === "Active" ? "Deactivate" : "Activate"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "queries" && (
              <section>
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">Third Page</span>
                  <h2 className="mt-2 text-3xl font-extrabold text-slate-950">Contact Queries</h2>
                  <p className="mt-1 text-sm text-slate-500">Submitted messages from the contact page are listed here.</p>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[820px] text-left text-sm">
                      <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                        <tr>
                          <th className="px-5 py-4">Query ID</th>
                          <th className="px-5 py-4">Name</th>
                          <th className="px-5 py-4">Email</th>
                          <th className="px-5 py-4">Subject</th>
                          <th className="px-5 py-4">Category</th>
                          <th className="px-5 py-4">Status</th>
                          <th className="px-5 py-4">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {contactQueries.map((query) => (
                          <tr key={query.id} className="hover:bg-slate-50/70">
                            <td className="px-5 py-4 font-bold text-slate-900">{query.id}</td>
                            <td className="px-5 py-4 text-slate-700">{query.name}</td>
                            <td className="px-5 py-4 text-slate-500">{query.email}</td>
                            <td className="px-5 py-4 font-medium text-slate-800">{query.subject}</td>
                            <td className="px-5 py-4 text-slate-500">{query.category}</td>
                            <td className="px-5 py-4">
                              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{query.status}</span>
                            </td>
                            <td className="px-5 py-4 text-slate-500">{query.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "profile" && (
              <section>
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">Fourth Page</span>
                  <h2 className="mt-2 text-3xl font-extrabold text-slate-950">Admin User Profile</h2>
                  <p className="mt-1 text-sm text-slate-500">Admin-specific details and account actions.</p>
                </div>

                <div className="grid gap-5 xl:grid-cols-[0.72fr_1.28fr]">
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <ShieldCheck size={34} />
                    </div>
                    <h3 className="mt-4 text-xl font-extrabold text-slate-950">{adminProfile.name}</h3>
                    <p className="text-sm font-bold text-primary">{adminProfile.role}</p>
                    <button
                      type="button"
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-800"
                    >
                      <LogOut size={17} /> Logout
                    </button>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="font-extrabold text-slate-950">Profile Details</h3>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      {[
                        { label: "Email", value: adminProfile.email, icon: Mail },
                        { label: "Department", value: adminProfile.department, icon: ClipboardList },
                        { label: "Last Login", value: adminProfile.lastLogin, icon: Eye },
                        { label: "Permissions", value: "Dashboard, Users, Queries, Profile", icon: ShieldCheck },
                      ].map((item) => (
                        <div key={item.label} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                          <item.icon size={18} className="text-primary" />
                          <p className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-400">{item.label}</p>
                          <p className="mt-1 font-bold text-slate-800">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
