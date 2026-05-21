import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Upload, FileText, CheckCircle2, Clock, Shield, Globe,
  ArrowRight, ChevronRight, BookOpen, AlertCircle, Users, Star
} from "lucide-react";

const steps = [
  { step: "01", title: "Prepare Your Manuscript", desc: "Format your paper according to our author guidelines. Use the provided Word or LaTeX template. Ensure all figures are high-resolution (≥300 dpi).", icon: FileText },
  { step: "02", title: "Create an Account", desc: "Register on our submission portal (or log in if you already have an account). You'll receive a confirmation email immediately.", icon: Users },
  { step: "03", title: "Submit Online", desc: "Upload your manuscript, cover letter and supplementary materials through our secure portal. Fill in author details and suggest potential reviewers.", icon: Upload },
  { step: "04", title: "Editorial Check", desc: "Our editorial office performs an initial check for scope and formatting within 3–5 business days and assigns a handling editor.", icon: Shield },
  { step: "05", title: "Peer Review", desc: "Your manuscript undergoes rigorous double-blind peer review by 2–3 domain experts. Average review time: 4–6 weeks.", icon: CheckCircle2 },
  { step: "06", title: "Decision & Publication", desc: "Receive an editorial decision with detailed reviewer comments. Accepted articles are published within 2 weeks of final acceptance.", icon: Globe },
];

const requirements = [
  { title: "Original Research Articles", items: ["3,000–8,000 words (excl. references)", "Structured abstract (250 words max)", "Up to 8 figures/tables", "Max 60 references"] },
  { title: "Review Articles", items: ["5,000–12,000 words", "Unstructured abstract (300 words max)", "Up to 15 figures/tables", "Max 150 references"] },
  { title: "Case Reports", items: ["1,500–3,000 words", "Structured abstract (200 words max)", "Up to 5 figures", "Max 30 references"] },
  { title: "Rapid Communications", items: ["1,000–2,500 words", "Unstructured abstract (150 words max)", "Up to 3 figures", "Max 20 references"] },
];

const fees = [
  { region: "High-Income Countries", apc: "₹00.00 INR", note: "Standard APC" },
  { region: "Middle-Income Countries", apc: "₹00.00 INR", note: "50% discount available" },
  { region: "Low-Income Countries", apc: "Waiver", note: "Full waiver on application" },
];

const SubmitPaper = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(220,55%,10%)] via-[hsl(220,48%,13%)] to-[hsl(168,55%,14%)] pt-32 pb-24 px-4">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
        <div className="absolute right-10 top-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto relative z-10 max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
              <Upload size={12} /> Submit Your Manuscript
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-5 leading-tight">
              Share Your Research{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                With the World
              </span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-10">
              Join hundreds of researchers who have published their discoveries in our peer-reviewed, open-access journal. Fast turnaround, global reach.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#submit-form"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all hover:shadow-xl hover:shadow-primary/30 text-base"
              >
                <Upload size={18} /> Start Submission
              </a>
              <a
                href="#guidelines"
                className="inline-flex items-center gap-2 border border-white/25 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors text-base"
              >
                Author Guidelines
              </a>
            </div>
          </motion.div>
        </div>

        {/* Quick stats */}
        <div className="container mx-auto mt-14 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { val: "0", label: "Average Review Time" },
              { val: "0", label: "Post-Acceptance Publication" },
              { val: "0", label: "Global Citations" },
              { val: "Free", label: "APC Waivers Available" },
            ].map((s) => (
              <div key={s.label} className="text-center bg-white/[0.07] border border-white/10 rounded-2xl py-4 px-3">
                <div className="text-2xl font-extrabold text-white">{s.val}</div>
                <div className="text-xs text-white/50 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submission Process */}
      <section id="guidelines" className="section-padding bg-slate-50">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-primary mb-3 block">Step by Step</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Submission Process</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Follow these six steps to successfully submit and publish your research.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl border border-slate-100 card-shadow p-6 hover:elevated-shadow transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl font-extrabold text-primary/20 font-mono">{s.step}</div>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <s.icon size={18} className="text-primary" />
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Article types */}
      <section className="section-padding bg-white">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest uppercase text-primary mb-3 block">We Publish</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Article Types & Requirements</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-5">
            {requirements.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="border-2 border-slate-100 rounded-2xl p-6 hover:border-primary/30 transition-colors group"
              >
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <BookOpen size={16} className="text-primary" /> {r.title}
                </h3>
                <ul className="space-y-2">
                  {r.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                      <ChevronRight size={14} className="text-primary flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* APC / Fees */}
      <section className="section-padding bg-slate-50">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest uppercase text-primary mb-3 block">Transparent Pricing</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Article Processing Charges</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              We believe in equitable access to publishing. Our tiered pricing ensures researchers from all regions can publish their work.
            </p>
          </motion.div>
          <div className="space-y-4">
            {fees.map((f, i) => (
              <motion.div
                key={f.region}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`flex items-center justify-between p-5 rounded-2xl border ${i === 0 ? "bg-white border-slate-100 card-shadow" : i === 2 ? "bg-emerald-50 border-emerald-200" : "bg-white border-slate-100 card-shadow"}`}
              >
                <div>
                  <div className="font-bold text-slate-800">{f.region}</div>
                  <div className="text-sm text-slate-500">{f.note}</div>
                </div>
                <div className={`text-xl font-extrabold ${i === 2 ? "text-emerald-600" : "text-slate-900"}`}>{f.apc}</div>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 flex items-start gap-2 text-sm text-slate-500 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p>APC waivers and discounts are available upon request. Contact us at <strong>contact@inkyourjournal.com</strong> before submitting if you need assistance.</p>
          </div>
        </div>
      </section>

      {/* Submit Form CTA */}
      <section id="submit-form" className="section-padding bg-gradient-to-br from-slate-900 to-[hsl(168,45%,10%)]">
        <div className="container mx-auto max-w-2xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Upload size={28} className="text-emerald-400" />
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-4">Ready to Submit?</h2>
            <p className="text-white/65 mb-8 leading-relaxed">
              Our online submission portal makes it easy to upload your manuscript, cover letter and supplementary materials in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all hover:shadow-xl hover:shadow-primary/30"
              >
                <Upload size={18} /> Go to Submission Portal
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors"
              >
                Ask a Question
              </Link>
            </div>
            <p className="text-white/40 text-xs mt-6">
              By submitting, you confirm that the work is original, not published elsewhere and that all co-authors have approved the submission.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SubmitPaper;
