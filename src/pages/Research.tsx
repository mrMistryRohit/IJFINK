import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { BookOpen, Users, TrendingUp, FileText, Calendar, User, ArrowRight, ExternalLink, CheckCircle2, Download, BarChart3, ShieldCheck, HeartPulse, AlertCircle, FlaskConical } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import mockupImg from "@/assets/life-science-mockup.png";
import flowchartImg from "@/assets/flowchart.png";
import figImg from "@/assets/fig.jpeg";
import editorInChiefImg from "@/assets/Editorial Board Member/Pradeep Kumar Das (Chief Editor).png";

const journalStats = [
  { label: "CiteScore", value: "0" },
  { label: "Impact Factor", value: "0" },
  { label: "Citations", value: "0" },
];

const ethicsCards = [
  {
    icon: Users,
    title: "Research Involving Human Participants",
    text: "Research involving human participants must have received prior approval from an appropriate Institutional Ethics Committee (IEC), Institutional Review Board (IRB) or equivalent ethics authority.",
    points: [
      "Name of the approving ethics committee",
      "Approval reference number, where applicable",
      "Confirmation that ethical approval was obtained before commencement of the study",
      "Compliance with the Declaration of Helsinki and other applicable ethical guidelines",
    ],
  },
  {
    icon: HeartPulse,
    title: "Informed Consent",
    text: "For studies involving human participants, authors must confirm that informed consent was obtained from all participants prior to participation.",
    points: [
      "Consent must be obtained before participation",
      "Explicit consent is required for identifiable information, photographs or clinical data where applicable",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Research Involving Animals",
    text: "Research involving animals must comply with institutional, national and international guidelines governing animal welfare and ethical treatment.",
    points: [
      "Name of the approving animal ethics committee",
      "Approval number, where applicable",
      "Statement confirming adherence to ethical standards for animal experimentation",
      "Use alternatives that minimize animal use whenever scientifically feasible",
    ],
  },
  {
    icon: FlaskConical,
    title: "Biosafety and Biological Materials",
    text: "Research involving microorganisms, infectious agents, genetically modified organisms, biological samples or hazardous materials must comply with all applicable biosafety regulations.",
    points: [
      "Appropriate laboratory safety procedures must be followed",
      "Required biosafety approvals must be obtained throughout the study",
    ],
  },
];

const transparencyPoints = [
  "Accuracy of reported findings",
  "Authenticity of data",
  "Appropriate record keeping",
  "Transparency in methodology",
  "Reproducibility of results",
];

const compliancePoints = [
  "Ethics approval obtained",
  "Informed consent procedures",
  "Animal welfare compliance",
  "Biosafety approvals",
  "Conflict of interest disclosures",
];

const publishedArticles = [
  {
    title: "CRISPR-Cas9 Mediated Gene Therapy for Sickle Cell Disease: A Comprehensive Review",
    authors: "Mitchell, S., Chen, J., & Taylor, R.",
    date: "March 2026",
    category: "Biotechnology",
    abstract: "This review examines the recent advances in CRISPR-Cas9 based gene editing approaches for treating sickle cell disease, including clinical trial outcomes and future therapeutic prospects.",
  },
  {
    title: "Novel Biomarkers for Early Detection of Alzheimer's Disease Using Machine Learning",
    authors: "Gonzalez, M., Patel, A., & Okafor, M.",
    date: "February 2026",
    category: "Neuroscience",
    abstract: "We present a computational framework integrating proteomic and metabolomic data to identify novel biomarkers enabling early-stage Alzheimer's diagnosis with 94% accuracy.",
  },
  {
    title: "Antimicrobial Resistance Patterns in Southeast Asian Hospital Settings",
    authors: "Taylor, R., Chen, J., & Mitchell, S.",
    date: "January 2026",
    category: "Healthcare",
    abstract: "A large-scale epidemiological study analyzing antimicrobial resistance trends across 45 hospitals in Southeast Asia, revealing critical patterns for public health policy.",
  },
  {
    title: "Sustainable Biofuel Production from Marine Microalgae: Process Optimization",
    authors: "Okafor, M., Gonzalez, M., & Patel, A.",
    date: "December 2025",
    category: "Environmental Biology",
    abstract: "This study presents optimized cultivation and extraction protocols for biofuel production from marine microalgae species, achieving 40% higher yield than conventional methods.",
  },
  {
    title: "Targeted Nanoparticle Drug Delivery Systems for Pancreatic Cancer",
    authors: "Patel, A., Taylor, R., & Mitchell, S.",
    date: "November 2025",
    category: "Pharmacy",
    abstract: "Development and characterization of pH-responsive nanoparticle drug delivery systems showing enhanced therapeutic efficacy in pancreatic cancer models.",
  },
  {
    title: "Epigenetic Modifications in Stem Cell Differentiation: New Insights",
    authors: "Chen, J., Gonzalez, M., & Okafor, M.",
    date: "October 2025",
    category: "Biochemistry",
    abstract: "Novel findings on how epigenetic modifications regulate stem cell fate decisions, with implications for regenerative medicine and tissue engineering applications.",
  },
];

const Research = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Articles & Issues", "About", "Guidelines for Author", "Ethics"];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Journal Hero */}
      <section className="relative pt-28 pb-0 overflow-hidden bg-gradient-to-br from-[hsl(200,25%,8%)] via-[hsl(168,40%,12%)] to-[hsl(200,30%,10%)]">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        {/* Glow accents */}
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center lg:items-end pb-12">

            {/* Journal Cover */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
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

            {/* Journal Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="flex-1 min-w-0"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[11px] font-bold tracking-widest uppercase text-primary bg-primary/15 border border-primary/25 px-3 py-1 rounded-full">
                  Peer-Reviewed
                </span>
                <span className="text-[11px] font-bold tracking-widest uppercase text-primary-foreground/50 bg-primary-foreground/5 border border-primary-foreground/10 px-3 py-1 rounded-full">
                  Open Access
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground leading-tight mb-3">
                Biological Sciences <br className="hidden md:block" />Journal
              </h1>

              <p className="text-primary-foreground/40 text-xs font-mono tracking-widest uppercase mb-3">
                ISSN No.: xxxx-xxxx
              </p>
              <p className="text-primary-foreground/70 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                Driving Innovation in Biological Sciences & Pharmacy through rigorous, high-impact research
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-3">
                {journalStats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className="flex items-center gap-3 bg-primary-foreground/[0.07] hover:bg-primary-foreground/[0.11] transition-colors border border-primary-foreground/10 backdrop-blur-sm rounded-2xl px-5 py-3"
                  >
                    <div className="text-2xl md:text-3xl font-extrabold text-primary-foreground tracking-tight">{stat.value}</div>
                    <div className="text-xs text-primary-foreground/50 font-medium leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tabs navigation */}
      <div className="bg-[hsl(200,25%,8%)] border-b border-primary-foreground/10 sticky top-[72px] z-40">
        <div className="container mx-auto px-4 flex gap-0 overflow-x-auto">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`py-4 px-5 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === i
                  ? "border-primary text-primary"
                  : "border-transparent text-primary-foreground/40 hover:text-primary-foreground/70"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab: About */}
      {activeTab === 1 && <section className="section-padding bg-background">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-6">About the Journal</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Our Biological Sciences Journal publishes high-impact, peer-reviewed research across diverse disciplines, including Molecular Biology, Microbiology, Pharmaceuticals, Biotechnology and Biomedical Sciences. We are committed to driving theoretical breakthroughs and real-world advancements that shape the future of healthcare, drug development and biological sciences innovation.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Join a global community of scientists, researchers and industry experts contributing to cutting-edge discoveries that transform medicine, biotechnology and environmental science.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              {[
                { icon: BookOpen, label: "Open Access", desc: "All articles freely available to readers worldwide" },
                { icon: Users, label: "Global Authors", desc: "Contributions from 0 countries" },
                { icon: TrendingUp, label: "Growing Impact", desc: "Steadily rising citation metrics" },
              ].map((item, i) => (
                <div key={item.label} className="flex items-start gap-3 bg-card rounded-xl p-4 border border-border card-shadow">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <item.icon className="text-primary" size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Editor-in-Chief Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl border border-border card-shadow p-6 flex items-center gap-6"
          >
            <img
              src={editorInChiefImg }
              alt="Prof. (Dr.) Pradeep Kr. Das Mohapatra"
              className="w-20 h-20 rounded-full object-cover border-4 border-primary/25 ring-4 ring-emerald-500/10 flex-shrink-0"
            />
            <div>
              <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Editor-in-Chief</div>
              <h3 className="text-lg font-bold text-foreground">Prof. (Dr.) Pradeep Kr. Das Mohapatra</h3>
              <p className="text-sm text-muted-foreground">Professor, Dean of Science, HOD | Dept. of Microbiology</p>
              <p className="text-sm text-muted-foreground">Raiganj University, Uttar Dinajpur, WB, India</p>
              <p className="text-xs text-primary mt-1">Excellence in Innovation Research, 2020-2025</p>
            </div>
          </motion.div>
        </div>
      </section>}

      {/* Tab: Articles & Issues */}
      {activeTab === 0 && <section className="section-padding bg-muted/50">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-xs font-semibold tracking-wider uppercase text-primary mb-3 block">
              Latest Research
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              Published Articles
            </h2>
            <p className="text-muted-foreground text-lg">
              Browse our latest peer-reviewed publications across biological sciences
            </p>
          </motion.div>

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
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-card rounded-xl border border-border card-shadow p-6 hover:elevated-shadow transition-shadow group cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-secondary text-secondary-foreground text-[11px] px-2.5 py-1 rounded-full font-medium">
                        {article.category}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar size={12} /> {article.date}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                      <User size={13} /> {article.authors}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {article.abstract}
                    </p>
                  </div>
                  <ExternalLink size={18} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                </div>
              </motion.div>
            ))}
          </div> */}
        </div>
      </section>}

      {activeTab === 0 && <section className="section-padding bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-xs font-semibold tracking-wider uppercase text-primary mb-3 block">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              Journal Publication Process
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A transparent, step-by-step pathway from manuscript submission to publication.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <img
              src={flowchartImg}
              alt="Journal Publication Process Flowchart"
              className="w-full rounded-2xl card-shadow"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>}

      {/* Tab: Guidelines for Author */}
      {activeTab === 2 && (
        <section className="section-padding bg-slate-50">
          <div className="container mx-auto max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div>
                <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Guidelines for Authors</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Comprehensive guidelines to help you prepare and submit your manuscript successfully.
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <FileText size={24} className="text-primary" /> Manuscript Types Accepted
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { title: "Original Research", desc: "Novel research findings (5000–8000 words)" },
                    { title: "Review Articles", desc: "Comprehensive reviews of recent literature (6000–10000 words)" },
                    { title: "Case Reports", desc: "Detailed analysis of clinical cases (3000–5000 words)" },
                    { title: "Rapid Communications", desc: "Time-sensitive findings (2000–3500 words)" },
                  ].map((type) => (
                    <div key={type.title} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <h4 className="font-semibold text-slate-900 mb-1">{type.title}</h4>
                      <p className="text-sm text-slate-600">{type.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Pre-Submission Checklist</h3>
                <div className="space-y-3">
                  {[
                    "Manuscript formatted according to journal template",
                    "All figures and tables have captions and citations",
                    "References are complete and properly formatted",
                    "Author names, affiliations and emails are provided",
                    "No author names appear in main text (anonymity maintained)",
                    "Conflict of interest statement provided",
                    "Ethical approval obtained (if applicable)",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <BarChart3 size={24} className="text-primary" /> Submission & Review Process
                </h3>
                <div className="space-y-4">
                  {[
                    { step: "1. Submit", desc: "Upload your manuscript through our online portal" },
                    { step: "2. Initial Review", desc: "Editor screens for scope and quality (1–2 weeks)" },
                    { step: "3. Peer Review", desc: "Double-blind review by 2–3 expert reviewers (4–6 weeks)" },
                    { step: "4. Decision", desc: "Accept, Minor Revisions, Major Revisions, or Reject (1 week)" },
                    { step: "5. Revisions", desc: "Submit revised manuscript with response letter" },
                    { step: "6. Publication", desc: "Final acceptance and online publication (1–2 weeks)" },
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

      {/* Tab: Ethics */}
      {activeTab === 3 && (
        <section className="section-padding bg-slate-50">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="text-center">
                <span className="text-xs font-bold tracking-widest uppercase text-primary mb-3 block">
                  Research Ethics Statement
                </span>
                <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
                  Responsible and Ethical Research
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                  IJFINK is committed to promoting responsible, ethical and scientifically rigorous research practices. Authors must ensure that their research complies with applicable ethical standards, institutional requirements and relevant national and international regulations.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {ethicsCards.map((card, index) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    className="bg-white rounded-2xl border border-slate-100 p-6 card-shadow"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                      <card.icon size={23} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{card.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-5">{card.text}</p>
                    <ul className="space-y-2">
                      {card.points.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <HeartPulse size={24} className="text-primary" /> Clinical Research
                </h3>
                <div className="space-y-3 text-sm leading-relaxed text-slate-600">
                  <p>Clinical studies must be conducted according to accepted ethical and regulatory standards.</p>
                  <p>Where applicable, clinical trial registration details should be provided within the manuscript.</p>
                  <p>Authors are encouraged to register clinical trials with recognized public trial registries before participant enrollment.</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-primary/5 to-emerald-500/5 rounded-2xl border border-primary/20 p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <BarChart3 size={24} className="text-primary" /> Data Integrity and Transparency
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    Authors are responsible for ensuring the following standards in reported research:
                  </p>
                  <ul className="space-y-2">
                    {transparencyPoints.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 flex items-start gap-2 text-sm font-semibold text-slate-700">
                    <AlertCircle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
                    Data fabrication, falsification or selective reporting are strictly prohibited.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 p-8 card-shadow">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <FileText size={24} className="text-primary" /> Ethical Compliance Statement
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    Where applicable, manuscripts should include an Ethical Compliance Statement describing:
                  </p>
                  <ul className="space-y-2">
                    {compliancePoints.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Conflict of Interest</h3>
                <div className="space-y-3 text-sm leading-relaxed text-slate-600">
                  <p>Authors must disclose any financial, professional or personal relationships that may influence the research or interpretation of results.</p>
                  <p>Any potential conflict of interest must be declared during submission.</p>
                  <p className="font-semibold text-slate-800">Failure to comply with these requirements may result in rejection, correction or retraction of the manuscript.</p>
                  <p>IJFINK is committed to upholding the highest standards of research integrity and ethical scientific publishing in service of the global biological sciences community.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-emerald-500 py-8 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-extrabold text-white mb-2">
            Ready to Submit Your Research?
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Join hundreds of researchers worldwide who have published their work with us
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3.5 rounded-lg font-semibold hover:shadow-xl transition-all"
          >
            Submit Manuscript <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Research;
