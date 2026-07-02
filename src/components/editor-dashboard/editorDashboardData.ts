import type { AssignedPaper, Manuscript } from "./types";

export const editorProfile = {
  name: "Dr. Pradeep Kumar Das",
  email: "chief.editor@IJFINK.com",
  role: "Chief Editor",
  section: "Life Science and Biotechnology",
  lastLogin: "21 May 2026, 05:20 PM",
};

export const initialManuscripts: Manuscript[] = [
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

export const assignedPapers: AssignedPaper[] = [
  {
    id: "MS-2025-1031",
    journal: "The Lancet",
    title: "A Phase-III Trial of mRNA-1283 in High-Risk Influenza Cohorts",
    summary: "Randomized double-blind trial across 24 sites demonstrating 78% efficacy against severe outcomes.",
    author: "Dr. Priya Raghavan",
    coAuthors: 0,
    submitted: "2025-05-20",
    status: "Reviewer Assigned",
    tags: ["mRNA", "influenza", "clinical trial"],
    affiliation: "Mass General Brigham",
    orcid: "0000-0002-7711-3098",
    researchArea: "Vaccinology",
    similarity: "4%",
    corresponding: "Dr. Priya Raghavan",
    fileName: "manuscript.pdf",
    fileType: "PDF",
    fileSize: "5.4 MB",
  },
  {
    id: "MS-2025-1018",
    journal: "Nature Sustainability",
    title: "Carbon-Negative Concrete via Mineralized Olivine Aggregates",
    summary: "We report a concrete formulation that sequesters 287 kg CO₂ per ton over its service life.",
    author: "Dr. Mateus Almeida",
    coAuthors: 0,
    submitted: "2025-05-12",
    status: "Under Review",
    tags: ["carbon capture", "concrete", "materials"],
    affiliation: "University of São Paulo",
    orcid: "0000-0003-2456-1108",
    researchArea: "Sustainable Materials",
    similarity: "7%",
    corresponding: "Dr. Mateus Almeida",
    fileName: "carbon-concrete-study.pdf",
    fileType: "PDF",
    fileSize: "4.8 MB",
  },
  {
    id: "MS-2025-0994",
    journal: "Transactions of the ACL",
    title: "Sparse Mixture-of-Experts for Low-Resource Machine Translation",
    summary: "Routing tokens to expertise-specific subnetworks improves BLEU by 4.7 on FLORES-200 low-resource pairs.",
    author: "Dr. Hana Okonkwo",
    coAuthors: 0,
    submitted: "2025-04-28",
    status: "Revision",
    tags: ["NLP", "machine translation", "MoE"],
    affiliation: "University of Lagos",
    orcid: "0000-0001-9284-5520",
    researchArea: "Computational Linguistics",
    similarity: "9%",
    corresponding: "Dr. Hana Okonkwo",
    fileName: "moe-translation-revision.pdf",
    fileType: "PDF",
    fileSize: "6.1 MB",
  },
];

export const monthlyDecisionData = [
  { month: "Dec", submissions: 38, accepted: 11, rejected: 18 },
  { month: "Jan", submissions: 44, accepted: 14, rejected: 21 },
  { month: "Feb", submissions: 52, accepted: 18, rejected: 24 },
  { month: "Mar", submissions: 49, accepted: 16, rejected: 22 },
  { month: "Apr", submissions: 61, accepted: 22, rejected: 27 },
  { month: "May", submissions: 67, accepted: 26, rejected: 28 },
];

export const reviewerResponseData = [
  { week: "W1", responseRate: 18, targetRate: 12 },
  { week: "W2", responseRate: 22, targetRate: 16 },
  { week: "W3", responseRate: 19, targetRate: 11 },
  { week: "W4", responseRate: 24, targetRate: 18 },
];

export const editorRecentActivity = [
  {
    title: "New manuscript MS-2025-1042 successfully submitted to Nature Machine Intelligence for peer review",
    time: "12 min ago",
  },
  {
    title: "Prof. Aiko Tanaka completed the formal peer review for manuscript MS-2025-0994 this morning",
    time: "1 h ago",
  },
  {
    title: "Dr. Hana Okonkwo uploaded the revised manuscript version v2 for MS-2025-0994 to the portal",
    time: "3 h ago",
  },
  {
    title: "MS-2025-0961 was officially accepted for publication in the prestigious journal Physical Review X",
    time: "Yesterday",
  },
  {
    title: "A unique DOI 10.1038/s41560-025-01829-3 was finally assigned to manuscript MS-2025-0918 today",
    time: "2 days ago",
  },
  {
    title: "MS-2025-0871 published — Vol. 15, Issue 5",
    time: "4 days ago",
  },
];
