import type { PublishedPaper, Publication, RevisionRequest, UserNotification, UserSubmission } from "./types";

export const userProfile = {
  name: "Ananya Das",
  email: "ananya.das@research.edu",
  role: "Publisher",
  institution: "University of Calcutta",
  researchArea: "Life Science and Biotechnology",
  joined: "18 May 2026",
};

export const publications: Publication[] = [
  {
    id: "IYJ-2026-118",
    title: "Antioxidant Activity of Endophytic Fungal Extracts",
    articleType: "Original Research",
    submitted: "21 May 2026",
    status: "Editorial Check",
    editor: "Dr. Pradeep Kumar Das",
    lastUpdate: "Editor started initial formatting and scope review.",
  },
  {
    id: "IYJ-2026-114",
    title: "Screening of Bioactive Compounds in Coastal Plants",
    articleType: "Short Communication",
    submitted: "13 May 2026",
    status: "Reviewer Update",
    editor: "Dr. Meera Kapoor",
    lastUpdate: "Reviewer requested a clearer methods section and figure legends.",
  },
  {
    id: "IYJ-2026-109",
    title: "Microbial Diversity in Organic Farming Soil",
    articleType: "Review Article",
    submitted: "02 May 2026",
    status: "Published",
    editor: "Dr. Pradeep Kumar Das",
    lastUpdate: "Article is live in the current issue.",
  },
];

export const notifications: UserNotification[] = [
  {
    id: "N-1208",
    title: "Editorial check started",
    source: "Editor",
    message: "Your manuscript is being checked for scope, formatting and required declarations.",
    date: "23 May 2026",
    unread: true,
  },
  {
    id: "N-1207",
    title: "Reviewer requested clarification",
    source: "Reviewer",
    message: "Please revise the methods section and upload a clean corrected file.",
    date: "22 May 2026",
    unread: true,
  },
  {
    id: "N-1201",
    title: "Publication submitted",
    source: "System",
    message: "Your publication was submitted successfully and added to your publication table.",
    date: "21 May 2026",
    unread: false,
  },
];

export const userSubmissions: UserSubmission[] = [
  {
    id: "IYJ-2026-118",
    manuscript: "Antioxidant Activity of Endophytic Fungal Extracts",
    journal: "International Journal for Invention of Nobel Knowledge",
    status: "Under Review",
    date: "21 May 2026",
  },
  {
    id: "IYJ-2026-114",
    manuscript: "Screening of Bioactive Compounds in Coastal Plants",
    journal: "International Journal for Invention of Nobel Knowledge",
    status: "Revision Requested",
    date: "13 May 2026",
  },
  {
    id: "IYJ-2026-112",
    manuscript: "Marine Algae Extracts for Antimicrobial Therapy",
    journal: "International Journal for Invention of Nobel Knowledge",
    status: "Draft",
    date: "10 May 2026",
  },
  {
    id: "IYJ-2026-109",
    manuscript: "Microbial Diversity in Organic Farming Soil",
    journal: "International Journal for Invention of Nobel Knowledge",
    status: "Accepted",
    date: "02 May 2026",
  },
  {
    id: "IYJ-2026-103",
    manuscript: "Phytochemical Profiling of Wetland Plants",
    journal: "International Journal for Invention of Nobel Knowledge",
    status: "Rejected",
    date: "24 Apr 2026",
  },
  {
    id: "IYJ-2026-098",
    manuscript: "Biofilm Inhibition in Clinical Isolates",
    journal: "International Journal for Invention of Nobel Knowledge",
    status: "Submitted",
    date: "18 Apr 2026",
  },
];

export const revisionRequests: RevisionRequest[] = [
  {
    ...userSubmissions[1],
    responseLetter: "Dear Editor, we thank the reviewers for their thoughtful comments and have addressed each requested change.",
    comments: [
      {
        id: "REV-1",
        reviewer: "Reviewer 1",
        section: "Methods",
        severity: "Minor Revision",
        comment: "Expand the extraction protocol details and clarify the solvent concentration used for each sample.",
      },
      {
        id: "REV-2",
        reviewer: "Reviewer 2",
        section: "Results",
        severity: "Major Revision",
        comment: "Figures 2 and 4 require higher-resolution versions and clearer legends for statistical annotations.",
      },
      {
        id: "REV-3",
        reviewer: "Editor",
        section: "References",
        severity: "Minor Revision",
        comment: "Update the reference list with at least three recent publications from 2024 to 2026.",
      },
    ],
  },
];

export const publishedPapers: PublishedPaper[] = [
  {
    id: "IYJ-2026-109",
    title: "Microbial Diversity in Organic Farming Soil",
    journal: "International Journal for Invention of Nobel Knowledge",
    publishedDate: "12 May 2026",
    cites: 12,
    downloads: 438,
    views: 2840,
  },
  {
    id: "IYJ-2026-088",
    title: "Plant-Derived Compounds for Wound Healing",
    journal: "International Journal for Invention of Nobel Knowledge",
    publishedDate: "19 Mar 2026",
    cites: 7,
    downloads: 291,
    views: 1695,
  },
  {
    id: "IYJ-2026-071",
    title: "Nanoparticle Assisted Enzyme Stabilization",
    journal: "International Journal for Invention of Nobel Knowledge",
    publishedDate: "04 Feb 2026",
    cites: 19,
    downloads: 623,
    views: 3910,
  },
];

export const articleTypes = [
  "Research Article",
  "Original Research",
  "Review Article",
  "Case Report",
  "Short Communication",
  "Letter / Commentary",
];


