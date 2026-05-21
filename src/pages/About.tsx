import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Target, Eye, Globe, Award, BookOpen, Users, TrendingUp,
  CheckCircle2, ArrowRight, Microscope, HeartPulse, FlaskConical,
  Brain, Leaf, Pill, Shield, Zap, Star
} from "lucide-react";

const stats = [
  { value: "0", label: "CiteScore", sub: "Top 10% globally" },
  { value: "0", label: "Impact Factor", sub: "Rising year-on-year" },
  { value: "0", label: "Citations", sub: "Across disciplines" },
  { value: "0", label: "Countries", sub: "Author representation" },
  { value: "0", label: "Articles", sub: "Published annually" },
  { value: "0", label: "Review Time", sub: "Fast turnaround" },
];

const values = [
  { icon: Shield, title: "Scientific Integrity", color: "text-emerald-600 bg-emerald-50", desc: "We uphold the highest standards of research ethics, transparency and reproducibility in every publication." },
  { icon: Globe, title: "Open Access", color: "text-blue-600 bg-blue-50", desc: "All published articles are freely available worldwide, removing barriers to scientific knowledge." },
  { icon: Zap, title: "Innovation First", color: "text-amber-600 bg-amber-50", desc: "We actively seek groundbreaking research that pushes boundaries across biological sciences." },
  { icon: Users, title: "Global Community", color: "text-purple-600 bg-purple-50", desc: "Connecting researchers, clinicians and industry professionals across continents and disciplines." },
  { icon: Star, title: "Excellence", color: "text-rose-600 bg-rose-50", desc: "Rigorous peer-review ensures only the highest quality research earns publication in our journal." },
  { icon: Target, title: "Impact-Driven", color: "text-cyan-600 bg-cyan-50", desc: "We measure success by the real-world difference our published research makes in science and society." },
];

const scope = [
  { icon: HeartPulse, name: "Healthcare Sciences", desc: "Clinical research, epidemiology, public health, medical advances" },
  { icon: Pill, name: "Pharmacy & Drug Discovery", desc: "Pharmacology, drug design, therapeutics, clinical trials" },
  { icon: FlaskConical, name: "Biochemistry", desc: "Protein chemistry, metabolomics, enzyme kinetics, biosynthesis" },
  { icon: Microscope, name: "Biotechnology", desc: "CRISPR, bioprocessing, fermentation, bioinformatics" },
  { icon: Brain, name: "Neuroscience", desc: "Cognitive biology, neural circuits, brain disorders, neuropharma" },
  { icon: Leaf, name: "Environmental Biology", desc: "Ecology, conservation, climate biology, sustainability" },
];

const milestones = [
  { year: "2018", event: "Journal founded with a mission to democratize biological sciences publishing" },
  { year: "2019", event: "First 50 articles published; indexed in major scientific databases" },
  { year: "2020", event: "Achieved full open-access model, removing paywalls for global readers" },
  { year: "2021", event: "Impact Factor awarded; reached 0 citation milestone" },
  { year: "2022", event: "Expanded editorial board to 0 global experts across 0 countries" },
  { year: "2023", event: "CiteScore reached 0; partnered with 0 research institutions worldwide" },
  { year: "2024", event: "Launched rapid-review track; 0 citations and growing" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(220,55%,10%)] via-[hsl(220,48%,13%)] to-[hsl(168,55%,14%)] pt-32 pb-24 px-4">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[500px] h-[500px] bg-primary/15 rounded-full blur-3xl" />
        <div className="container mx-auto relative z-10 max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary-foreground text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
              <BookOpen size={12} /> About Our Journal
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Advancing Science,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                One Discovery at a Time
              </span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
              The Biological Sciences Journal is a leading peer-reviewed, open-access publication dedicated to advancing research across the full spectrum of life sciences and pharmacy
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/journal" className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3.5 rounded-xl font-bold hover:bg-primary/90 transition-all hover:shadow-xl hover:shadow-primary/30">
                Explore Journal <ArrowRight size={18} />
              </Link>
              <Link to="/submit" className="inline-flex items-center gap-2 border border-white/25 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                Submit Your Research
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-gradient-to-r from-primary to-emerald-600 py-10 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="text-center"
              >
                <div className="text-3xl font-extrabold text-white">{s.value}</div>
                <div className="text-white font-semibold text-sm mt-0.5">{s.label}</div>
                <div className="text-white/60 text-xs mt-0.5">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-5">
                <Target size={24} />
              </div>
              <h2 className="text-2xl font-extrabold mb-4">Our Mission</h2>
              <p className="text-white/85 leading-relaxed">
                To advance scientific knowledge by publishing rigorous, innovative research in biological sciences and pharmacy — making it freely accessible to researchers, clinicians and policymakers worldwide.
              </p>
              <ul className="mt-5 space-y-2">
                {["Accelerate biomedical discovery", "Foster interdisciplinary collaboration", "Champion open-access science"].map(p => (
                  <li key={p} className="flex items-center gap-2 text-sm text-white/80">
                    <CheckCircle2 size={15} className="text-white flex-shrink-0" /> {p}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-white"
            >
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-5">
                <Eye size={24} />
              </div>
              <h2 className="text-2xl font-extrabold mb-4">Our Vision</h2>
              <p className="text-white/85 leading-relaxed">
                To be the world's most trusted platform for biological sciences research — a journal where the next breakthrough in medicine, biotechnology, or environmental science first sees the light of day.
              </p>
              <ul className="mt-5 space-y-2">
                {["Global top-5 biological sciences journal", "100+ countries represented by 2030", "Zero barriers to scientific knowledge"].map(p => (
                  <li key={p} className="flex items-center gap-2 text-sm text-white/80">
                    <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0" /> {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-slate-50">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-primary mb-3 block">What We Stand For</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Our Core Values</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl p-6 border border-slate-100 card-shadow hover:elevated-shadow transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${v.color}`}>
                  <v.icon size={22} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scope */}
      <section className="section-padding bg-white">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-primary mb-3 block">Coverage</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Journal Scope</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              We accept original research, comprehensive reviews, case studies and rapid communications across these core disciplines
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {scope.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex gap-4 p-5 rounded-2xl border-2 border-slate-100 hover:border-primary/30 hover:bg-primary/3 transition-all group cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <s.icon size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm mb-1">{s.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      {/* <section className="section-padding bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-400 mb-3 block">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Milestones & Growth</h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-emerald-500/30" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex gap-6 pl-0"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 z-10">
                      {m.year}
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex-1 hover:bg-white/8 transition-colors">
                    <p className="text-white/80 text-sm leading-relaxed">{m.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA */}
      <section className="py-8 px-4 bg-gradient-to-r from-primary to-emerald-500">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-2xl font-extrabold text-white mb-2">Ready to Publish Your Research?</h2>
          <p className="text-white/80 mb-6">Join thousands of researchers who trust our journal to share their discoveries with the world</p>
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

export default About;
