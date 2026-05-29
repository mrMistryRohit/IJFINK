import { useMemo, useState } from "react";
import {
  BarChart3,
  BookOpenCheck,
  CheckCircle2,
  ClipboardList,
  Clock,
  Edit3,
  Eye,
  FileText,
  KeyRound,
  LogOut,
  Mail,
  MessageSquareText,
  PenLine,
  Search,
  Send,
  ShieldCheck,
  UserCog,
  UserRound,
} from "lucide-react";

type EditorTab = "dashboard" | "submissions" | "edits" | "profile";
type ManuscriptStatus = "New Submission" | "Editorial Check" | "Edits Requested" | "Ready for Review";

type Manuscript = {
  id: string;
  title: string;
  author: string;
  email: string;
  category: string;
  submitted: string;
  status: ManuscriptStatus;
  priority: "High" | "Normal";
  summary: string;
  editNotes: string[];
};

const sidebarItems: Array<{ id: EditorTab; label: string; icon: typeof BarChart3 }> = [
  { id: "dashboard", label: "Editor Dashboard", icon: BarChart3 },
  { id: "submissions", label: "Publication Queue", icon: ClipboardList },
  { id: "edits", label: "Provide Edits", icon: PenLine },
  { id: "profile", label: "Editor Profile", icon: UserCog },
];

const editorProfile = {
  name: "Dr. Pradeep Kumar Das",
  email: "chief.editor@IJFINK.com",
  role: "Chief Editor",
  section: "Life Science and Biotechnology",
  lastLogin: "21 May 2026, 05:20 PM",
};

const initialManuscripts: Manuscript[] = [
  {
    id: "IYJ-2026-118",
    title: "Antioxidant Activity of Endophytic Fungal Extracts",
    author: "Ananya Das",
    email: "ananya.das@research.edu",
    category: "Original Research",
    submitted: "21 May 2026",
    status: "New Submission",
    priority: "High",
    summary: "Awaiting scope, formatting and conflict-of-interest screening before reviewer assignment.",
    editNotes: [],
  },
  {
    id: "IYJ-2026-117",
    title: "Microbial Bioremediation in Urban Wetlands",
    author: "Rahul Verma",
    email: "rahul.verma@institution.edu",
    category: "Review Article",
    submitted: "20 May 2026",
    status: "Editorial Check",
    priority: "Normal",
    summary: "Figures and references need editor validation before moving to peer review.",
    editNotes: ["Please update figure captions with complete experimental context."],
  },
  {
    id: "IYJ-2026-116",
    title: "Phytochemical Markers in Medicinal Plant Extracts",
    author: "Priya Shah",
    email: "priya.shah@pharma.edu",
    category: "Rapid Communication",
    submitted: "19 May 2026",
    status: "Edits Requested",
    priority: "Normal",
    summary: "Author has received requested editorial changes and is expected to resubmit.",
    editNotes: ["Revise the abstract to clearly state sample size, method and primary result."],
  },
];

const recentUpdates = [
  "New manuscript submitted for publication",
  "Author revision received for editorial screening",
  "Reviewer invitation draft prepared",
  "Two papers moved to publication-ready queue",
];

const Editor = () => {
  const [activeTab, setActiveTab] = useState<EditorTab>("dashboard");
  const [manuscripts, setManuscripts] = useState(initialManuscripts);
  const [selectedId, setSelectedId] = useState(initialManuscripts[0].id);
  const [editText, setEditText] = useState(
    "Please refine the introduction, check journal formatting, and upload a clean revised manuscript."
  );

  const selectedManuscript = manuscripts.find((paper) => paper.id === selectedId) ?? manuscripts[0];

  const dashboardStats = useMemo(
    () => [
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
    ],
    [manuscripts]
  );

  const sendEditsToAuthor = () => {
    const trimmedEdit = editText.trim();
    if (!trimmedEdit) return;

    setManuscripts((currentManuscripts) =>
      currentManuscripts.map((paper) =>
        paper.id === selectedManuscript.id
          ? {
            ...paper,
            status: "Edits Requested",
            editNotes: [trimmedEdit, ...paper.editNotes],
          }
          : paper
      )
    );
    setEditText("");
  };

  const moveToReview = (paperId: string) => {
    setManuscripts((currentManuscripts) =>
      currentManuscripts.map((paper) =>
        paper.id === paperId
          ? {
            ...paper,
            status: "Ready for Review",
          }
          : paper
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-white/10 bg-gradient-to-b from-[hsl(220,55%,10%)] via-[hsl(220,48%,13%)] to-[hsl(168,55%,14%)] p-5 text-white lg:flex lg:flex-col">
          <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
              <Edit3 size={21} />
            </div>
            <h1 className="mt-4 text-xl font-extrabold">Editor Panel</h1>
            <p className="mt-1 text-sm leading-relaxed text-white/55">Editors-only publication workspace.</p>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition-colors ${activeTab === item.id
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-white/65 hover:bg-white/[0.08] hover:text-white"
                  }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-800"
          >
            <LogOut size={17} /> Logout
          </button>
        </aside>

        <main className="min-w-0 flex-1 lg:pl-72">
          <div className="border-b border-slate-200 bg-white px-4 py-4 lg:hidden">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                <Edit3 size={19} />
              </div>
              <div>
                <h1 className="font-extrabold">Editor Panel</h1>
                <p className="text-xs text-slate-500">International Journal for Invention of Nobel Knowledge</p>
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold ${activeTab === item.id ? "bg-primary text-white" : "bg-slate-100 text-slate-600"
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

                <div className="mt-6 grid gap-4 xl:grid-cols-[1fr_0.85fr]">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <div>
                        <h3 className="font-extrabold text-slate-950">Recent Publication Updates</h3>
                        <p className="mt-1 text-sm text-slate-500">Activity an editor needs before taking action.</p>
                      </div>
                      <Clock size={20} className="text-primary" />
                    </div>
                    <div className="space-y-3">
                      {recentUpdates.map((update) => (
                        <div key={update} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
                          <CheckCircle2 size={16} className="text-primary" />
                          {update}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="font-extrabold text-slate-950">Next Editor Actions</h3>
                    <div className="mt-4 space-y-3">
                      {manuscripts.slice(0, 3).map((paper) => (
                        <button
                          key={paper.id}
                          type="button"
                          onClick={() => {
                            setSelectedId(paper.id);
                            setActiveTab("edits");
                          }}
                          className="block w-full rounded-xl border border-slate-100 bg-slate-50 p-3 text-left transition-colors hover:border-primary/30 hover:bg-primary/5"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm font-bold text-slate-900">{paper.id}</p>
                            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-primary">{paper.status}</span>
                          </div>
                          <p className="mt-1 line-clamp-1 text-sm text-slate-500">{paper.title}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "submissions" && (
              <section>
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">Publication Queue</span>
                    <h2 className="mt-2 text-3xl font-extrabold text-slate-950">User Submissions</h2>
                    <p className="mt-1 text-sm text-slate-500">Papers sent by users for publication are shown here for editorial handling.</p>
                  </div>
                  <div className="relative w-full md:w-72">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                    <input
                      type="search"
                      placeholder="Search papers"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
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
                        {manuscripts.map((paper) => (
                          <tr key={paper.id} className="hover:bg-slate-50/70">
                            <td className="px-5 py-4 font-bold text-slate-900">{paper.id}</td>
                            <td className="max-w-[300px] px-5 py-4 font-medium text-slate-800">{paper.title}</td>
                            <td className="px-5 py-4 text-slate-500">{paper.author}</td>
                            <td className="px-5 py-4 text-slate-500">{paper.category}</td>
                            <td className="px-5 py-4 text-slate-500">{paper.submitted}</td>
                            <td className="px-5 py-4">
                              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{paper.status}</span>
                            </td>
                            <td className="px-5 py-4 text-right">
                              <div className="flex justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedId(paper.id);
                                    setActiveTab("edits");
                                  }}
                                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-primary hover:text-primary"
                                >
                                  View
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedId(paper.id);
                                    setActiveTab("edits");
                                  }}
                                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-primary hover:text-primary"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => moveToReview(paper.id)}
                                  className="rounded-xl bg-slate-950 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-slate-800"
                                >
                                  Review Ready
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "edits" && (
              <section>
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">Editor Edits</span>
                  <h2 className="mt-2 text-3xl font-extrabold text-slate-950">Send Changes to Author</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    This UI shows how editorial edits will appear to the user after they submit for publication.
                  </p>
                </div>

                <div className="grid gap-5 xl:grid-cols-[0.82fr_1.18fr]">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="font-extrabold text-slate-950">Select Manuscript</h3>
                    <div className="mt-4 space-y-3">
                      {manuscripts.map((paper) => (
                        <button
                          key={paper.id}
                          type="button"
                          onClick={() => setSelectedId(paper.id)}
                          className={`block w-full rounded-xl border p-4 text-left transition-colors ${selectedManuscript.id === paper.id
                              ? "border-primary bg-primary/5"
                              : "border-slate-100 bg-slate-50 hover:border-primary/30"
                            }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-bold text-slate-950">{paper.id}</p>
                              <p className="mt-1 text-sm text-slate-500">{paper.author}</p>
                            </div>
                            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600">{paper.priority}</span>
                          </div>
                          <p className="mt-3 text-sm font-semibold text-slate-800">{paper.title}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-widest text-primary">{selectedManuscript.id}</span>
                          <h3 className="mt-2 text-xl font-extrabold text-slate-950">{selectedManuscript.title}</h3>
                          <p className="mt-1 text-sm text-slate-500">
                            {selectedManuscript.author} - {selectedManuscript.email}
                          </p>
                        </div>
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                          {selectedManuscript.status}
                        </span>
                      </div>
                      <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
                        {selectedManuscript.summary}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <label className="text-sm font-bold text-slate-700">Editorial edit request</label>
                      <textarea
                        value={editText}
                        onChange={(event) => setEditText(event.target.value)}
                        rows={5}
                        placeholder="Write edits for the author..."
                        className="mt-3 w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-900 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs font-medium text-slate-400">Sending edits marks the manuscript as Edits Requested.</p>
                        <button
                          type="button"
                          onClick={sendEditsToAuthor}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
                        >
                          <Send size={17} /> Send Edits to User
                        </button>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 shadow-sm">
                      <div className="mb-4 flex items-center gap-2">
                        <Eye size={18} className="text-emerald-700" />
                        <h3 className="font-extrabold text-emerald-950">User View Preview</h3>
                      </div>
                      <div className="rounded-2xl border border-emerald-100 bg-white p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                            <UserRound size={18} />
                          </div>
                          <div>
                            <p className="font-bold text-slate-950">Author dashboard notification</p>
                            <p className="mt-1 text-sm text-slate-500">
                              {selectedManuscript.editNotes.length > 0
                                ? "Editorial changes requested. Please revise and resubmit your manuscript."
                                : "No editorial edits have been sent to this author yet."}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 space-y-3">
                          {selectedManuscript.editNotes.length > 0 ? (
                            selectedManuscript.editNotes.map((note) => (
                              <div key={note} className="rounded-xl bg-slate-50 p-3 text-sm leading-relaxed text-slate-600">
                                {note}
                              </div>
                            ))
                          ) : (
                            <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-400">
                              Sent edit requests will appear here for the user.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "profile" && (
              <section>
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">Profile</span>
                  <h2 className="mt-2 text-3xl font-extrabold text-slate-950">Editor Profile</h2>
                  <p className="mt-1 text-sm text-slate-500">Editor account details, password controls and session action.</p>
                </div>

                <div className="max-w-8xl">
                  {/* <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <ShieldCheck size={34} />
                    </div>
                    <h3 className="mt-4 text-xl font-extrabold text-slate-950">{editorProfile.name}</h3>
                    <p className="text-sm font-bold text-primary">{editorProfile.role}</p>
                  </div> */}

                  <div className="space-y-5">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                      <h3 className="font-extrabold text-slate-950">Profile Details</h3>
                      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          <ShieldCheck size={34} />
                        </div>
                        <h3 className="mt-4 text-xl font-extrabold text-slate-950">{editorProfile.name}</h3>
                        <p className="text-sm font-bold text-primary">{editorProfile.role}</p>
                      </div>
                      <div className="mt-5 grid gap-4 lg:grid-cols-3">
                        {[
                          { label: "Email", value: editorProfile.email, icon: Mail },
                          { label: "Section", value: editorProfile.section, icon: BookOpenCheck },
                          { label: "Last Login", value: editorProfile.lastLogin, icon: Eye },
                          // { label: "Permissions", value: "Dashboard, Submissions, Edits, Profile", icon: ShieldCheck },
                        ].map((item) => (
                          <div key={item.label} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                            <item.icon size={18} className="text-primary" />
                            <p className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-400">{item.label}</p>
                            <p className="mt-1 font-bold text-slate-800">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                      <div className="mb-5 flex items-center gap-2">
                        <KeyRound size={18} className="text-primary" />
                        <h3 className="font-extrabold text-slate-950">Change Password</h3>
                      </div>
                      <div className="grid gap-4 md:grid-cols-3">
                        {["Current password", "New password", "Confirm password"].map((label) => (
                          <div key={label}>
                            <label className="mb-2 block text-sm font-bold text-slate-700">{label}</label>
                            <input
                              type="password"
                              placeholder="Enter password"
                              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
                      >
                        <KeyRound size={17} /> Update Password
                      </button>
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

export default Editor;
