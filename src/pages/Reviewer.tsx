import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/lib/authApi";
import {
  BarChart3,
  BookOpenCheck,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Eye,
  FileCheck2,
  FileText,
  KeyRound,
  LogOut,
  Mail,
  MessageSquareText,
  RotateCcw,
  Search,
  Send,
  ShieldCheck,
  UserCog,
} from "lucide-react";

type ReviewerTab = "dashboard" | "queue" | "finalCheck" | "profile";
type ReviewStatus = "Sent by Editor" | "Final Check" | "Revision Needed" | "Cleared for Decision";
type ReviewDecision = "Accept" | "Minor Revision" | "Major Revision" | "Reject";

type ReviewManuscript = {
  id: string;
  title: string;
  author: string;
  email: string;
  category: string;
  editor: string;
  sentDate: string;
  dueDate: string;
  status: ReviewStatus;
  priority: "High" | "Normal";
  abstract: string;
  editorNotes: string;
  checklist: Array<{ label: string; done: boolean }>;
  finalNotes: string[];
};

const sidebarItems: Array<{ id: ReviewerTab; label: string; icon: typeof BarChart3 }> = [
  { id: "dashboard", label: "Reviewer Dashboard", icon: BarChart3 },
  { id: "queue", label: "Editor Sent Queue", icon: ClipboardList },
  { id: "finalCheck", label: "Final Check", icon: ClipboardCheck },
  { id: "profile", label: "Reviewer Profile", icon: UserCog },
];

const reviewerProfile = {
  name: "Prof. Rakesh Sen",
  email: "rakesh.sen@review.edu",
  role: "Senior Reviewer",
  section: "Microbiology and Biotechnology",
  lastLogin: "23 May 2026, 04:45 PM",
};

const initialManuscripts: ReviewManuscript[] = [
  {
    id: "IYJ-2026-117",
    title: "Microbial Bioremediation in Urban Wetlands",
    author: "Rahul Verma",
    email: "rahul.verma@institution.edu",
    category: "Review Article",
    editor: "Dr. Pradeep Kumar Das",
    sentDate: "22 May 2026",
    dueDate: "29 May 2026",
    status: "Final Check",
    priority: "High",
    abstract:
      "A review of microbial interventions for wetland bioremediation with emphasis on pollutant breakdown, community structure and field deployment limits.",
    editorNotes: "Author has addressed editorial formatting changes. Please complete scientific final check before decision.",
    checklist: [
      { label: "Scope and originality reviewed", done: true },
      { label: "Methods and claims are consistent", done: true },
      { label: "References and figures checked", done: false },
      { label: "Final recommendation prepared", done: false },
    ],
    finalNotes: ["Check whether the discussion overstates the field-scale deployment evidence."],
  },
  {
    id: "IYJ-2026-118",
    title: "Antioxidant Activity of Endophytic Fungal Extracts",
    author: "Ananya Das",
    email: "ananya.das@research.edu",
    category: "Original Research",
    editor: "Dr. Pradeep Kumar Das",
    sentDate: "23 May 2026",
    dueDate: "30 May 2026",
    status: "Sent by Editor",
    priority: "Normal",
    abstract:
      "Experimental evaluation of antioxidant potential from endophytic fungal isolates using standard biochemical assays and comparative extract profiling.",
    editorNotes: "Initial editor check completed. Reviewer final validation requested for methodology and result interpretation.",
    checklist: [
      { label: "Scope and originality reviewed", done: false },
      { label: "Methods and claims are consistent", done: false },
      { label: "References and figures checked", done: false },
      { label: "Final recommendation prepared", done: false },
    ],
    finalNotes: [],
  },
  {
    id: "IYJ-2026-116",
    title: "Phytochemical Markers in Medicinal Plant Extracts",
    author: "Priya Shah",
    email: "priya.shah@pharma.edu",
    category: "Rapid Communication",
    editor: "Dr. Meera Kapoor",
    sentDate: "21 May 2026",
    dueDate: "28 May 2026",
    status: "Revision Needed",
    priority: "Normal",
    abstract:
      "Short communication identifying phytochemical marker patterns in medicinal plant extracts and their relevance for quality screening.",
    editorNotes: "Please verify whether the revised abstract now supports a final decision.",
    checklist: [
      { label: "Scope and originality reviewed", done: true },
      { label: "Methods and claims are consistent", done: false },
      { label: "References and figures checked", done: true },
      { label: "Final recommendation prepared", done: false },
    ],
    finalNotes: ["Ask author to clarify extraction solvent details in the methods section."],
  },
];

const recentUpdates = [
  "Editor sent a manuscript for final reviewer check",
  "One final recommendation is pending",
  "Revision notes prepared for author response",
  "Checklist validation updated for current queue",
];

const decisionOptions: ReviewDecision[] = ["Accept", "Minor Revision", "Major Revision", "Reject"];

const statusTone: Record<ReviewStatus, string> = {
  "Sent by Editor": "bg-blue-50 text-blue-700",
  "Final Check": "bg-amber-50 text-amber-700",
  "Revision Needed": "bg-rose-50 text-rose-700",
  "Cleared for Decision": "bg-emerald-50 text-emerald-700",
};

const Reviewer = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ReviewerTab>("dashboard");
  const [manuscripts, setManuscripts] = useState(initialManuscripts);
  const [selectedId, setSelectedId] = useState(initialManuscripts[0].id);
  const [decision, setDecision] = useState<ReviewDecision>("Minor Revision");
  const [finalNote, setFinalNote] = useState(
    "The manuscript is suitable for final editorial decision after addressing the highlighted scientific clarity points."
  );

  const selectedManuscript = manuscripts.find((paper) => paper.id === selectedId) ?? manuscripts[0];

  const dashboardStats = useMemo(
    () => [
      {
        label: "Sent by Editor",
        value: manuscripts.filter((paper) => paper.status === "Sent by Editor" || paper.status === "Final Check").length,
        sub: "Awaiting reviewer final check",
        icon: FileText,
        tone: "bg-blue-50 text-blue-600",
      },
      {
        label: "Final Checks",
        value: manuscripts.filter((paper) => paper.status === "Final Check").length,
        sub: "Currently under reviewer check",
        icon: ClipboardCheck,
        tone: "bg-amber-50 text-amber-600",
      },
      {
        label: "Revision Needed",
        value: manuscripts.filter((paper) => paper.status === "Revision Needed").length,
        sub: "Returned with reviewer notes",
        icon: RotateCcw,
        tone: "bg-rose-50 text-rose-600",
      },
      {
        label: "Cleared",
        value: manuscripts.filter((paper) => paper.status === "Cleared for Decision").length,
        sub: "Ready for editor decision",
        icon: FileCheck2,
        tone: "bg-emerald-50 text-emerald-600",
      },
    ],
    [manuscripts]
  );

  const updateStatus = (paperId: string, status: ReviewStatus) => {
    setManuscripts((currentManuscripts) =>
      currentManuscripts.map((paper) => (paper.id === paperId ? { ...paper, status } : paper))
    );
  };

  const toggleChecklistItem = (label: string) => {
    setManuscripts((currentManuscripts) =>
      currentManuscripts.map((paper) =>
        paper.id === selectedManuscript.id
          ? {
              ...paper,
              status: "Final Check",
              checklist: paper.checklist.map((item) => (item.label === label ? { ...item, done: !item.done } : item)),
            }
          : paper
      )
    );
  };

  const submitFinalCheck = () => {
    const trimmedNote = finalNote.trim();
    if (!trimmedNote) return;

    const nextStatus: ReviewStatus = decision === "Accept" ? "Cleared for Decision" : "Revision Needed";

    setManuscripts((currentManuscripts) =>
      currentManuscripts.map((paper) =>
        paper.id === selectedManuscript.id
          ? {
              ...paper,
              status: nextStatus,
              finalNotes: [`${decision}: ${trimmedNote}`, ...paper.finalNotes],
            }
          : paper
      )
    );
    setFinalNote("");
  };

  const logout = async () => {
    await logoutUser();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-white/10 bg-gradient-to-b from-[hsl(220,55%,10%)] via-[hsl(220,48%,13%)] to-[hsl(168,55%,14%)] p-5 text-white lg:flex lg:flex-col">
          <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
              <BookOpenCheck size={21} />
            </div>
            <h1 className="mt-4 text-xl font-extrabold">Reviewer Panel</h1>
            <p className="mt-1 text-sm leading-relaxed text-white/55">Final manuscript check workspace.</p>
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

          <button
            type="button"
            onClick={logout}
            className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-800"
          >
            <LogOut size={17} /> Logout
          </button>
        </aside>

        <main className="min-w-0 flex-1 lg:pl-72">
          <div className="border-b border-slate-200 bg-white px-4 py-4 lg:hidden">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                <BookOpenCheck size={19} />
              </div>
              <div>
                <h1 className="font-extrabold">Reviewer Panel</h1>
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
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">Reviewer Dashboard</span>
                    <h2 className="mt-2 text-3xl font-extrabold text-slate-950">Final Check Overview</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Manuscripts sent by editors for reviewer validation before final editorial decision.
                    </p>
                  </div>
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
                    Reviewer workspace
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
                        <h3 className="font-extrabold text-slate-950">Recent Reviewer Updates</h3>
                        <p className="mt-1 text-sm text-slate-500">Activity from editor-sent manuscripts.</p>
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
                    <h3 className="font-extrabold text-slate-950">Pending Final Checks</h3>
                    <div className="mt-4 space-y-3">
                      {manuscripts.slice(0, 3).map((paper) => (
                        <button
                          key={paper.id}
                          type="button"
                          onClick={() => {
                            setSelectedId(paper.id);
                            setActiveTab("finalCheck");
                          }}
                          className="block w-full rounded-xl border border-slate-100 bg-slate-50 p-3 text-left transition-colors hover:border-primary/30 hover:bg-primary/5"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm font-bold text-slate-900">{paper.id}</p>
                            <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusTone[paper.status]}`}>
                              {paper.status}
                            </span>
                          </div>
                          <p className="mt-1 line-clamp-1 text-sm text-slate-500">{paper.title}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "queue" && (
              <section>
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">Editor Sent Queue</span>
                    <h2 className="mt-2 text-3xl font-extrabold text-slate-950">Reviewer Manuscripts</h2>
                    <p className="mt-1 text-sm text-slate-500">Papers sent by editors for final review checks are shown here.</p>
                  </div>
                  <div className="relative w-full md:w-72">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                    <input
                      type="search"
                      placeholder="Search manuscripts"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[980px] text-left text-sm">
                      <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                        <tr>
                          <th className="px-5 py-4">Paper ID</th>
                          <th className="px-5 py-4">Title</th>
                          <th className="px-5 py-4">Author</th>
                          <th className="px-5 py-4">Editor</th>
                          <th className="px-5 py-4">Due</th>
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
                            <td className="px-5 py-4 text-slate-500">{paper.editor}</td>
                            <td className="px-5 py-4 text-slate-500">{paper.dueDate}</td>
                            <td className="px-5 py-4">
                              <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusTone[paper.status]}`}>
                                {paper.status}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-right">
                              <div className="flex justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedId(paper.id);
                                    setActiveTab("finalCheck");
                                  }}
                                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-primary hover:text-primary"
                                >
                                  View
                                </button>
                                <button
                                  type="button"
                                  onClick={() => updateStatus(paper.id, "Final Check")}
                                  className="rounded-xl bg-slate-950 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-slate-800"
                                >
                                  Start Check
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

            {activeTab === "finalCheck" && (
              <section>
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">Final Check</span>
                  <h2 className="mt-2 text-3xl font-extrabold text-slate-950">Reviewer Recommendation</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Complete the final scientific check after the editor sends the manuscript.
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
                          className={`block w-full rounded-xl border p-4 text-left transition-colors ${
                            selectedManuscript.id === paper.id
                              ? "border-primary bg-primary/5"
                              : "border-slate-100 bg-slate-50 hover:border-primary/30"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-bold text-slate-950">{paper.id}</p>
                              <p className="mt-1 text-sm text-slate-500">{paper.editor}</p>
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
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusTone[selectedManuscript.status]}`}>
                          {selectedManuscript.status}
                        </span>
                      </div>
                      <div className="mt-4 grid gap-3 md:grid-cols-3">
                        {[
                          { label: "Category", value: selectedManuscript.category },
                          { label: "Editor", value: selectedManuscript.editor },
                          { label: "Due Date", value: selectedManuscript.dueDate },
                        ].map((item) => (
                          <div key={item.label} className="rounded-xl bg-slate-50 p-4">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{item.label}</p>
                            <p className="mt-1 text-sm font-bold text-slate-800">{item.value}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
                        {selectedManuscript.abstract}
                      </div>
                      <div className="mt-3 rounded-xl border border-primary/10 bg-primary/5 p-4 text-sm leading-relaxed text-slate-600">
                        <span className="font-bold text-slate-900">Editor note: </span>
                        {selectedManuscript.editorNotes}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="mb-4 flex items-center gap-2">
                        <ClipboardCheck size={18} className="text-primary" />
                        <h3 className="font-extrabold text-slate-950">Reviewer Checklist</h3>
                      </div>
                      <div className="grid gap-3 md:grid-cols-2">
                        {selectedManuscript.checklist.map((item) => (
                          <button
                            key={item.label}
                            type="button"
                            onClick={() => toggleChecklistItem(item.label)}
                            className={`flex items-center gap-3 rounded-xl border p-4 text-left text-sm font-bold transition-colors ${
                              item.done
                                ? "border-emerald-100 bg-emerald-50 text-emerald-800"
                                : "border-slate-100 bg-slate-50 text-slate-600 hover:border-primary/30"
                            }`}
                          >
                            <span
                              className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${
                                item.done ? "bg-emerald-600 text-white" : "bg-white text-slate-300"
                              }`}
                            >
                              <CheckCircle2 size={15} />
                            </span>
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="grid gap-4 md:grid-cols-[220px_1fr]">
                        <div>
                          <label className="text-sm font-bold text-slate-700">Final recommendation</label>
                          <select
                            value={decision}
                            onChange={(event) => setDecision(event.target.value as ReviewDecision)}
                            className="mt-3 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                          >
                            {decisionOptions.map((option) => (
                              <option key={option}>{option}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-bold text-slate-700">Reviewer final note</label>
                          <textarea
                            value={finalNote}
                            onChange={(event) => setFinalNote(event.target.value)}
                            rows={5}
                            placeholder="Write final check notes for the editor..."
                            className="mt-3 w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-900 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                      </div>
                      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs font-medium text-slate-400">This is local UI only. No connection is made yet.</p>
                        <button
                          type="button"
                          onClick={submitFinalCheck}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
                        >
                          <Send size={17} /> Send Final Check
                        </button>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="mb-4 flex items-center gap-2">
                        <MessageSquareText size={18} className="text-primary" />
                        <h3 className="font-extrabold text-slate-950">Final Check Notes</h3>
                      </div>
                      <div className="space-y-3">
                        {selectedManuscript.finalNotes.length > 0 ? (
                          selectedManuscript.finalNotes.map((note) => (
                            <div key={note} className="rounded-xl bg-slate-50 p-3 text-sm leading-relaxed text-slate-600">
                              {note}
                            </div>
                          ))
                        ) : (
                          <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-400">
                            Submitted reviewer recommendations will appear here.
                          </div>
                        )}
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
                  <h2 className="mt-2 text-3xl font-extrabold text-slate-950">Reviewer Profile</h2>
                  <p className="mt-1 text-sm text-slate-500">Reviewer account details, password controls and session action.</p>
                </div>

                <div className="space-y-5">
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="font-extrabold text-slate-950">Profile Details</h3>
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <ShieldCheck size={34} />
                      </div>
                      <h3 className="mt-4 text-xl font-extrabold text-slate-950">{reviewerProfile.name}</h3>
                      <p className="text-sm font-bold text-primary">{reviewerProfile.role}</p>
                    </div>
                    <div className="mt-5 grid gap-4 lg:grid-cols-3">
                      {[
                        { label: "Email", value: reviewerProfile.email, icon: Mail },
                        { label: "Section", value: reviewerProfile.section, icon: BookOpenCheck },
                        { label: "Last Login", value: reviewerProfile.lastLogin, icon: Eye },
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
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reviewer;
