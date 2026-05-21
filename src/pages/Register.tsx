import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BadgeCheck,
  BookOpenCheck,
  Building2,
  FileUp,
  LockKeyhole,
  Mail,
  Phone,
  UserPlus,
  UserRound,
} from "lucide-react";

const userBenefits = [
  "Read published journal articles",
  "Submit and publish research papers",
  "Track manuscript status",
  "Receive editorial updates",
];

const Register = () => {
  return (
    <div className="h-screen overflow-hidden bg-[hsl(220,55%,10%)]">
      {/* <Navbar /> */}

      <main className="h-full overflow-hidden">
        <section className="relative flex h-full items-center overflow-hidden bg-gradient-to-br from-[hsl(220,55%,10%)] via-[hsl(220,48%,13%)] to-[hsl(168,55%,14%)] px-4 py-6">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="absolute left-0 top-10 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="container relative z-10 mx-auto max-w-6xl">
            <div className="grid items-center gap-8 lg:grid-cols-[1.02fr_0.98fr]">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="order-2 lg:order-1"
              >
                <div className="rounded-2xl border border-white/20 bg-white p-5 shadow-2xl shadow-slate-950/30 md:p-6">
                  <div className="mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">User Registration</span>
                    <h1 className="mt-2 text-2xl font-extrabold leading-tight text-slate-950 md:text-3xl">Create Your User Account</h1>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">
                      Register as a user to read journal content and publish your research.
                    </p>
                  </div>

                  <form className="space-y-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-bold text-slate-700">First Name</label>
                        <div className="relative">
                          <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                          <input
                            type="text"
                            placeholder="First name"
                            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-bold text-slate-700">Last Name</label>
                        <input
                          type="text"
                          placeholder="Last name"
                          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-bold text-slate-700">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                        <input
                          type="email"
                          placeholder="name@institution.edu"
                          className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
                        />
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-bold text-slate-700">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                          <input
                            type="tel"
                            placeholder="+91 00000 00000"
                            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-bold text-slate-700">Institution</label>
                        <div className="relative">
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                          <input
                            type="text"
                            placeholder="University / Organization"
                            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-bold text-slate-700">Password</label>
                        <div className="relative">
                          <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                          <input
                            type="password"
                            placeholder="Create password"
                            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-bold text-slate-700">Confirm Password</label>
                        <input
                          type="password"
                          placeholder="Confirm password"
                          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
                        />
                      </div>
                    </div>

                    <label className="flex items-start gap-3 rounded-xl bg-slate-50 p-3 text-sm leading-relaxed text-slate-600">
                      <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" />
                      <span>I confirm that the information provided is accurate and I want to register as a user.</span>
                    </label>

                    <button
                      type="submit"
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.99]"
                    >
                      <UserPlus size={17} /> Register User Account
                    </button>
                    <p className="text-center text-sm text-slate-500">
                      Already have an account?{" "}
                      <Link to="/login" className="font-bold text-primary hover:text-primary/80">
                        Login
                      </Link>
                    </p>
                  </form>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.08 }}
                className="order-1 lg:order-2"
              >
                <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/20 px-4 py-2 text-xs font-bold uppercase tracking-widest text-amber-200 shadow-lg shadow-amber-950/10">
                  <BookOpenCheck size={13} /> Reader + Publisher Access
                </span>
                <h2 className="mb-5 max-w-xl text-4xl font-extrabold leading-[0.95] text-white md:text-6xl">
                  Join the{" "}
                  <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                    Research Community
                  </span>
                </h2>
                <p className="max-w-lg text-lg leading-relaxed text-white/70">
                  A clean user registration page for researchers, readers and authors who want access to the publishing portal.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {userBenefits.map((benefit) => (
                    <div key={benefit} className="flex min-h-14 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.07] px-4 py-3 text-sm font-semibold text-white/85 shadow-sm backdrop-blur-sm">
                      <BadgeCheck size={17} className="flex-shrink-0 text-emerald-300" />
                      {benefit}
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.07] p-4 shadow-sm backdrop-blur-sm">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/20 text-emerald-300">
                    <FileUp size={20} />
                  </div>
                  <h3 className="font-bold text-white">Built for authors</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/60">
                    After registration, users can be connected to manuscript submission and article access workflows when you are ready.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default Register;
