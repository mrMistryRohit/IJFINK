import type { AdminUser, ContactQuery } from "./types";

export const initialUsers: AdminUser[] = [
  { id: 1, name: "Dr. Sarah Mitchell", email: "sarah.mitchell@journal.org", role: "Editor", status: "Active" },
  { id: 2, name: "Prof. Rakesh Sen", email: "rakesh.sen@review.edu", role: "Reviewer", status: "Active" },
  { id: 3, name: "Ananya Das", email: "ananya.das@research.edu", role: "User", status: "Inactive" },
  { id: 4, name: "Admin Operations", email: "admin@ijfink.com", role: "Admin", status: "Active" },
  { id: 5, name: "Dr. Meera Kapoor", email: "meera.kapoor@journal.org", role: "Editor", status: "Active" },
  { id: 6, name: "Rahul Verma", email: "rahul.verma@institution.edu", role: "User", status: "Active" },
];

export const contactQueries: ContactQuery[] = [
  {
    id: "CQ-1042",
    firstName: "Arjun",
    lastName: "Patel",
    email: "arjun.patel@bio.edu",
    institution: "University of Calcutta",
    subject: "Manuscript Submission",
    status: "New",
    date: "21 May 2026",
    message:
      "I would like to know the expected timeline after submitting an original research paper. Please share the next steps for manuscript screening and editor assignment.",
  },
  {
    id: "CQ-1041",
    firstName: "Lin",
    lastName: "Wei",
    email: "lin.wei@lab.org",
    institution: "Molecular Biology Research Lab",
    subject: "Editorial Enquiry",
    status: "In Review",
    date: "20 May 2026",
    message:
      "I received a reviewer invitation and want to confirm the scope, expected review format and final submission date for the reviewer comments.",
  },
  {
    id: "CQ-1040",
    firstName: "Priya",
    lastName: "Shah",
    email: "priya.shah@pharma.edu",
    institution: "National Pharmaceutical Institute",
    subject: "Publication Fees / APC",
    status: "Resolved",
    date: "19 May 2026",
    message:
      "Please provide the article processing charge details, payment schedule and whether any waiver is available for early career researchers.",
  },
  {
    id: "CQ-1039",
    firstName: "Michael",
    lastName: "Brown",
    email: "m.brown@research.net",
    institution: "Independent Research Network",
    subject: "Other",
    status: "Resolved",
    date: "18 May 2026",
    message:
      "I am looking for indexing information and citation database coverage for published articles in the journal.",
  },
];

export const adminProfile = {
  name: "Admin Operations",
  email: "admin@IJFINK.com",
  role: "Super Admin",
  department: "Journal Administration",
  lastLogin: "21 May 2026, 04:10 PM",
};
