import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  BookOpen, FileText, Clock, Globe, ShieldCheck, Star, Download,
  ArrowRight, Calendar, User, ExternalLink, CheckCircle2, Layers,
  Award, TrendingUp, Users, Microscope, HeartPulse, FlaskConical,
  Brain, Leaf, Pill, Search, Filter, AlertCircle, FileCheck, BarChart3, Target
} from "lucide-react";
import mockupImg from "@/assets/life-science-mockup.png";

const journalStats = [
  { label: "CiteScore", value: "0", icon: Star, color: "from-amber-400 to-orange-500" },
  { label: "Impact Factor", value: "0", icon: TrendingUp, color: "from-emerald-400 to-teal-500" },
  { label: "Total Citations", value: "0", icon: BookOpen, color: "from-blue-400 to-indigo-500" },
  { label: "Global Authors", value: "0", icon: Users, color: "from-purple-400 to-pink-500" },
];

const publishedArticles = [
  {
    title: "CRISPR-Cas9 Mediated Gene Therapy for Sickle Cell Disease: A Comprehensive Review",
    authors: "Mitchell, S., Chen, J., & Taylor, R.",
    date: "March 2026",
    category: "Biotechnology",
    volume: "Vol 8, Issue 3",
    abstract: "This review examines the recent advances in CRISPR-Cas9 based gene editing approaches for treating sickle cell disease, including clinical trial outcomes and future therapeutic prospects.",
    doi: "10.xxxx/bsj.2026.0301",
  },
  {
    title: "Novel Biomarkers for Early Detection of Alzheimer's Disease Using Machine Learning",
    authors: "Gonzalez, M., Patel, A., & Okafor, M.",
    date: "February 2026",
    category: "Neuroscience",
    volume: "Vol 8, Issue 2",
    abstract: "We present a computational framework integrating proteomic and metabolomic data to identify novel biomarkers enabling early-stage Alzheimer's diagnosis with 94% accuracy.",
    doi: "10.xxxx/bsj.2026.0218",
  },
  {
    title: "Antimicrobial Resistance Patterns in Southeast Asian Hospital Settings",
    authors: "Taylor, R., Chen, J., & Mitchell, S.",
    date: "January 2026",
    category: "Healthcare",
    volume: "Vol 8, Issue 1",
    abstract: "A large-scale epidemiological study analyzing antimicrobial resistance trends across 45 hospitals in Southeast Asia, revealing critical patterns for public health policy.",
    doi: "10.xxxx/bsj.2026.0112",
  },
  {
    title: "Sustainable Biofuel Production from Marine Microalgae: Process Optimization",
    authors: "Okafor, M., Gonzalez, M., & Patel, A.",
    date: "December 2025",
    category: "Environmental Biology",
    volume: "Vol 7, Issue 12",
    abstract: "Optimized cultivation and extraction protocols for biofuel production from marine microalgae species, achieving 40% higher yield than conventional methods.",
    doi: "10.xxxx/bsj.2025.1205",
  },
  {
    title: "Targeted Nanoparticle Drug Delivery Systems for Pancreatic Cancer",
    authors: "Patel, A., Taylor, R., & Mitchell, S.",
    date: "November 2025",
    category: "Pharmacy",
    volume: "Vol 7, Issue 11",
    abstract: "Development and characterization of pH-responsive nanoparticle drug delivery systems showing enhanced therapeutic efficacy in pancreatic cancer models.",
    doi: "10.xxxx/bsj.2025.1108",
  },
  {
    title: "Epigenetic Modifications in Stem Cell Differentiation: New Insights",
    authors: "Chen, J., Gonzalez, M., & Okafor, M.",
    date: "October 2025",
    category: "Biochemistry",
    volume: "Vol 7, Issue 10",
    abstract: "Novel findings on how epigenetic modifications regulate stem cell fate decisions, with implications for regenerative medicine and tissue engineering applications.",
    doi: "10.xxxx/bsj.2025.1001",
  },
];

const categoryColors: Record<string, string> = {
  Biotechnology: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Neuroscience: "bg-purple-100 text-purple-700 border-purple-200",
  Healthcare: "bg-blue-100 text-blue-700 border-blue-200",
  "Environmental Biology": "bg-green-100 text-green-700 border-green-200",
  Pharmacy: "bg-amber-100 text-amber-700 border-amber-200",
  Biochemistry: "bg-rose-100 text-rose-700 border-rose-200",
};

const features = [
  { icon: ShieldCheck, title: "Double-Blind Peer Review", desc: "All manuscripts undergo rigorous double-blind review by 2–3 international domain experts." },
  { icon: Globe, title: "Open Access", desc: "Published articles are immediately and permanently free to read, download and share worldwide." },
  { icon: Clock, title: "Rapid Review", desc: "Average 4–6 week turnaround from submission to first editorial decision." },
  { icon: Download, title: "Multiple Formats", desc: "Articles available as full-text HTML, downloadable PDF and XML for automated indexing." },
  { icon: Award, title: "Indexed & Cited", desc: "Indexed in Scopus, Web of Science, PubMed and CrossRef with a DOI for every article." },
  { icon: Layers, title: "All Article Types", desc: "Original research, review articles, case reports, letters and rapid communications." },
];

const volumes = [
  { vol: "Volume 0", year: "2026", issues: 0, articles: 0 },
  // { vol: "Volume 0", year: "2025", issues: 0, articles: 0 },
  // { vol: "Volume 0", year: "2024", issues: 0, articles: 0 },
  // { vol: "Volume 0", year: "2023", issues: 0, articles: 0 },
];

const Journal = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const tabs = ["Articles & Issues", "About the Journal", "Author Guidelines", "Volumes & Issues"];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(200,25%,8%)] via-[hsl(168,40%,12%)] to-[hsl(200,30%,10%)] pt-28 pb-0">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center pb-12">
            {/* Cover */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-shrink-0"
            >
              <div className="relative">
                <div className="absolute -inset-3 bg-primary/20 rounded-2xl blur-xl" />
                <img
                  src={mockupImg}
                  alt="Biological Sciences Journal"
                  className="relative h-52 md:h-64 lg:h-72 w-auto drop-shadow-2xl rounded-lg"
                />
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex-1 min-w-0 pb-4"
            >
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="text-[11px] font-bold tracking-widest uppercase text-emerald-300 bg-emerald-500/15 border border-emerald-500/25 px-3 py-1 rounded-full">Peer-Reviewed</span>
                <span className="text-[11px] font-bold tracking-widest uppercase text-blue-300 bg-blue-500/15 border border-blue-500/25 px-3 py-1 rounded-full">Open Access</span>
                <span className="text-[11px] font-bold tracking-widest uppercase text-amber-300 bg-amber-500/15 border border-amber-500/25 px-3 py-1 rounded-full">Scopus Indexed</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-3">
                Biological Sciences Journal
              </h1>
              <p className="text-white/40 text-xs font-mono tracking-widest uppercase mb-3">ISSN: xxxx-xxxx • e-ISSN: xxxx-xxxx</p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                A flagship open-access journal driving innovation across biological sciences, pharmacy and allied health disciplines
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {journalStats.map((s) => (
                  <div key={s.label} className="bg-white/[0.07] border border-white/10 rounded-2xl p-4 text-center hover:bg-white/[0.11] transition-colors">
                    <div className={`text-2xl font-extrabold bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.value}</div>
                    <div className="text-white/55 text-xs font-medium mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 flex-wrap">
                <Link to="/submit" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/30 text-sm">
                  Submit Manuscript <ArrowRight size={16} />
                </Link>
                <a href="#articles" className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors text-sm">
                  Browse Articles
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-0">
            <div className="flex gap-0 overflow-x-auto">
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`py-4 px-6 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === i ? "border-primary text-primary" : "border-transparent text-white/40 hover:text-white/70"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      {activeTab === 0 && (
        <>
          {/* Articles */}
          <section id="articles" className="section-padding bg-slate-50">
            <div className="container mx-auto max-w-5xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                <div>
                  <span className="text-xs font-bold tracking-widest uppercase text-primary mb-1 block">Latest Research</span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Published Articles</h2>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Filter size={14} />
                  <span>Showing 0 of 0 articles</span>
                </div>
              </div>

              <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="flex justify-center mb-12"
          >
            <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-primary/15 bg-card p-8 text-center card-shadow">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-emerald-400 to-teal-400" />
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary ring-8 ring-primary/5">
                <BookOpen size={28} />
              </div>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-primary">
                Articles & Issues
              </span>
              <h3 className="text-2xl font-extrabold text-foreground md:text-3xl">
                Coming Soon
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                Our first peer-reviewed publications are being prepared for release.
              </p>
            </div>
              </motion.div>

              {/* <div className="space-y-4">
                {publishedArticles.map((article, i) => (
                  <motion.div
                    key={article.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="bg-white rounded-2xl border border-slate-100 card-shadow p-6 hover:elevated-shadow hover:border-primary/20 transition-all group cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold border ${categoryColors[article.category] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
                            {article.category}
                          </span>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Calendar size={11} /> {article.date}
                          </span>
                          <span className="text-xs text-slate-400">{article.volume}</span>
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors leading-snug">
                          {article.title}
                        </h3>
                        <p className="text-sm text-slate-500 flex items-center gap-1.5 mb-2">
                          <User size={12} /> {article.authors}
                        </p>
                        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{article.abstract}</p>
                        <p className="text-xs text-slate-400 mt-2 font-mono">DOI: {article.doi}</p>
                      </div>
                      <div className="flex-shrink-0 flex flex-col gap-2 items-end">
                        <ExternalLink size={16} className="text-slate-300 group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div> */}

              {/* <div className="text-center mt-10">
                <Link to="/research" className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3.5 rounded-xl font-bold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25">
                  View All Articles <ArrowRight size={18} />
                </Link>
              </div> */}
            </div>
          </section>

          {/* Features */}
          <section className="section-padding bg-gradient-to-br from-slate-900 to-[hsl(168,45%,10%)]">
            <div className="container mx-auto max-w-5xl">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
                <span className="text-xs font-bold tracking-widest uppercase text-emerald-400 mb-3 block">Why Choose Us</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Journal Features</h2>
                <p className="text-white/60 text-lg max-w-xl mx-auto">
                  Everything you need for a transparent, high-quality publishing experience
                </p>
              </motion.div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {features.map((f, i) => (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                      <f.icon size={20} className="text-emerald-400" />
                    </div>
                    <h3 className="font-bold text-white mb-2">{f.title}</h3>
                    <p className="text-sm text-white/55 leading-relaxed">{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {activeTab === 1 && (
        <section className="section-padding bg-slate-50">
          <div className="container mx-auto max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              {/* About Header */}
              <div>
                <h2 className="text-4xl font-extrabold text-slate-900 mb-4">About the Journal</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  The Biological Sciences Journal is a peer-reviewed, open-access publication dedicated to advancing research across all disciplines of biological and life sciences.
                </p>
              </div>

              {/* Mission */}
              <div className="bg-white rounded-2xl border border-slate-100 p-8">
                <div className="flex gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Target size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
                    <p className="text-slate-600 leading-relaxed">
                      To provide an open-access platform for rigorous, innovative research in biological sciences, making groundbreaking discoveries accessible to the global scientific community. We are committed to supporting researchers at all career stages and promoting equitable access to knowledge.
                    </p>
                  </div>
                </div>
              </div>

              {/* Scope */}
              <div className="bg-white rounded-2xl border border-slate-100 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Microscope size={24} className="text-primary" /> Scope & Coverage
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-3">Research Areas</h4>
                    <ul className="space-y-2">
                      {["Molecular Biology", "Genetics & Genomics", "Biochemistry", "Neuroscience", "Immunology"].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-slate-600">
                          <CheckCircle2 size={16} className="text-emerald-500" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-3">Additional Areas</h4>
                    <ul className="space-y-2">
                      {["Pharmacy & Drug Development", "Environmental Biology", "Biotechnology", "Healthcare Sciences", "Microbiology"].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-slate-600">
                          <CheckCircle2 size={16} className="text-emerald-500" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl border border-slate-100 p-6 text-center">
                  <div className="text-3xl font-extrabold text-primary mb-1">0</div>
                  <p className="text-sm font-semibold text-slate-600">CiteScore</p>
                  <p className="text-xs text-slate-400 mt-1">2026 Scopus Metrics</p>
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 p-6 text-center">
                  <div className="text-3xl font-extrabold text-primary mb-1">0</div>
                  <p className="text-sm font-semibold text-slate-600">Impact Factor</p>
                  <p className="text-xs text-slate-400 mt-1">2026 JCR</p>
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 p-6 text-center">
                  <div className="text-3xl font-extrabold text-primary mb-1">0</div>
                  <p className="text-sm font-semibold text-slate-600">Published Authors</p>
                  <p className="text-xs text-slate-400 mt-1">From 0 countries</p>
                </div>
              </div>

              {/* Editorial Board */}
              <div className="bg-white rounded-2xl border border-slate-100 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Editorial Excellence</h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Our editorial board comprises leading scientists and researchers from prestigious institutions worldwide. All submissions undergo rigorous double-blind peer review to ensure the highest standards of scientific quality.
                </p>
                <Link to="/editorial-board" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                  Meet Our Editors <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {activeTab === 2 && (
        <section className="section-padding bg-slate-50">
          <div className="container mx-auto max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              {/* Guidelines Header */}
              <div>
                <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Guidelines for Authors</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Comprehensive guidelines to help you prepare and submit your manuscript successfully.
                </p>
              </div>

              {/* Manuscript Types */}
              <div className="bg-white rounded-2xl border border-slate-100 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <FileText size={24} className="text-primary" /> Manuscript Types Accepted
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { title: "Original Research", desc: "Novel research findings (5000-8000 words)" },
                    { title: "Review Articles", desc: "Comprehensive reviews of recent literature (6000-10000 words)" },
                    { title: "Case Reports", desc: "Detailed analysis of clinical cases (3000-5000 words)" },
                    { title: "Rapid Communications", desc: "Time-sensitive findings (2000-3500 words)" }
                  ].map((type) => (
                    <div key={type.title} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <h4 className="font-semibold text-slate-900 mb-1">{type.title}</h4>
                      <p className="text-sm text-slate-600">{type.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submission Checklist */}
              <div className="bg-white rounded-2xl border border-slate-100 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <FileCheck size={24} className="text-primary" /> Pre-Submission Checklist
                </h3>
                <div className="space-y-3">
                  {[
                    "Manuscript formatted according to journal template",
                    "All figures and tables have captions and citations",
                    "References are complete and properly formatted",
                    "Author names, affiliations and emails are provided",
                    "Corresponding author contact information included",
                    "No author names appear in main text (anonymity maintained)",
                    "Conflict of interest statement provided",
                    "Funding sources acknowledged if applicable",
                    "Ethical approval obtained (if applicable)"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Requirements */}
              <div className="bg-white rounded-2xl border border-slate-100 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Technical Requirements</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">File Formats</h4>
                    <p className="text-slate-600 text-sm">
                      Manuscripts: Microsoft Word (.docx) or LaTeX (.tex). Figures: High-resolution TIFF, EPS, or PDF (≥300 dpi for print, ≥150 dpi for screen)
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Language & Style</h4>
                    <p className="text-slate-600 text-sm">
                      Manuscripts must be in English. Use clear, concise language. Follow the journal's citation style (APA). Tables and figures should be numbered sequentially.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Structured Abstract</h4>
                    <p className="text-slate-600 text-sm">
                      Maximum 250 words. Include: Background, Methods, Results, Conclusions and Keywords (5-8).
                    </p>
                  </div>
                </div>
              </div>

              {/* Submission Process */}
              <div className="bg-gradient-to-br from-primary/5 to-emerald-500/5 rounded-2xl border border-primary/20 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <BarChart3 size={24} className="text-primary" /> Submission & Review Process
                </h3>
                <div className="space-y-4">
                  {[
                    { step: "1. Submit", desc: "Upload your manuscript through our online portal" },
                    { step: "2. Initial Review", desc: "Editor screens for scope and quality (1-2 weeks)" },
                    { step: "3. Peer Review", desc: "Double-blind review by 2-3 expert reviewers (4-6 weeks)" },
                    { step: "4. Decision", desc: "Accept, Minor Revisions, Major Revisions, or Reject (1 week)" },
                    { step: "5. Revisions", desc: "Submit revised manuscript with response letter" },
                    { step: "6. Publication", desc: "Final acceptance and online publication (1-2 weeks)" }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-bold text-sm">
                        {item.step.split(".")[0]}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{item.step}</h4>
                        <p className="text-sm text-slate-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="text-center bg-white rounded-2xl border border-slate-100 p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Ready to Submit?</h3>
                <p className="text-slate-600 mb-6">For detailed formatting guidelines and templates, download our author guide.</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link to="/submit" className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all">
                    Start Submission <ArrowRight size={16} />
                  </Link>
                  <a href="#" className="inline-flex items-center gap-2 border border-primary/20 text-primary px-7 py-3 rounded-xl font-semibold hover:bg-primary/5 transition-all">
                    <Download size={16} /> Download Author Guide
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {activeTab === 3 && (
        <section className="section-padding bg-white">
          <div className="container mx-auto max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <span className="text-xs font-bold tracking-widest uppercase text-primary mb-3 block">Archive</span>
              <h2 className="text-3xl font-extrabold text-slate-900">Volumes & Issues</h2>
            </motion.div>
            <div className="grid sm:grid-cols-1">
              {volumes.map((v, i) => (
                <motion.div
                  key={`${v.vol}-${v.year}`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-slate-50 border border-emerald-100 rounded-2xl p-6 flex items-center gap-4 hover:border-primary/30 hover:bg-primary/3 transition-all group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <BookOpen size={22} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{v.vol} ({v.year})</h3>
                    <p className="text-sm text-slate-500">{v.issues} issues &middot; {v.articles} articles</p>
                  </div>
                  <ArrowRight size={16} className="text-slate-300 group-hover:text-primary transition-colors" />
                </motion.div>
              ))}
            </div>
             {/* <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="flex justify-center mb-12"
          >
            <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-primary/15 bg-card p-8 text-center card-shadow">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-emerald-400 to-teal-400" />
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary ring-8 ring-primary/5">
                <BookOpen size={28} />
              </div>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-primary">
                Articles & Issues
              </span>
              <h3 className="text-2xl font-extrabold text-foreground md:text-3xl">
                Coming Soon
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                Our first peer-reviewed publications are being prepared for release.
              </p>
            </div>
            </motion.div> */}
          </div>
        </section>
      )}

      {/* CTA - Show on all tabs */}
      <section className="py-8 px-4 bg-gradient-to-r from-primary to-emerald-500">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-2xl font-extrabold text-white mb-2">Ready to Publish?</h2>
          <p className="text-white/80 mb-6">Submit your manuscript today and reach thousands of scientists worldwide</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/submit" className="inline-flex items-center gap-2 bg-white text-primary px-7 py-3.5 rounded-xl font-bold hover:shadow-xl transition-all">
              Submit Manuscript <ArrowRight size={18} />
            </Link>
            <Link to="/editorial-board" className="inline-flex items-center gap-2 border border-white/30 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition-colors">
              Meet the Editors
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Journal;
