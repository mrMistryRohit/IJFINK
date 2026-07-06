import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, MessageSquareText, RefreshCcw, Send, Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { clearAuthSession } from "@/lib/authApi";
import {
  ApiError,
  getMyArticleDetails,
  getMyEditorialReviewDetails,
  submitArticleRevision,
  type UserArticleDetail,
  type UserEditorialReviewDetails,
} from "@/lib/userArticlesApi";

type DisplayFile = {
  file_id?: number;
  file_name?: string;
  file_type?: string;
  file_path?: string;
  version?: number;
  uploaded_at?: string;
};

const formatDateIST = (value?: string) => {
  if (!value) return "Unknown date";
  const parsed = new Date(value.replace(" ", "T"));
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }).format(parsed);
};

const normalizeKeywords = (keywords: UserArticleDetail["article"]["keywords"]) => {
  if (!keywords) return [];
  if (Array.isArray(keywords)) return keywords.map((keyword) => keyword.trim()).filter(Boolean);
  return keywords.split(",").map((keyword) => keyword.trim()).filter(Boolean);
};

const MySubmissionDetailsPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const detailsMatch = pathname.match(/^\/user\/my-submission(?:s)?\/(\d+)\/details$/);
  const revisionMatch = pathname.match(/^\/user\/my-submission(?:s)?\/revision\/revision-submission\/(\d+)(?:\/(\d+))?$/);
  const articleId = Number(detailsMatch?.[1] ?? revisionMatch?.[1]);
  const routeEditorialReviewId = revisionMatch?.[2] ? Number(revisionMatch[2]) : null;
  const isRevisionRoute = Boolean(revisionMatch);

  const [detail, setDetail] = useState<UserArticleDetail | null>(null);
  const [reviewData, setReviewData] = useState<UserEditorialReviewDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReviewLoading, setIsReviewLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [responseLetter, setResponseLetter] = useState("");
  const [revisionFile, setRevisionFile] = useState<File | null>(null);
  const [submittedRevisionFileName, setSubmittedRevisionFileName] = useState<string | null>(null);
  const [hasSubmittedRevision, setHasSubmittedRevision] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadArticle = async () => {
    if (!Number.isFinite(articleId)) {
      setError("Invalid article ID.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const articleDetail = await getMyArticleDetails(articleId);
      setDetail(articleDetail);
    } catch (caughtError) {
      if (caughtError instanceof ApiError && (caughtError.status === 401 || caughtError.status === 403)) {
        clearAuthSession();
        toast({ title: "Session expired", description: "Please sign in again to continue.", variant: "destructive" });
        window.location.href = "/login";
        return;
      }

      setError(caughtError instanceof Error ? caughtError.message : "Unable to load article details.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadEditorialReview = async () => {
    if (!Number.isFinite(articleId)) return;

    setIsReviewLoading(true);
    setReviewError(null);

    try {
      const editorialReviewDetail = await getMyEditorialReviewDetails(articleId);
      setReviewData(editorialReviewDetail);
    } catch (caughtError) {
      if (caughtError instanceof ApiError && caughtError.status === 404) {
        setReviewData(null);
        setReviewError("No editorial review available yet.");
        return;
      }

      if (caughtError instanceof ApiError && (caughtError.status === 401 || caughtError.status === 403)) {
        clearAuthSession();
        toast({ title: "Session expired", description: "Please sign in again to continue.", variant: "destructive" });
        window.location.href = "/login";
        return;
      }

      setReviewError(caughtError instanceof Error ? caughtError.message : "Unable to load editorial review details.");
    } finally {
      setIsReviewLoading(false);
    }
  };

  useEffect(() => {
    void loadArticle();
    void loadEditorialReview();
  }, [articleId]);

  const article = detail?.article ?? null;
  const coAuthors = detail?.co_authors ?? article?.co_authors ?? [];
  const files = (detail?.files ?? article?.files ?? []) as DisplayFile[];
  const screening = detail?.screening ?? article?.screening ?? null;
  const keywords = useMemo(() => normalizeKeywords(article?.keywords), [article?.keywords]);
  const currentReview = reviewData?.current_review ?? null;
  const reviewHistory = reviewData?.review_history ?? [];
  const articleStatus = reviewData?.article_status ?? article?.status ?? "";
  const editorialReviewId = routeEditorialReviewId ?? currentReview?.editorial_review_id ?? reviewHistory[0]?.editorial_review_id ?? null;
  const canSubmitRevision = isRevisionRoute && articleStatus === "Revision Requested" && Boolean(editorialReviewId);
  const revisionRoute = `/user/my-submissions/revision/revision-submission/${articleId}`;

  const handleSubmitRevision = async () => {
    if (!articleId || !canSubmitRevision) return;
    if (!responseLetter.trim()) {
      toast({ title: "Missing response letter", description: "Please enter a response letter for the editor.", variant: "destructive" });
      return;
    }
    if (!revisionFile) {
      toast({ title: "Missing file", description: "Please upload the revised manuscript file.", variant: "destructive" });
      return;
    }
    if (!editorialReviewId) {
      toast({ title: "Missing review reference", description: "The backend did not return an editorial review ID for this revision.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      await submitArticleRevision(articleId, { editorial_review_id: editorialReviewId, response_letter: responseLetter.trim() }, revisionFile);
      setHasSubmittedRevision(true);
      setSubmittedRevisionFileName(revisionFile.name);
      toast({ title: "Revision submitted", description: "Your revised manuscript has been sent successfully." });
      setResponseLetter("");
      setRevisionFile(null);
      void loadArticle();
      void loadEditorialReview();
    } catch (caughtError) {
      if (caughtError instanceof ApiError) {
        toast({ title: "Revision failed", description: caughtError.message, variant: "destructive" });
      } else {
        toast({ title: "Revision failed", description: caughtError instanceof Error ? caughtError.message : "Unable to submit revision.", variant: "destructive" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm">Loading article details...</div>;

  if (error && !article) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-rose-700">Unable to load details</p>
            <p className="mt-2 text-sm text-slate-700">{error}</p>
          </div>
          <button type="button" onClick={() => void loadArticle()} className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white"><RefreshCcw size={16} /> Retry</button>
        </div>
      </div>
    );
  }

  if (!article) return <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm">No article details were returned.</div>;

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Article Details</span>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-950">{article.title}</h1>
          <p className="mt-1 text-sm text-slate-500">Article ID {article.article_id} - {article.subject_area || "General"}</p>
        </div>
        <Link to="/user/my-submissions" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-primary hover:text-primary"><ArrowLeft size={16} /> Back to submissions</Link>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.35fr_0.95fr]">
        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Abstract</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">{article.abstract || "No abstract was returned."}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Article Type</p><p className="mt-2 font-bold text-slate-900">{article.article_type || "Not provided"}</p></div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Status</p><p className="mt-2 font-bold text-slate-900">{articleStatus || "Not provided"}</p></div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Submitted</p><p className="mt-2 font-bold text-slate-900">{formatDateIST(article.submitted_at)}</p></div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Updated</p><p className="mt-2 font-bold text-slate-900">{formatDateIST(article.updated_at || article.submitted_at)}</p></div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Keywords</h2>
            <div className="mt-3 flex flex-wrap gap-2">{keywords.length ? keywords.map((keyword) => <span key={keyword} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{keyword}</span>) : <p className="text-sm text-slate-500">No keywords returned.</p>}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Editorial Review</h2>
            {isReviewLoading ? <p className="mt-4 text-sm text-slate-500">Loading editorial review...</p> : null}
            {!isReviewLoading && reviewError ? <p className="mt-4 text-sm text-slate-500">{reviewError}</p> : null}
            {!isReviewLoading && currentReview && (
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Decision</p><p className="mt-2 font-semibold text-slate-900">{currentReview.decision || "Not available"}</p></div>
                <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Reviewed</p><p className="mt-2 font-semibold text-slate-900">{formatDateIST(currentReview.reviewed_at)}</p></div>
                <div className="rounded-xl bg-slate-50 p-4 md:col-span-2"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Editorial review ID</p><p className="mt-2 font-semibold text-slate-900">{currentReview.editorial_review_id ?? editorialReviewId ?? "Not available"}</p></div>
              </div>
            )}
            {!isReviewLoading && currentReview && (
              <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Editor comment</p><p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-700">{currentReview.comments || "No editor comment was returned for this revision request."}</p></div>
            )}
            {!isReviewLoading && reviewHistory.length > 1 && (
              <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Review history</p><div className="mt-3 space-y-3">{reviewHistory.slice(1).map((review, index) => <div key={`${review.editorial_review_id ?? index}`} className="rounded-xl border border-white bg-white p-3 text-sm text-slate-700 shadow-sm"><p className="font-bold text-slate-900">{review.decision || "Review"}</p><p className="mt-1 whitespace-pre-wrap leading-6">{review.comments || "No comments available."}</p><p className="mt-2 text-xs text-slate-500">Reviewed {formatDateIST(review.reviewed_at)}</p></div>)}</div></div>
            )}
          </div>
        </div>
        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">People</h2>
            <div className="mt-4 space-y-4 text-sm">
              <div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Author</p><p className="mt-1 font-semibold text-slate-900">{detail?.author?.display_name || [detail?.author?.first_name, detail?.author?.last_name].filter(Boolean).join(" ") || [article.first_name, article.last_name].filter(Boolean).join(" ") || article.email || "Author unavailable"}</p>{(detail?.author?.email || article.email) && <p className="mt-1 text-slate-600">{detail?.author?.email || article.email}</p>}{(detail?.author?.institution || article.institution) && <p className="mt-1 text-slate-600">{detail?.author?.institution || article.institution}</p>}</div>
              <div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Co-authors</p><div className="mt-2 space-y-2">{coAuthors.length ? coAuthors.map((coAuthor, index) => <div key={`${coAuthor.email || coAuthor.full_name || index}-${index}`} className="rounded-xl border border-slate-100 bg-slate-50 p-3"><p className="font-semibold text-slate-900">{coAuthor.full_name || coAuthor.email || `Co-author ${index + 1}`}</p><p className="mt-1 text-xs text-slate-600">{coAuthor.email || "No email"}</p><p className="mt-1 text-xs text-slate-600">{coAuthor.institution || "No institution"}</p><p className="mt-1 text-xs text-slate-600">ORCID: {coAuthor.orcid || "Not provided"}</p></div>) : <p className="text-sm text-slate-600">No co-authors listed</p>}</div></div>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Files</h2><div className="mt-3 space-y-3">{files.length ? files.map((file, index) => <div key={`${file.file_id ?? index}`} className="rounded-xl border border-slate-100 bg-slate-50 p-4"><p className="font-semibold text-slate-900">{file.file_name || "Attachment"}</p><p className="mt-1 text-xs text-slate-600">{file.file_type || "File"}{file.version ? ` | Version ${file.version}` : ""}</p><p className="mt-1 text-xs text-slate-600">{file.file_path || file.file_url || "No file path returned"}</p></div>) : <p className="text-sm text-slate-500">No files were returned for this article.</p>}</div></div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Screening</h2>{screening ? <div className="mt-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-700"><p className="font-semibold text-slate-900">{screening.decision || screening.status || "Screening record"}</p><p className="mt-1">{screening.remarks || "No screening remarks returned."}</p></div> : <p className="mt-3 text-sm text-slate-500">No screening record was returned for this article.</p>}</div>
          {articleStatus === "Revision Requested" && !isRevisionRoute ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="font-bold text-slate-900">Ready for revision</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">This article is marked Revision Requested. Open the revision submission page to upload the corrected manuscript.</p>
              <button
                type="button"
                disabled={!editorialReviewId}
                onClick={() => editorialReviewId && navigate(revisionRoute)}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                <MessageSquareText size={16} /> Open revision submission
              </button>
            </div>
          ) : null}
          {isRevisionRoute ? (
            canSubmitRevision ? (
              hasSubmittedRevision ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 text-emerald-600" size={20} />
                    <div>
                      <p className="font-bold text-emerald-900">Revision submitted</p>
                      <p className="mt-2 text-sm leading-7 text-emerald-900/80">Your revised manuscript has been submitted successfully.</p>
                      {submittedRevisionFileName ? <p className="mt-3 text-sm font-semibold text-emerald-900">Submitted file: {submittedRevisionFileName}</p> : null}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-2"><MessageSquareText size={18} className="text-primary" /><h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Revision Submission</h2></div>
                  <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">Response letter</span><textarea rows={5} className="w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20" value={responseLetter} onChange={(event) => setResponseLetter(event.target.value)} placeholder="Explain how you addressed the editor's comments..." /></label>
                  <label className="mt-4 block rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center transition-colors hover:border-primary hover:bg-primary/5"><input type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="hidden" onChange={(event) => setRevisionFile(event.target.files?.[0] ?? null)} /><Upload size={22} className="mx-auto text-primary" /><span className="mt-2 block text-sm font-bold text-slate-700">{revisionFile ? revisionFile.name : "Revised manuscript file"}</span><span className="mt-1 block text-xs text-slate-400">Upload the corrected manuscript required by the backend API</span></label>
                  <button type="button" onClick={() => void handleSubmitRevision()} disabled={isSubmitting} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"><Send size={16} /> {isSubmitting ? "Submitting..." : "Submit Revision"}</button>
                </div>
              )
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="font-bold text-slate-900">Revision unavailable</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">A valid editorial review ID is required before the revision form can be used.</p>
              </div>
            )
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default MySubmissionDetailsPage;
