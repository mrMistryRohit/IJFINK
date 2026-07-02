import { useState } from "react";
import { FileText, Lock, Send, Star, X } from "lucide-react";

type ReviewRecommendation = "Minor Revision" | "Major Revision" | "Accept";
type DecisionType = "Accept" | "Minor Revision" | "Major Revision" | "Reject" | "Request Additional Review";
type ReviewsTab = "Reviewer Reports" | "Editor Notes";

type ReviewerReport = {
  id: string;
  reviewer: string;
  initials: string;
  submitted: string;
  recommendation: ReviewRecommendation;
  score: number;
  comments: string;
  attachments: string[];
};

const reviewerReports: ReviewerReport[] = [
  {
    id: "R1",
    reviewer: "Reviewer 1 (Anonymous)",
    initials: "R1",
    submitted: "2025-05-22",
    recommendation: "Minor Revision",
    score: 8,
    comments:
      "Strong methodological contribution. Suggest minor clarifications in Section 3.2 regarding hyperparameter selection and additional ablations on dataset shift.",
    attachments: ["annotated-manuscript.pdf", "reviewer-notes.docx"],
  },
  {
    id: "AT",
    reviewer: "Prof. Aiko Tanaka",
    initials: "AT",
    submitted: "2025-05-23",
    recommendation: "Major Revision",
    score: 6,
    comments:
      "The novelty is significant but baselines from NeurIPS 2024 are missing. Statistical significance tests should be added to Table 4.",
    attachments: ["annotated.pdf"],
  },
  {
    id: "R3",
    reviewer: "Reviewer 3 (Anonymous)",
    initials: "R3",
    submitted: "2025-05-24",
    recommendation: "Accept",
    score: 9,
    comments: "Excellent work. I recommend acceptance as-is. The framework will be widely adopted by the community.",
    attachments: ["review-notes.pdf"],
  },
];

const decisionTypes: DecisionType[] = ["Accept", "Minor Revision", "Major Revision", "Reject", "Request Additional Review"];

const recommendationTone: Record<ReviewRecommendation, string> = {
  "Minor Revision": "border-sky-200 bg-sky-50 text-sky-700",
  "Major Revision": "border-amber-200 bg-amber-50 text-amber-700",
  Accept: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

const ReviewsReceivedPage = () => {
  const [activeTab, setActiveTab] = useState<ReviewsTab>("Reviewer Reports");
  const [editorNotes, setEditorNotes] = useState(
    "Reviewers split between minor and major. Lean toward Major: Tanaka's baseline concern is substantial. Plan to invite a 4th expert in low-resource NLP if revisions miss the mark."
  );
  const [isDecisionCenterOpen, setIsDecisionCenterOpen] = useState(false);
  const [selectedDecision, setSelectedDecision] = useState<DecisionType>("Accept");
  const [decisionMessage, setDecisionMessage] = useState("");

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Reviews Received</span>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-950">Reviews Received</h2>
          <p className="mt-1 text-sm font-medium text-slate-500">
            MS-2025-0994 · Sparse Mixture-of-Experts for Low-Resource MT
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsDecisionCenterOpen(true)}
          className="inline-flex h-11 w-fit items-center justify-center rounded-xl bg-primary px-5 text-sm font-extrabold text-white shadow-sm shadow-primary/25 transition-colors hover:bg-primary/90"
        >
          Open Decision Center
        </button>
      </div>

      <div className="mb-3 inline-flex rounded-2xl bg-slate-200/70 p-1">
        {(["Reviewer Reports", "Editor Notes"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-xl px-4 py-2 text-sm font-bold transition-colors ${
              activeTab === tab ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-950"
            }`}
          >
            {tab === "Reviewer Reports" ? `${tab} (${reviewerReports.length})` : tab}
          </button>
        ))}
      </div>

      {activeTab === "Reviewer Reports" && (
        <div className="space-y-4">
          {reviewerReports.map((report) => (
            <article key={report.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-extrabold text-white">
                    {report.initials}
                  </span>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-950">{report.reviewer}</h3>
                    <p className="text-sm font-medium text-slate-500">Submitted {report.submitted}</p>
                  </div>
                </div>

                <div className="flex shrink-0 flex-row items-center gap-3 md:flex-col md:items-end md:gap-1">
                  <span className={`rounded-full border px-3 py-1 text-xs font-bold ${recommendationTone[report.recommendation]}`}>
                    {report.recommendation}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-slate-950">
                    <Star size={15} className="fill-amber-400 text-amber-400" />
                    {report.score}/10
                  </span>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">{report.comments}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {report.attachments.map((attachment) => (
                  <button
                    key={attachment}
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-950 shadow-sm transition-colors hover:border-primary hover:text-primary"
                  >
                    <FileText size={15} />
                    {attachment}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}

      {activeTab === "Editor Notes" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-sm font-extrabold text-slate-950">
            <Lock size={16} className="text-slate-500" />
            Internal Editor Notes (not visible to authors)
          </div>
          <textarea
            value={editorNotes}
            onChange={(event) => setEditorNotes(event.target.value)}
            className="min-h-48 w-full resize-y rounded-xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-950 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <button
            type="button"
            className="mt-3 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-950 shadow-sm transition-colors hover:border-primary hover:text-primary"
          >
            Save Notes
          </button>
        </div>
      )}

      {isDecisionCenterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
          <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-extrabold text-slate-950">Editorial Decision</h3>
              <button
                type="button"
                onClick={() => setIsDecisionCenterOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-950"
                aria-label="Close decision center"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {decisionTypes.map((decision) => (
                <button
                  key={decision}
                  type="button"
                  onClick={() => setSelectedDecision(decision)}
                  className={`rounded-xl px-4 py-2 text-sm font-bold shadow-sm transition-colors ${
                    selectedDecision === decision
                      ? "bg-primary text-white shadow-primary/20"
                      : "border border-slate-200 bg-white text-slate-950 hover:border-primary hover:text-primary"
                  }`}
                >
                  {decision}
                </button>
              ))}
            </div>

            <textarea
              value={decisionMessage}
              onChange={(event) => setDecisionMessage(event.target.value)}
              className="mt-5 min-h-72 w-full resize-y rounded-xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-950 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              aria-label="Decision message"
            />

            <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-sm transition-colors hover:border-primary hover:text-primary"
              >
                Save Draft
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-extrabold text-white shadow-sm shadow-primary/25 transition-colors hover:bg-primary/90"
              >
                <Send size={17} />
                Send To Author
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ReviewsReceivedPage;
