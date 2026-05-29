import { BookOpenCheck, Eye, KeyRound, Mail, ShieldCheck } from "lucide-react";
import { userProfile } from "./userDashboardData";

const UserProfilePanel = () => {
  return (
    <section>
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">Profile</span>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Publisher Profile</h1>
        <p className="mt-1 text-sm text-slate-500">User account details, research area and password controls.</p>
      </div>

      <div className="space-y-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-extrabold text-slate-950">Profile Details</h2>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ShieldCheck size={34} />
            </div>
            <h3 className="mt-4 text-xl font-extrabold text-slate-950">{userProfile.name}</h3>
            <p className="text-sm font-bold text-primary">{userProfile.role}</p>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {[
              { label: "Email", value: userProfile.email, icon: Mail },
              { label: "Research Area", value: userProfile.researchArea, icon: BookOpenCheck },
              { label: "Joined", value: userProfile.joined, icon: Eye },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <item.icon size={18} className="text-primary" />
                <p className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-400">{item.label}</p>
                <p className="mt-1 font-bold text-slate-800">{item.value}</p>
              </div>
            ))}
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
                <input
                  type="password"
                  placeholder="Enter password"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
          >
            <KeyRound size={17} /> Update Password
          </button>
        </div>
      </div>
    </section>
  );
};

export default UserProfilePanel;

