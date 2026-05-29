import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  CheckCircle2,
  Eye,
  FileText,
  LockKeyhole,
  Mail,
  PenLine,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div className="h-screen overflow-hidden bg-[hsl(220,55%,10%)]">
      {/* <Navbar /> */}

      <main className="relative h-full overflow-hidden">
        <section className="relative flex h-full items-center bg-gradient-to-br from-[hsl(220,55%,10%)] via-[hsl(220,48%,13%)] to-[hsl(168,55%,14%)] px-4 py-8">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-0 left-16 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="container relative z-10 mx-auto max-w-6xl">
            <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/20 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-primary/10">
                  <LockKeyhole size={13} /> Secure Access
                </span>
                <h1 className="mb-5 max-w-xl text-4xl font-extrabold leading-[0.95] text-white md:text-6xl">
                  Login to{" "}
                  <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                    IJFINK
                  </span>
                </h1>
                <p className="max-w-lg text-lg leading-relaxed text-white/70">
                  Role-based access for authors, readers, reviewers, editors and administrators
                </p>
                <div className="mt-8 grid max-w-lg grid-cols-2 gap-3">
                  {["Editorial workflow", "Reviewer access", "Publishing tools", "User dashboard"].map((item) => (
                    <div key={item} className="flex min-h-14 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.07] px-4 py-3 text-sm font-semibold text-white/85 shadow-sm backdrop-blur-sm">
                      <CheckCircle2 size={15} className="flex-shrink-0 text-emerald-300" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.08 }}
                className="mx-auto w-full max-w-xl rounded-2xl border border-white/20 bg-white p-6 shadow-2xl shadow-slate-950/30 md:p-8"
              >
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">Account Access</span>
                  <h2 className="mt-2 text-2xl font-extrabold leading-tight text-slate-950 md:text-3xl">Sign In to Your Account</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    Enter your credentials to fully access your account.
                  </p>
                </div>
                <form className="space-y-4" onSubmit={handleLogin}>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                      <input
                        type="email"
                        placeholder="name@institution.edu"
                        className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">Password</label>
                    <div className="relative">
                      <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                      <input
                        type="password"
                        placeholder="Enter your password"
                        className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-11 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
                      />
                      <Eye className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 pt-1 text-sm">
                    <label className="flex items-center gap-2 font-medium text-slate-600">
                      <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" />
                      Remember me
                    </label>
                    <button type="button" className="font-bold text-primary hover:text-primary/80">
                      Forgot password?
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.99]"
                  >
                    <UserRound size={17} /> Login
                  </button>
                  <p className="pt-1 text-center text-sm text-slate-500">
                    Don&apos;t have an account?{" "}
                    <Link to="/register" className="font-bold text-primary hover:text-primary/80">
                      Register now
                    </Link>
                  </p>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default Login;
