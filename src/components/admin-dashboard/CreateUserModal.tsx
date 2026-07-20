import { Eye, EyeOff, Plus, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import type { NewPrivilegedUser } from "./types";

type CreateUserModalProps = {
  createUserError: string;
  newUser: NewPrivilegedUser;
  isCreating: boolean;
  onClose: () => void;
  onCreateUser: () => void;
  onNewUserChange: (user: NewPrivilegedUser) => void;
};

const CreateUserModal = ({ createUserError, newUser, isCreating, onClose, onCreateUser, onNewUserChange }: CreateUserModalProps) => {
  const requiresInstitution = newUser.role === "Editor" || newUser.role === "Chief Editor";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCreateUser();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-md">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/45 bg-white/85 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-xl md:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Create User</span>
            <h3 className="mt-2 text-2xl font-extrabold text-slate-950">Create Privileged User</h3>
            <p className="mt-1 text-sm text-slate-500">Add a privileged account for the journal workspace.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isCreating}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-500 transition-colors hover:border-primary hover:text-primary"
            aria-label="Close create user popup"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-bold text-slate-700">User type</label>
            <select
              value={newUser.role}
              onChange={(event) => onNewUserChange({ ...newUser, role: event.target.value as NewPrivilegedUser["role"] })}
              disabled={isCreating}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white/90 px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option>Admin</option>
              <option>Editor</option>
              <option>Chief Editor</option>
              <option>Publication Team</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">First name</label>
            <input
              value={newUser.firstName}
              onChange={(event) => onNewUserChange({ ...newUser, firstName: event.target.value })}
              placeholder="Enter first name"
              required
              autoComplete="given-name"
              disabled={isCreating}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white/90 px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">Last name</label>
            <input
              value={newUser.lastName}
              onChange={(event) => onNewUserChange({ ...newUser, lastName: event.target.value })}
              placeholder="Enter last name"
              required
              autoComplete="family-name"
              disabled={isCreating}
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
              required
              autoComplete="email"
              disabled={isCreating}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white/90 px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          {requiresInstitution && (
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-bold text-slate-700">Institution</label>
              <input
                value={newUser.institution}
                onChange={(event) => onNewUserChange({ ...newUser, institution: event.target.value })}
                placeholder="Enter institution name"
                required
                autoComplete="organization"
                disabled={isCreating}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white/90 px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          )}
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">Password</label>
            <div className="relative">
            <input
              value={newUser.password}
              onChange={(event) => onNewUserChange({ ...newUser, password: event.target.value })}
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              required
              autoComplete="new-password"
              disabled={isCreating}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white/90 pl-4 pr-11 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary" aria-label={showPassword ? "Hide password" : "Show password"}>
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">Confirm password</label>
            <div className="relative">
            <input
              value={newUser.confirmPassword}
              onChange={(event) => onNewUserChange({ ...newUser, confirmPassword: event.target.value })}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              required
              autoComplete="new-password"
              disabled={isCreating}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white/90 pl-4 pr-11 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <button type="button" onClick={() => setShowConfirmPassword((value) => !value)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary" aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}>
              {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
            </div>
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
            disabled={isCreating}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/80 px-5 py-3 text-sm font-bold text-slate-700 transition-colors hover:border-primary hover:text-primary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isCreating}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
          >
            <Plus size={17} /> {isCreating ? "Creating..." : `Create ${newUser.role}`}
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
