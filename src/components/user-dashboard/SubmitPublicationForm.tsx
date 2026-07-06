import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import {
  Check,
  CheckCircle2,
  FileText,
  Plus,
  Send,
  Trash2,
  Upload,
  UserRound,
} from "lucide-react";
import { articleTypes } from "./userDashboardData";
import { getStoredAuthUser } from "@/lib/authApi";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? import.meta.env.VITE_API_URL ?? "https://api.ijfink.com";
const SUBMIT_ROOT = "/user/submit-paper";
const DEFAULT_STEP = "details";

const fieldClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20";
const textAreaClass =
  "min-h-32 w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20";

type SubmissionDetails = {
  title: string;
  abstract: string;
  keywords: string;
  articleType: string;
  subjectArea: string;
};

type CoAuthorForm = {
  fullName: string;
  email: string;
  institution: string;
  orcid: string;
};

type SubmissionFiles = {
  mainManuscript: File | null;
  editableManuscript: File | null;
  coverLetter: File | null;
  figures: File[];
  supplementaryFiles: File[];
  videoAbstract: File | null;
  copyrightForm: File | null;
};

type StepKey = "details" | "authors" | "files" | "review" | "confirm";

const submissionSteps: Array<{ key: StepKey; label: string; help: string }> = [
  { key: "details", label: "Article Details", help: "Title, abstract and taxonomy" },
  { key: "authors", label: "Co-Authors", help: "Additional author records" },
  { key: "files", label: "Upload Files", help: "Multipart submission package" },
  { key: "review", label: "Review", help: "Check the full submission" },
  { key: "confirm", label: "Confirm", help: "Declarations and final send" },
];

const declarations = [
  "This is original work",
  "This manuscript is not submitted elsewhere",
  "All authors approved this submission",
  "Conflict of interest statement is included",
  "Funding statement is included",
  "Ethics approval is included if required",
];

const fileLabels: Array<{
  key: keyof SubmissionFiles;
  label: string;
  helper: string;
  accept: string;
  multiple?: boolean;
  required?: boolean;
}> = [
  { key: "mainManuscript", label: "Main Manuscript", helper: "Required", accept: ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document", required: true },
  { key: "editableManuscript", label: "Editable Manuscript", helper: "DOCX preferred", accept: ".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
  { key: "coverLetter", label: "Cover Letter", helper: "PDF, DOC, or DOCX", accept: ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
  { key: "figures", label: "Figures", helper: "PNG, JPG, or JPEG", accept: ".png,.jpg,.jpeg,image/png,image/jpeg", multiple: true },
  { key: "supplementaryFiles", label: "Supplementary Files", helper: "Any supporting material", accept: ".pdf,.doc,.docx,.zip,.csv,.xlsx,.xls,.png,.jpg,.jpeg,application/pdf,application/zip", multiple: true },
  { key: "videoAbstract", label: "Video Abstract", helper: "MP4, MOV, or AVI", accept: ".mp4,.mov,.avi,video/mp4,video/quicktime,video/x-msvideo" },
  { key: "copyrightForm", label: "Copyright Form", helper: "Optional", accept: ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
];

const emptyCoAuthor = (): CoAuthorForm => ({ fullName: "", email: "", institution: "", orcid: "" });
const emptyFiles = (): SubmissionFiles => ({ mainManuscript: null, editableManuscript: null, coverLetter: null, figures: [], supplementaryFiles: [], videoAbstract: null, copyrightForm: null });
const isBlank = (value: string) => value.trim().length === 0;
const isFilledCoAuthor = (author: CoAuthorForm) => Object.values(author).some((value) => !isBlank(value));
const normalizeApiBaseUrl = (value: string) => value.replace(/\/$/, "");

const buildSubmissionPayload = (details: SubmissionDetails, coAuthors: CoAuthorForm[], selectedFiles: SubmissionFiles) => {
  const keywords = details.keywords.split(",").map((keyword) => keyword.trim()).filter(Boolean);
  const articleData = {
    title: details.title.trim(),
    abstract: details.abstract.trim(),
    keywords,
    article_type: details.articleType,
    subject_area: details.subjectArea.trim(),
    co_authors: coAuthors.map((author, index) => ({
      full_name: author.fullName.trim(),
      email: author.email.trim(),
      institution: author.institution.trim(),
      orcid: author.orcid.trim() || null,
      author_order: index + 1,
    })),
  };

  const formData = new FormData();
  formData.append("article_data", JSON.stringify(articleData));
  if (selectedFiles.mainManuscript) formData.append("main_manuscript", selectedFiles.mainManuscript);
  if (selectedFiles.editableManuscript) formData.append("editable_manuscript", selectedFiles.editableManuscript);
  if (selectedFiles.coverLetter) formData.append("cover_letter", selectedFiles.coverLetter);
  selectedFiles.figures.forEach((figure) => formData.append("figures", figure));
  selectedFiles.supplementaryFiles.forEach((file) => formData.append("supplementary_files", file));
  if (selectedFiles.videoAbstract) formData.append("video_abstract", selectedFiles.videoAbstract);
  if (selectedFiles.copyrightForm) formData.append("copyright_form", selectedFiles.copyrightForm);

  return formData;
};

const getFileNames = (files: File[] | File | null) => {
  if (!files) return "";
  if (Array.isArray(files)) return files.map((file) => file.name).join(", ");
  return files.name;
};

const SubmitPublicationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionDetails, setSubmissionDetails] = useState<SubmissionDetails>({ title: "", abstract: "", keywords: "", articleType: "", subjectArea: "" });
  const [coAuthors, setCoAuthors] = useState<CoAuthorForm[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<SubmissionFiles>(emptyFiles);
  const [selectedDeclarations, setSelectedDeclarations] = useState<string[]>([]);

  const activeStepKey = (location.pathname.split("/").filter(Boolean)[2] as StepKey | undefined) ?? DEFAULT_STEP;
  const activeStepIndex = submissionSteps.findIndex((step) => step.key === activeStepKey);
  if (activeStepIndex < 0) return <Navigate to={`${SUBMIT_ROOT}/${DEFAULT_STEP}`} replace />;

  const authUser = getStoredAuthUser();
  const authorName = authUser?.display_name?.trim() || authUser?.email || "Author";
  const account = {
    name: authorName,
    email: authUser?.email || "Not available",
    institution: authUser?.display_name ? "Not provided in auth payload" : "Not provided",
    researchArea: "Not provided in auth payload",
  };

  const updateSubmissionDetails = (field: keyof SubmissionDetails, value: string) => setSubmissionDetails((currentDetails) => ({ ...currentDetails, [field]: value }));
  const updateCoAuthor = (index: number, field: keyof CoAuthorForm, value: string) => setCoAuthors((currentAuthors) => currentAuthors.map((author, authorIndex) => authorIndex === index ? { ...author, [field]: value } : author));
  const addCoAuthor = () => setCoAuthors((currentAuthors) => [...currentAuthors, emptyCoAuthor()]);
  const removeCoAuthor = (index: number) => setCoAuthors((currentAuthors) => currentAuthors.filter((_, authorIndex) => authorIndex !== index));
  const updateFile = (key: keyof SubmissionFiles, files: FileList | null) => {
    if (key === "figures" || key === "supplementaryFiles") {
      setSelectedFiles((currentFiles) => ({ ...currentFiles, [key]: files ? Array.from(files) : [] }));
      return;
    }
    setSelectedFiles((currentFiles) => ({ ...currentFiles, [key]: files?.[0] ?? null }));
  };
  const goToStep = (stepKey: StepKey) => navigate(`${SUBMIT_ROOT}/${stepKey}`);

  const validateDetails = () => {
    if (isBlank(submissionDetails.title)) return "Article title is required.";
    if (isBlank(submissionDetails.abstract)) return "Abstract is required.";
    if (isBlank(submissionDetails.articleType)) return "Please select an article type.";
    if (isBlank(submissionDetails.subjectArea)) return "Subject area is required.";
    return "";
  };
  const validateAuthors = () => {
    const activeCoAuthors = coAuthors.filter(isFilledCoAuthor);
    for (const author of activeCoAuthors) {
      if (isBlank(author.fullName)) return "Each co-author needs a full name.";
      if (isBlank(author.email)) return "Each co-author needs an email address.";
      if (isBlank(author.institution)) return "Each co-author needs an institution.";
      if (author.orcid.trim() && !/^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/.test(author.orcid.trim())) return "ORCID must follow the 0000-0000-0000-0000 format.";
    }
    const uniqueEmails = new Set<string>();
    for (const author of activeCoAuthors) {
      const normalizedEmail = author.email.trim().toLowerCase();
      if (uniqueEmails.has(normalizedEmail)) return "Co-author emails must be unique.";
      uniqueEmails.add(normalizedEmail);
    }
    return "";
  };
  const validateFiles = () => (!selectedFiles.mainManuscript ? "Main Manuscript is required." : "");
  const validateDeclarations = () => (selectedDeclarations.length !== declarations.length ? "Please confirm all declarations before submitting." : "");

  const handleNext = () => {
    const validationMessage = activeStepKey === "details" ? validateDetails() : activeStepKey === "authors" ? validateAuthors() : activeStepKey === "files" ? validateFiles() : "";
    if (validationMessage) {
      toast({ title: "Cannot continue", description: validationMessage, variant: "destructive" });
      return;
    }
    const nextStep = submissionSteps[Math.min(activeStepIndex + 1, submissionSteps.length - 1)]?.key;
    if (nextStep) goToStep(nextStep);
  };
  const handlePrevious = () => {
    const previousStep = submissionSteps[Math.max(activeStepIndex - 1, 0)]?.key;
    if (previousStep) goToStep(previousStep);
  };

  const handleSubmit = async () => {
    const detailError = validateDetails();
    const authorError = validateAuthors();
    const fileError = validateFiles();
    const declarationError = validateDeclarations();
    const validationMessage = detailError || authorError || fileError || declarationError;
    if (validationMessage) {
      toast({ title: "Submission incomplete", description: validationMessage, variant: "destructive" });
      return;
    }

    const token = localStorage.getItem("access_token") ?? localStorage.getItem("token") ?? sessionStorage.getItem("access_token") ?? sessionStorage.getItem("token");
    if (!token) {
      toast({ title: "Login required", description: "Please sign in before submitting a paper.", variant: "destructive" });
      return;
    }

    const activeCoAuthors = coAuthors.filter(isFilledCoAuthor);
    const formData = buildSubmissionPayload(submissionDetails, activeCoAuthors, selectedFiles);
    setIsSubmitting(true);

    try {
      const response = await fetch(`${normalizeApiBaseUrl(API_BASE_URL)}/api/user/articles`, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: formData });
      const responseText = await response.text();
      let responseData: { success?: boolean; message?: string } | null = null;
      try { responseData = responseText ? JSON.parse(responseText) : null; } catch { responseData = null; }
      if (!response.ok || !responseData?.success) throw new Error(responseData?.message ?? "The backend rejected the submission.");

      toast({ title: "Article submitted", description: "Your manuscript has been sent for editorial screening." });
      setSubmissionDetails({ title: "", abstract: "", keywords: "", articleType: "", subjectArea: "" });
      setCoAuthors([]);
      setSelectedFiles(emptyFiles());
      setSelectedDeclarations([]);
      navigate("/user/my-submissions");
    } catch (error) {
      toast({ title: "Submission failed", description: error instanceof Error ? error.message : "Something went wrong while submitting.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderDetailsStep = () => (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <FileText size={18} className="text-primary" />
        <h2 className="text-lg font-extrabold text-slate-950">Article Details</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-bold text-slate-700">Article title</label>
          <input className={fieldClass} value={submissionDetails.title} onChange={(event) => updateSubmissionDetails("title", event.target.value)} placeholder="Enter the manuscript title" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700">Article type</label>
          <select className={fieldClass} value={submissionDetails.articleType} onChange={(event) => updateSubmissionDetails("articleType", event.target.value)}>
            <option value="">Select article type</option>
            {articleTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700">Subject area</label>
          <input className={fieldClass} value={submissionDetails.subjectArea} onChange={(event) => updateSubmissionDetails("subjectArea", event.target.value)} placeholder="Enter subject area" />
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-bold text-slate-700">Abstract</label>
          <textarea className={textAreaClass} value={submissionDetails.abstract} onChange={(event) => updateSubmissionDetails("abstract", event.target.value)} placeholder="Paste the abstract here" rows={6} />
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-bold text-slate-700">Keywords</label>
          <input className={fieldClass} value={submissionDetails.keywords} onChange={(event) => updateSubmissionDetails("keywords", event.target.value)} placeholder="Comma-separated keywords" />
        </div>
      </div>
    </div>
  );

  const renderAuthorsStep = () => (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <UserRound size={18} className="text-primary" />
          <h2 className="text-lg font-extrabold text-slate-950">Co-Authors</h2>
        </div>
        <button type="button" onClick={addCoAuthor} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary/90"><Plus size={16} /> Add co-author</button>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
        <p className="text-xs font-bold uppercase text-slate-400">Primary author</p>
        <p className="mt-1 text-sm font-semibold text-slate-800">{account.name}</p>
        <p className="mt-1 text-sm text-slate-600">{account.email}</p>
        <p className="mt-1 text-sm text-slate-600">{account.institution}</p>
      </div>

      <div className="mt-4 space-y-4">
        {coAuthors.length === 0 && <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">No co-authors added yet.</div>}
        {coAuthors.map((author, index) => (
          <div key={index} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-700">Co-author {index + 1}</h3>
              <button type="button" onClick={() => removeCoAuthor(index)} className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold text-rose-600 hover:bg-rose-50"><Trash2 size={13} /> Remove</button>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2"><label className="mb-2 block text-sm font-bold text-slate-700">Full name</label><input className={fieldClass} value={author.fullName} onChange={(event) => updateCoAuthor(index, "fullName", event.target.value)} placeholder="Co-author full name" /></div>
              <div><label className="mb-2 block text-sm font-bold text-slate-700">Email</label><input type="email" className={fieldClass} value={author.email} onChange={(event) => updateCoAuthor(index, "email", event.target.value)} placeholder="author@example.edu" /></div>
              <div><label className="mb-2 block text-sm font-bold text-slate-700">Institution</label><input className={fieldClass} value={author.institution} onChange={(event) => updateCoAuthor(index, "institution", event.target.value)} placeholder="Institution / affiliation" /></div>
              <div className="md:col-span-2"><label className="mb-2 block text-sm font-bold text-slate-700">ORCID</label><input className={fieldClass} value={author.orcid} onChange={(event) => updateCoAuthor(index, "orcid", event.target.value)} placeholder="0000-0000-0000-0000" /></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFilesStep = () => (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Upload size={18} className="text-primary" />
        <h2 className="text-lg font-extrabold text-slate-950">Upload Files</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {fileLabels.map((fileField) => {
          const selectedValue = getFileNames(selectedFiles[fileField.key] as File[] | File | null);
          return (
            <div key={fileField.key} className={fileField.multiple || fileField.key === "coverLetter" ? "md:col-span-2" : ""}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label className="text-sm font-extrabold text-slate-800">{fileField.label}</label>
                <span className={`text-xs font-semibold ${fileField.required ? "text-rose-600" : "text-slate-400"}`}>{fileField.helper}</span>
              </div>
              <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center transition-colors hover:border-primary hover:bg-primary/5">
                <Upload size={22} className="text-primary" />
                <span className="mt-2 text-sm font-bold text-slate-700">{selectedValue || "Choose file"}</span>
                <span className="mt-1 text-xs text-slate-400">{fileField.label}</span>
                <input type="file" accept={fileField.accept} multiple={fileField.multiple} className="hidden" onChange={(event) => updateFile(fileField.key, event.target.files)} />
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderReviewStep = () => {
    const summaryKeywords = submissionDetails.keywords.split(",").map((keyword) => keyword.trim()).filter(Boolean);
    const activeCoAuthors = coAuthors.filter(isFilledCoAuthor);
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={18} className="text-primary" />
          <h2 className="text-lg font-extrabold text-slate-950">Submission Review</h2>
        </div>
        <p className="mt-2 text-sm text-slate-500">Review all article details before the final confirmation step.</p>
        <div className="mt-6 space-y-5">
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4"><h3 className="font-extrabold text-slate-950">Article Details</h3><div className="mt-4 grid gap-3 md:grid-cols-2"><div><p className="text-xs font-bold uppercase text-slate-400">Article title</p><p className="mt-1 text-sm font-semibold text-slate-800">{submissionDetails.title || "Not provided"}</p></div><div><p className="text-xs font-bold uppercase text-slate-400">Article type</p><p className="mt-1 text-sm font-semibold text-slate-800">{submissionDetails.articleType || "Not provided"}</p></div><div><p className="text-xs font-bold uppercase text-slate-400">Subject area</p><p className="mt-1 text-sm font-semibold text-slate-800">{submissionDetails.subjectArea || "Not provided"}</p></div><div><p className="text-xs font-bold uppercase text-slate-400">Keywords</p><p className="mt-1 text-sm font-semibold text-slate-800">{summaryKeywords.length ? summaryKeywords.join(", ") : "Not provided"}</p></div><div className="md:col-span-2"><p className="text-xs font-bold uppercase text-slate-400">Abstract</p><p className="mt-1 max-h-24 overflow-hidden text-sm leading-relaxed text-slate-700">{submissionDetails.abstract || "Not provided"}</p></div></div></div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4"><h3 className="font-extrabold text-slate-950">Co-Authors</h3><div className="mt-4 space-y-3">{activeCoAuthors.length === 0 ? <p className="text-sm text-slate-500">No co-authors added.</p> : activeCoAuthors.map((author, index) => <div key={index} className="rounded-xl border border-slate-100 bg-white p-4"><p className="font-extrabold text-slate-900">{author.fullName}</p><div className="mt-2 grid gap-2 md:grid-cols-2"><p className="text-sm text-slate-600">Email: {author.email}</p><p className="text-sm text-slate-600">Institution: {author.institution}</p><p className="text-sm text-slate-600 md:col-span-2">ORCID: {author.orcid || "Not provided"}</p></div></div>)}</div></div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4"><h3 className="font-extrabold text-slate-950">Upload Files</h3><div className="mt-4 grid gap-3 md:grid-cols-2">{fileLabels.map((file) => <div key={file.key} className="rounded-xl border border-slate-100 bg-white p-4"><p className="text-xs font-bold uppercase text-slate-400">{file.label}</p><p className="mt-1 text-sm font-bold text-slate-800">{getFileNames(selectedFiles[file.key] as File[] | File | null) || "No file selected"}</p></div>)}</div></div>
        </div>
      </div>
    );
  };

  const renderConfirmStep = () => (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-primary" /><h2 className="text-lg font-extrabold text-slate-950">Final Confirmation</h2></div>
      <p className="mt-2 text-sm text-slate-500">Confirm the required declarations before sending the submission.</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">{declarations.map((label) => <label key={label} className="flex min-h-12 items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 text-sm font-bold text-slate-700"><input type="checkbox" className="h-4 w-4 accent-primary" checked={selectedDeclarations.includes(label)} onChange={() => setSelectedDeclarations((currentDeclarations) => currentDeclarations.includes(label) ? currentDeclarations.filter((declaration) => declaration !== label) : [...currentDeclarations, label])} />{label}</label>)}</div>
    </div>
  );

  return (
    <section className="space-y-6">
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">Submit Paper</span>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Article Submission</h1>
      </div>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]"><div className="space-y-6">{activeStepKey === "details" && renderDetailsStep()}{activeStepKey === "authors" && renderAuthorsStep()}{activeStepKey === "files" && renderFilesStep()}{activeStepKey === "review" && renderReviewStep()}{activeStepKey === "confirm" && renderConfirmStep()}<div className="flex flex-wrap items-center justify-between gap-3"><button type="button" onClick={handlePrevious} disabled={activeStepIndex === 0} className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50">Previous</button>{activeStepKey !== "confirm" ? <button type="button" onClick={handleNext} className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90">Next</button> : <button type="button" onClick={handleSubmit} disabled={isSubmitting} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"><Send size={17} />{isSubmitting ? "Submitting..." : "Submit Article"}</button>}</div></div><aside className="space-y-5"><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="font-extrabold text-slate-950">Submission Pages</h2><div className="mt-4 space-y-3">{submissionSteps.map((step, index) => { const isCompleted = index < activeStepIndex; const isActive = index === activeStepIndex; return <button key={step.key} type="button" onClick={() => goToStep(step.key)} className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors ${isActive ? "bg-primary/10" : "bg-slate-50 hover:bg-slate-100"}`}><div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-sm font-extrabold ${isCompleted ? "bg-primary text-white" : "bg-primary/10 text-primary"}`}>{isCompleted ? <Check size={16} strokeWidth={3} /> : index + 1}</div><div><p className="text-sm font-bold text-slate-700">{step.label}</p><p className="text-xs text-slate-500">{step.help}</p></div></button>; })}</div></div></aside></div>
    </section>
  );
};

export default SubmitPublicationForm;

