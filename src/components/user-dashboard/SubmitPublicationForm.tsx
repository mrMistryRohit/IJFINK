import { useState } from "react";
import { Check, CheckCircle2, FileText, Plus, Send, Upload } from "lucide-react";
import { articleTypes, subjectAreas, userProfile } from "./userDashboardData";

const fieldClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";
const textAreaClass =
  "w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";
const authorTitles = ["Dr.", "Mr.", "Mrs.", "Ms.", "Prof."];
const fileUploads = [
  { heading: "Main Manuscript", uploadText: "PDF / DOC / DOCX", fullWidth: true },
  { heading: "Cover Letter", uploadText: "PDF / DOC / DOCX", fullWidth: true },
  { heading: "Figures and Images", uploadText: "PNG / JPG / JPEG", fullWidth: false },
  { heading: "Supplementary Files", uploadText: "Supplementary files", fullWidth: false },
  { heading: "Video Abstract", uploadText: "MP4 / MOV / AVI", fullWidth: true },
];

type AuthorForm = {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  institution: string;
};

const SubmitPublicationForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [articleInfo, setArticleInfo] = useState({
    title: "",
    articleType: "",
    subjectArea: "",
    abstract: "",
    keywords: "",
    editorSummary: "",
  });
  const [authors, setAuthors] = useState<AuthorForm[]>([
    {
      title: "Dr.",
      firstName: "Ananya",
      lastName: "Das",
      email: userProfile.email,
      institution: userProfile.institution,
    },
  ]);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, string>>({});
  const [selectedDeclarations, setSelectedDeclarations] = useState<string[]>([]);
  const [reviewer, setReviewer] = useState({
    name: "",
    email: "",
    institution: "",
  });
  const declarations = [
    "This is original work",
    "This manuscript is not submitted elsewhere",
    "All authors approved this submission",
    "Conflict of interest statement is included",
    "Funding statement is included",
    "Ethics approval is included if required",
  ];
  const submissionSteps = [
    "Article info",
    "Author details",
    "Upload files",
    "Declarations",
    "Reviewer suggestions",
    "Final submit",
  ];
  const isFinalStep = activeStep === submissionSteps.length - 1;
  const displayValue = (value: string) => value.trim() || "Not provided";
  const updateAuthor = (index: number, field: keyof AuthorForm, value: string) => {
    setAuthors((currentAuthors) =>
      currentAuthors.map((author, authorIndex) =>
        authorIndex === index ? { ...author, [field]: value } : author
      )
    );
  };
  const addAuthor = () => {
    setAuthors((currentAuthors) => [
      ...currentAuthors,
      { title: "", firstName: "", lastName: "", email: "", institution: "" },
    ]);
  };
  const toggleDeclaration = (label: string) => {
    setSelectedDeclarations((currentDeclarations) =>
      currentDeclarations.includes(label)
        ? currentDeclarations.filter((declaration) => declaration !== label)
        : [...currentDeclarations, label]
    );
  };
  const goToNextStep = () => setActiveStep((step) => Math.min(step + 1, submissionSteps.length - 1));
  const goToPreviousStep = () => setActiveStep((step) => Math.max(step - 1, 0));

  return (
    <section>
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">Submit Publication</span>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Publication Submission</h1>
        <p className="mt-1 text-sm text-slate-500">Complete article details, authors, files, declarations and reviewer suggestions.</p>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.36fr]">
        <div>
          <div className={activeStep === 0 ? "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" : "hidden"}>
            <div className="mb-4 flex items-center gap-2">
              <FileText size={18} className="text-primary" />
              <h2 className="font-extrabold text-slate-950">Article Info</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold text-slate-700">Article title</label>
                <input
                  className={fieldClass}
                  placeholder="Enter article title"
                  value={articleInfo.title}
                  onChange={(event) => setArticleInfo({ ...articleInfo, title: event.target.value })}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Article type</label>
                <select
                  className={fieldClass}
                  value={articleInfo.articleType}
                  onChange={(event) => setArticleInfo({ ...articleInfo, articleType: event.target.value })}
                >
                  <option value="" disabled>Select article type</option>
                  {articleTypes.map((type) => <option key={type}>{type}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Subject area</label>
                <select
                  className={fieldClass}
                  value={articleInfo.subjectArea}
                  onChange={(event) => setArticleInfo({ ...articleInfo, subjectArea: event.target.value })}
                >
                  <option value="" disabled>Select subject area</option>
                  {subjectAreas.map((area) => <option key={area}>{area}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold text-slate-700">Abstract</label>
                <textarea
                  rows={5}
                  className={textAreaClass}
                  placeholder="Paste the article abstract"
                  value={articleInfo.abstract}
                  onChange={(event) => setArticleInfo({ ...articleInfo, abstract: event.target.value })}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Keywords</label>
                <input
                  className={fieldClass}
                  placeholder="Keyword one, keyword two"
                  value={articleInfo.keywords}
                  onChange={(event) => setArticleInfo({ ...articleInfo, keywords: event.target.value })}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Short editor summary</label>
                <input
                  className={fieldClass}
                  placeholder="One-line editorial summary"
                  value={articleInfo.editorSummary}
                  onChange={(event) => setArticleInfo({ ...articleInfo, editorSummary: event.target.value })}
                />
              </div>
            </div>
          </div>

          <div className={activeStep === 1 ? "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" : "hidden"}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-extrabold text-slate-950">Author Details</h2>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-primary">
                  Corresponding
                </span>
              </div>
              <button
                type="button"
                onClick={addAuthor}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary/90"
              >
                <Plus size={16} /> Add new Author
              </button>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-[0.35fr_1fr_1fr]">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Title</label>
                <select
                  className={fieldClass}
                  value={authors[0].title}
                  onChange={(event) => updateAuthor(0, "title", event.target.value)}
                >
                  {authorTitles.map((title) => (
                    <option key={title}>{title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Author First Name</label>
                <input
                  className={fieldClass}
                  value={authors[0].firstName}
                  onChange={(event) => updateAuthor(0, "firstName", event.target.value)}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Author Last Name</label>
                <input
                  className={fieldClass}
                  value={authors[0].lastName}
                  onChange={(event) => updateAuthor(0, "lastName", event.target.value)}
                />
              </div>
              <div className="grid gap-4 md:col-span-3 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">Email</label>
                  <input
                    type="email"
                    className={fieldClass}
                    value={authors[0].email}
                    onChange={(event) => updateAuthor(0, "email", event.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">Institution / Affiliation</label>
                  <input
                    className={fieldClass}
                    value={authors[0].institution}
                    onChange={(event) => updateAuthor(0, "institution", event.target.value)}
                  />
                </div>
              </div>
            </div>
            {authors.slice(1).map((author, authorIndex) => {
              const authorNumber = authorIndex + 1;

              return (
              <div key={authorNumber} className="mt-5 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <h3 className="text-sm font-extrabold text-slate-800">Author {authorNumber + 1}</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-[0.35fr_1fr_1fr]">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">Title</label>
                    <select
                      className={fieldClass}
                      value={author.title}
                      onChange={(event) => updateAuthor(authorNumber, "title", event.target.value)}
                    >
                      <option value="" disabled>Select title</option>
                      {authorTitles.map((title) => (
                        <option key={title}>{title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">Author First Name</label>
                    <input
                      className={fieldClass}
                      placeholder="Enter first name"
                      value={author.firstName}
                      onChange={(event) => updateAuthor(authorNumber, "firstName", event.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">Author Last Name</label>
                    <input
                      className={fieldClass}
                      placeholder="Enter last name"
                      value={author.lastName}
                      onChange={(event) => updateAuthor(authorNumber, "lastName", event.target.value)}
                    />
                  </div>
                  <div className="grid gap-4 md:col-span-3 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">Email</label>
                      <input
                        type="email"
                        className={fieldClass}
                        placeholder="author@example.edu"
                        value={author.email}
                        onChange={(event) => updateAuthor(authorNumber, "email", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">Institution / Affiliation</label>
                      <input
                        className={fieldClass}
                        placeholder="Author institution"
                        value={author.institution}
                        onChange={(event) => updateAuthor(authorNumber, "institution", event.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
          </div>

          <div className={activeStep === 2 ? "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" : "hidden"}>
            <div className="mb-4 flex items-center gap-2">
              <Upload size={18} className="text-primary" />
              <h2 className="font-extrabold text-slate-950">Upload Files</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {fileUploads.map((file) => (
                <div
                  key={file.heading}
                  className={file.fullWidth ? "md:col-span-2" : ""}
                >
                  <h3 className="mb-2 text-sm font-extrabold text-slate-800">{file.heading}</h3>
                  <label className="flex min-h-[116px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center transition-colors hover:border-primary hover:bg-primary/5">
                    <Upload size={22} className="text-primary" />
                    <span className="mt-2 text-sm font-bold text-slate-700">{file.uploadText}</span>
                    <span className="mt-1 text-xs text-slate-400">
                      {uploadedFiles[file.heading] || "Choose file"}
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(event) => {
                        const fileName = event.target.files?.[0]?.name;
                        if (fileName) {
                          setUploadedFiles({ ...uploadedFiles, [file.heading]: fileName });
                        }
                      }}
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className={activeStep === 3 ? "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" : "hidden"}>
            <h2 className="font-extrabold text-slate-950">Declarations</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {declarations.map((label) => (
                <label key={label} className="flex min-h-12 items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 text-sm font-bold text-slate-700">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-primary"
                    checked={selectedDeclarations.includes(label)}
                    onChange={() => toggleDeclaration(label)}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          <div className={activeStep === 4 ? "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" : "hidden"}>
            <h2 className="font-extrabold text-slate-950">Reviewer Suggestions</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Reviewer name</label>
                <input
                  className={fieldClass}
                  placeholder="Suggested reviewer"
                  value={reviewer.name}
                  onChange={(event) => setReviewer({ ...reviewer, name: event.target.value })}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Reviewer email</label>
                <input
                  type="email"
                  className={fieldClass}
                  placeholder="reviewer@example.edu"
                  value={reviewer.email}
                  onChange={(event) => setReviewer({ ...reviewer, email: event.target.value })}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Institution</label>
                <input
                  className={fieldClass}
                  placeholder="Reviewer institution"
                  value={reviewer.institution}
                  onChange={(event) => setReviewer({ ...reviewer, institution: event.target.value })}
                />
              </div>
            </div>
          </div>

          <div className={activeStep === 5 ? "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" : "hidden"}>
            <div>
              <div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={22} className="text-primary" />
                  <h2 className="text-xl font-extrabold text-slate-950">Final Form Preview</h2>
                </div>
                <p className="mt-2 text-sm text-slate-500">Review all details before submitting for editorial check.</p>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <h3 className="font-extrabold text-slate-950">Article Info</h3>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-400">Article title</p>
                    <p className="mt-1 text-sm font-bold text-slate-800">{displayValue(articleInfo.title)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-400">Article type</p>
                    <p className="mt-1 text-sm font-bold text-slate-800">{displayValue(articleInfo.articleType)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-400">Subject area</p>
                    <p className="mt-1 text-sm font-bold text-slate-800">{displayValue(articleInfo.subjectArea)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-400">Keywords</p>
                    <p className="mt-1 text-sm font-bold text-slate-800">{displayValue(articleInfo.keywords)}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-xs font-bold uppercase text-slate-400">Abstract</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-700">{displayValue(articleInfo.abstract)}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-xs font-bold uppercase text-slate-400">Short editor summary</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-700">{displayValue(articleInfo.editorSummary)}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <h3 className="font-extrabold text-slate-950">Author Details</h3>
                <div className="mt-4 space-y-3">
                  {authors.map((author, index) => (
                    <div key={`${author.email}-${index}`} className="rounded-xl border border-slate-100 bg-white p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-extrabold text-slate-900">
                          {displayValue(`${author.title} ${author.firstName} ${author.lastName}`)}
                        </p>
                        {index === 0 && (
                          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-primary">
                            Corresponding
                          </span>
                        )}
                      </div>
                      <div className="mt-3 grid gap-3 md:grid-cols-2">
                        <div>
                          <p className="text-xs font-bold uppercase text-slate-400">Email</p>
                          <p className="mt-1 text-sm font-bold text-slate-800">{displayValue(author.email)}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase text-slate-400">Institution / Affiliation</p>
                          <p className="mt-1 text-sm font-bold text-slate-800">{displayValue(author.institution)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <h3 className="font-extrabold text-slate-950">Upload Files</h3>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {fileUploads.map((file) => (
                    <div key={file.heading} className="rounded-xl border border-slate-100 bg-white p-4">
                      <p className="text-xs font-bold uppercase text-slate-400">{file.heading}</p>
                      <p className="mt-1 text-sm font-bold text-slate-800">
                        {uploadedFiles[file.heading] || "No file selected"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <h3 className="font-extrabold text-slate-950">Declarations</h3>
                <div className="mt-4 grid gap-2 md:grid-cols-2">
                  {declarations.map((label) => (
                    <div key={label} className="flex items-center gap-2 rounded-xl bg-white p-3 text-sm font-bold text-slate-700">
                      <Check size={15} className={selectedDeclarations.includes(label) ? "text-primary" : "text-slate-300"} />
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <h3 className="font-extrabold text-slate-950">Reviewer Suggestions</h3>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-400">Reviewer name</p>
                    <p className="mt-1 text-sm font-bold text-slate-800">{displayValue(reviewer.name)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-400">Reviewer email</p>
                    <p className="mt-1 text-sm font-bold text-slate-800">{displayValue(reviewer.email)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-400">Institution</p>
                    <p className="mt-1 text-sm font-bold text-slate-800">{displayValue(reviewer.institution)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={goToPreviousStep}
              disabled={activeStep === 0}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            {!isFinalStep && (
              <button
                type="button"
                onClick={goToNextStep}
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
              >
                Next
              </button>
            )}
            {isFinalStep && (
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
              >
                <Send size={17} /> Submit
              </button>
            )}
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-extrabold text-slate-950">Submission Steps</h2>
            <div className="mt-4 space-y-3">
              {submissionSteps.map((step, index) => {
                const isCompleted = index < activeStep;
                const isActive = index === activeStep;

                return (
                  <div
                    key={step}
                    className={`flex items-center gap-3 rounded-xl p-3 transition-colors ${
                      isActive ? "bg-primary/10" : "bg-slate-50"
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-sm font-extrabold ${
                        isCompleted ? "bg-primary text-white" : "bg-primary/10 text-primary"
                      }`}
                    >
                      {isCompleted ? <Check size={16} strokeWidth={3} /> : index + 1}
                    </div>
                    <p className="text-sm font-bold text-slate-700">{step}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 shadow-sm">
            <CheckCircle2 size={22} className="text-emerald-700" />
            <h2 className="mt-3 font-extrabold text-emerald-950">Ready for Preview</h2>
            <p className="mt-2 text-sm leading-relaxed text-emerald-800">
              Final confirmation prepares the publication for editorial check.
            </p>
            <button
              type="button"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
            >
              <Send size={17} /> Submit Publication
            </button>
          </div> */}
        </aside>
      </div>
    </section>
  );
};

export default SubmitPublicationForm;
