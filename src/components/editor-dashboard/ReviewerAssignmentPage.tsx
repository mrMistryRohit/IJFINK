import { useMemo, useState } from "react";
import { format } from "date-fns";
import { Building2, CalendarDays, Check, Clock3, Search, Send, Star } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type ReviewerAvailability = "Available" | "Busy" | "Unavailable";

type Reviewer = {
  id: string;
  name: string;
  initials: string;
  affiliation: string;
  expertise: string[];
  reviews: number;
  acceptRate: number;
  avgDays: number;
  rating: number;
  orcid: string;
  availability: ReviewerAvailability;
};

const reviewers: Reviewer[] = [
  {
    id: "aiko-tanaka",
    name: "Prof. Aiko Tanaka",
    initials: "AT",
    affiliation: "University of Tokyo",
    expertise: ["Deep Learning", "Computer Vision", "Generative Models"],
    reviews: 142,
    acceptRate: 87,
    avgDays: 14,
    rating: 4.9,
    orcid: "2210",
    availability: "Available",
  },
  {
    id: "samuel-oconnor",
    name: "Dr. Samuel O'Connor",
    initials: "SO",
    affiliation: "Trinity College Dublin",
    expertise: ["CRISPR", "Mitochondrial Biology", "Synthetic Biology"],
    reviews: 89,
    acceptRate: 76,
    avgDays: 21,
    rating: 4.6,
    orcid: "5510",
    availability: "Busy",
  },
  {
    id: "mira-holmberg",
    name: "Dr. Mira Holmberg",
    initials: "MH",
    affiliation: "Stockholm University",
    expertise: ["Climate Modeling", "Earth Systems", "Tipping Points"],
    reviews: 211,
    acceptRate: 65,
    avgDays: 11,
    rating: 4.8,
    orcid: "7711",
    availability: "Available",
  },
  {
    id: "ravi-subramanian",
    name: "Prof. Ravi Subramanian",
    initials: "RS",
    affiliation: "IISc Bangalore",
    expertise: ["NLP", "Compositional Reasoning", "LLM Alignment"],
    reviews: 67,
    acceptRate: 71,
    avgDays: 18,
    rating: 4.7,
    orcid: "1102",
    availability: "Available",
  },
  {
    id: "luis-fernandez",
    name: "Dr. Luis Fernandez",
    initials: "LF",
    affiliation: "Universidad de Buenos Aires",
    expertise: ["Glaciology", "Remote Sensing", "Hydrology"],
    reviews: 54,
    acceptRate: 81,
    avgDays: 16,
    rating: 4.5,
    orcid: "3320",
    availability: "Unavailable",
  },
  {
    id: "hiroshi-watanabe",
    name: "Prof. Hiroshi Watanabe",
    initials: "HW",
    affiliation: "RIKEN",
    expertise: ["Condensed Matter", "Topological Phases"],
    reviews: 128,
    acceptRate: 69,
    avgDays: 13,
    rating: 4.9,
    orcid: "0042",
    availability: "Available",
  },
];

const availabilityTone: Record<ReviewerAvailability, string> = {
  Available: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Busy: "border-amber-200 bg-amber-50 text-amber-700",
  Unavailable: "border-rose-200 bg-rose-50 text-rose-700",
};

const ReviewerAssignmentPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReviewerIds, setSelectedReviewerIds] = useState<string[]>([]);
  const [invitationDate, setInvitationDate] = useState<Date>(new Date(2025, 5, 21));
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const filteredReviewers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return reviewers;

    return reviewers.filter((reviewer) => {
      const searchableText = [reviewer.name, reviewer.affiliation, ...reviewer.expertise].join(" ").toLowerCase();
      return searchableText.includes(query);
    });
  }, [searchQuery]);

  const toggleReviewer = (reviewer: Reviewer) => {
    if (reviewer.availability === "Unavailable") return;

    setSelectedReviewerIds((currentIds) => {
      if (currentIds.includes(reviewer.id)) {
        return currentIds.filter((id) => id !== reviewer.id);
      }

      if (currentIds.length >= 3) return currentIds;
      return [...currentIds, reviewer.id];
    });
  };

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Reviewer Assignment</span>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-950">Reviewer Assignment</h2>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Select up to 3 reviewers for MS-2025-1042 · Geometric Deep Learning...
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-extrabold text-slate-950 shadow-sm transition-colors hover:border-primary hover:text-primary"
              >
                <CalendarDays size={17} />
                {format(invitationDate, "MMM d, yyyy")}
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-auto p-0">
              <Calendar
                mode="single"
                selected={invitationDate}
                defaultMonth={invitationDate}
                onSelect={(date) => {
                  if (!date) return;
                  setInvitationDate(date);
                  setIsCalendarOpen(false);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <button
            type="button"
            disabled={selectedReviewerIds.length === 0}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-extrabold text-white shadow-sm shadow-primary/25 transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-primary/45"
          >
            <Send size={17} />
            Send Invitation
          </button>
        </div>
      </div>

      <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search reviewers by name or expertise..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-2 2xl:grid-cols-3">
        {filteredReviewers.map((reviewer) => {
          const isSelected = selectedReviewerIds.includes(reviewer.id);
          const isUnavailable = reviewer.availability === "Unavailable";

          return (
            <article
              key={reviewer.id}
              className={`rounded-2xl border bg-white p-6 shadow-sm transition-colors ${
                isSelected ? "border-primary/50 shadow-primary/10" : "border-slate-200 hover:border-primary/30"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-extrabold text-white shadow-sm shadow-primary/25">
                    {reviewer.initials}
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-extrabold text-slate-950">{reviewer.name}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-slate-500">
                      <Building2 size={15} className="shrink-0" />
                      <span className="truncate">{reviewer.affiliation}</span>
                    </p>
                  </div>
                </div>

                <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold uppercase ${availabilityTone[reviewer.availability]}`}>
                  {reviewer.availability}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {reviewer.expertise.map((tag) => (
                  <span key={tag} className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { value: reviewer.reviews, label: "Reviews" },
                  { value: `${reviewer.acceptRate}%`, label: "Accept %" },
                  { value: reviewer.avgDays, label: "Avg Days" },
                ].map((metric) => (
                  <div key={metric.label} className="rounded-xl bg-slate-50 px-3 py-3 text-center">
                    <p className="text-sm font-extrabold text-slate-950">{metric.value}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">{metric.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 text-sm font-medium text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <Star size={15} className="fill-amber-400 text-amber-400" />
                  {reviewer.rating}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock3 size={15} />
                  ORCID: {reviewer.orcid}
                </span>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggleReviewer(reviewer)}
                  disabled={isUnavailable || (!isSelected && selectedReviewerIds.length >= 3)}
                  className={`inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl px-4 text-sm font-extrabold shadow-sm transition-colors ${
                    isSelected
                      ? "bg-primary text-white shadow-primary/20 hover:bg-primary/90"
                      : "border border-slate-200 bg-white text-slate-950 hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                  }`}
                >
                  {isSelected && <Check size={16} />}
                  {isSelected ? "Selected" : "Assign Reviewer"}
                </button>
                <button type="button" className="h-10 px-3 text-sm font-extrabold text-slate-950 transition-colors hover:text-primary">
                  Profile
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {filteredReviewers.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-10 text-center text-sm font-medium text-slate-500 shadow-sm">
          No reviewers match your search.
        </div>
      )}
    </section>
  );
};

export default ReviewerAssignmentPage;
