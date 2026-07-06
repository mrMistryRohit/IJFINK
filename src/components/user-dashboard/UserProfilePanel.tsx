import { useState } from "react";
import { BookOpenCheck, Edit3, Eye, KeyRound, Mail, ShieldCheck, Upload, X } from "lucide-react";
import type { AuthorProfile } from "./types";

type UserProfilePanelProps = {
  profile: AuthorProfile | null;
};

const UserProfilePanel = ({ profile }: UserProfilePanelProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const displayName = profile?.display_name?.trim() || profile?.email || "Author";
  const role = profile?.role || "Author";

  return (
    <section>
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">Profile</span>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Author Profile</h1>
      </div>

      <div className="space-y-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <h2 className="font-extrabold text-slate-950">Profile Details</h2>
            <button
              type="button"
              onClick={() => setIsEditOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-primary hover:text-primary"
            >
              <Edit3 size={15} /> Edit
            </button>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[0.32fr_1fr]">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-primary/10 text-primary ring-8 ring-white">
                <ShieldCheck size={44} />
              </div>
              <h3 className="mt-5 text-xl font-extrabold text-slate-950">{displayName}</h3>
              <p className="text-sm font-bold text-primary">{role}</p>
              <p className="mx-auto mt-5 w-fit rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600">
                {profile?.status ?? "Unknown status"}
              </p>
            </div>

            <div className="space-y-5">
              <div className="grid gap-4 xl:grid-cols-3">
                {[
                  { label: "Email", value: profile?.email ?? "Not available", icon: Mail },
                  { label: "Profile ID", value: profile?.profile_id ? String(profile.profile_id) : "Not available", icon: BookOpenCheck },
                  { label: "User ID", value: profile?.user_id ? String(profile.user_id) : "Not available", icon: Eye },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <item.icon size={18} className="text-primary" />
                    <p className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-400">{item.label}</p>
                    <p className="mt-1 font-bold text-slate-800">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <h3 className="font-extrabold text-slate-950">Available author metadata</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">Display Name</label>
                    <input value={displayName} readOnly className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-800 outline-none" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">Role</label>
                    <input value={role} readOnly className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-800 outline-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <KeyRound size={18} className="text-primary" />
            <h2 className="font-extrabold text-slate-950">Change Password</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {["Current password", "New password", "Confirm password"].map((label) => (
              <div key={label}>
                <label className="mb-2 block text-sm font-bold text-slate-700">{label}</label>
                <input type="password" placeholder="Enter password" className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </div>
            ))}
          </div>
          <button type="button" className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90">
            <KeyRound size={17} /> Update Password
          </button>
        </div>
      </div>

      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Edit Profile</span>
                <h2 className="mt-1 text-xl font-extrabold text-slate-950">Read-only backend profile</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-colors hover:border-primary hover:text-primary"
                aria-label="Close edit profile"
              >
                <X size={17} />
              </button>
            </div>
            <div className="p-5 text-sm text-slate-600">The documented author API does not provide a profile update endpoint, so this screen stays read-only.</div>
            <div className="flex justify-end border-t border-slate-100 p-5">
              <button type="button" onClick={() => setIsEditOpen(false)} className="rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white">Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserProfilePanel;
