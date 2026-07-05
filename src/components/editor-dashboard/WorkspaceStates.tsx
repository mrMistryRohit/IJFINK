import { LoaderCircle, RefreshCw } from "lucide-react";

export const WorkspaceLoading = () => <div className="flex min-h-56 items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white text-sm font-bold text-slate-500"><LoaderCircle size={20} className="animate-spin text-primary" /> Loading current data...</div>;

export const WorkspaceError = ({ message, onRetry }: { message: string; onRetry: () => void }) => <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center"><p className="font-bold text-rose-700">{message}</p><button type="button" onClick={onRetry} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-sm font-bold text-white"><RefreshCw size={16} /> Try again</button></div>;
