import { Plus, X } from "lucide-react";
import type { NewPrivilegedUser, UserRole } from "./types";

type CreateUserModalProps = {
  createUserError: string;
  newUser: NewPrivilegedUser;
  onClose: () => void;
  onCreateUser: () => void;
  onNewUserChange: (user: NewPrivilegedUser) => void;
};

const CreateUserModal = ({ createUserError, newUser, onClose, onCreateUser, onNewUserChange }: CreateUserModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-md">
      <div className="w-full max-w-2xl rounded-2xl border border-white/45 bg-white/85 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-xl md:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Create User</span>
            <h3 className="mt-2 text-2xl font-extrabold text-slate-950">Admin, Editor or Reviewer</h3>
            <p className="mt-1 text-sm text-slate-500">Add a privileged account for the journal workspace.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-500 transition-colors hover:border-primary hover:text-primary"
            aria-label="Close create user popup"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">User type</label>
            <select
              value={newUser.role}
              onChange={(event) => onNewUserChange({ ...newUser, role: event.target.value as Exclude<UserRole, "User"> })}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white/90 px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option>Admin</option>
              <option>Editor</option>
              <option>Reviewer</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">User name</label>
            <input
              value={newUser.name}
              onChange={(event) => onNewUserChange({ ...newUser, name: event.target.value })}
              placeholder="Enter full name"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white/90 px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-bold text-slate-700">Email</label>
            <input
              value={newUser.email}
              onChange={(event) => onNewUserChange({ ...newUser, email: event.target.value })}
              type="email"
              placeholder="Enter email address"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white/90 px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">Password</label>
            <input
              value={newUser.password}
              onChange={(event) => onNewUserChange({ ...newUser, password: event.target.value })}
              type="password"
              placeholder="Enter password"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white/90 px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">Confirm password</label>
            <input
              value={newUser.confirmPassword}
              onChange={(event) => onNewUserChange({ ...newUser, confirmPassword: event.target.value })}
              type="password"
              placeholder="Confirm password"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white/90 px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {createUserError && (
          <div className="mt-4 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">
            {createUserError}
          </div>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/80 px-5 py-3 text-sm font-bold text-slate-700 transition-colors hover:border-primary hover:text-primary"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onCreateUser}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
          >
            <Plus size={17} /> Create User
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateUserModal;
