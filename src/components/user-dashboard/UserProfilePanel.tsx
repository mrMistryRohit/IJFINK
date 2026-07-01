import { useState } from "react";
import { BookOpenCheck, Edit3, Eye, KeyRound, Mail, ShieldCheck, Upload, X } from "lucide-react";
import { userProfile } from "./userDashboardData";

const UserProfilePanel = () => {
  const [title, setTitle] = useState("Associate Professor, Department of Biology");
  const [bio, setBio] = useState(
    "Publisher and life science researcher focused on biotechnology, manuscript development and editorial collaboration."
  );
  const [profilePictureName, setProfilePictureName] = useState("Profile Picture");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftBio, setDraftBio] = useState(bio);
  const [draftProfilePictureName, setDraftProfilePictureName] = useState(profilePictureName);

  const openEditProfile = () => {
    setDraftTitle(title);
    setDraftBio(bio);
    setDraftProfilePictureName(profilePictureName);
    setIsEditOpen(true);
  };

  const saveProfileDetails = () => {
    setTitle(draftTitle);
    setBio(draftBio);
    setProfilePictureName(draftProfilePictureName);
    setIsEditOpen(false);
  };

  return (
    <section>
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">Profile</span>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Publisher Profile</h1>
        <p className="mt-1 text-sm text-slate-500">User account details, research area and password controls.</p>
      </div>

      <div className="space-y-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <h2 className="font-extrabold text-slate-950">Profile Details</h2>
            <button
              type="button"
              onClick={openEditProfile}
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
              <h3 className="mt-5 text-xl font-extrabold text-slate-950">{userProfile.name}</h3>
              <p className="text-sm font-bold text-primary">{userProfile.role}</p>
              <p className="mx-auto mt-5 w-fit rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600">
                {profilePictureName}
              </p>
            </div>

            <div className="space-y-5">
              <div className="grid gap-4 xl:grid-cols-3">
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

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <h3 className="font-extrabold text-slate-950">Personal Details</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">Full Name</label>
                    <input
                      value={userProfile.name}
                      readOnly
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-800 outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">Title</label>
                    <input
                      value={title}
                      readOnly
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-800 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-bold text-slate-700">Bio</label>
                    <textarea
                      rows={5}
                      value={bio}
                      readOnly
                      className="w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-700 outline-none"
                    />
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

      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Edit Profile</span>
                <h2 className="mt-1 text-xl font-extrabold text-slate-950">Profile Details</h2>
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

            <div className="space-y-4 p-5">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700">Profile Picture</span>
                <div className="flex flex-col gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-800">{draftProfilePictureName}</p>
                    <p className="mt-1 text-xs text-slate-500">Upload a new profile image</p>
                  </div>
                  <span className="inline-flex w-fit cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-primary/90">
                    <Upload size={15} /> Choose File
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) setDraftProfilePictureName(file.name);
                  }}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700">Title</span>
                <input
                  value={draftTitle}
                  onChange={(event) => setDraftTitle(event.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-800 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter your title"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700">Bio</span>
                <textarea
                  rows={5}
                  value={draftBio}
                  onChange={(event) => setDraftBio(event.target.value)}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-700 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Write a short professional bio"
                />
              </label>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 p-5">
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:border-primary hover:text-primary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveProfileDetails}
                className="rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary/90"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserProfilePanel;
