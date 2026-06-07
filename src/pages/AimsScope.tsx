import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Dna,
  FlaskConical,
  Globe,
  HeartPulse,
  Leaf,
  Microscope,
  ShieldCheck,
  Sprout,
  Target,
  Users,
} from "lucide-react";

const scopeGroups = [
  {
    title: "Biological Sciences",
    icon: Dna,
    color: "text-emerald-600 bg-emerald-50",
    areas: [
      "Microbiology",
      "Molecular Biology",
      "Cell Biology",
      "Genetics and Genomics",
      "Biotechnology",
      "Biochemistry",
      "Bioinformatics",
      "Immunology",
      "Developmental Biology",
      "Evolutionary Biology",
      "Marine Biology",
      "Plant Sciences",
      "Zoology",
      "Agricultural Sciences",
    ],
  },
  {
    title: "Biomedical and Health Sciences",
    icon: HeartPulse,
    color: "text-rose-600 bg-rose-50",
    areas: [
      "Biomedical Sciences",
      "Medical Microbiology",
      "Public Health",
      "Clinical Research",
      "Translational Medicine",
      "Epidemiology",
      "Pathology",
      "Pharmacology",
      "Pharmaceutical Sciences",
      "Drug Discovery and Development",
      "Healthcare Innovation",
    ],
  },
  {
    title: "Environmental and Applied Life Sciences",
    icon: Leaf,
    color: "text-teal-600 bg-teal-50",
    areas: [
      "Environmental Biology",
      "Environmental Microbiology",
      "Ecology and Conservation",
      "Sustainable Agriculture",
      "Food Science and Technology",
      "Industrial Biotechnology",
      "Waste Management and Bioremediation",
      "Climate Change and Ecosystem Studies",
    ],
  },
];

const objectives = [
  {
    icon: Target,
    title: "Promote Excellence",
    text: "Advance high-quality research across biological and life sciences.",
  },
  {
    icon: Users,
    title: "Encourage Collaboration",
    text: "Support interdisciplinary scientific exchange among global contributors.",
  },
  {
    icon: Sprout,
    title: "Support Researchers",
    text: "Create space for emerging researchers and established scholars.",
  },
  {
    icon: Globe,
    title: "Disseminate Findings",
    text: "Facilitate global access to innovative scientific discoveries.",
  },
  {
    icon: ShieldCheck,
    title: "Uphold Integrity",
    text: "Maintain publication ethics and research integrity standards.",
  },
  {
    icon: FlaskConical,
    title: "Address Challenges",
    text: "Contribute to health, environmental and societal solutions.",
  },
];

const manuscriptTypes = [
  "Original research articles",
  "Review papers",
  "Short communications",
  "Case studies",
  "Scholarly perspectives",
];

const AimsScope = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(220,55%,10%)] via-[hsl(220,48%,13%)] to-[hsl(168,55%,14%)] pt-32 pb-20 px-4">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }}
        />
        <div className="absolute right-0 top-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto relative z-10 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
              <BookOpen size={12} /> Journal Focus
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-5 leading-tight">
              Aims &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Scope
              </span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              IJFINK is an international, peer-reviewed, open-access journal dedicated to advancing scientific knowledge and innovation within the broad spectrum of Biological and Life Sciences
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="rounded-2xl border border-slate-100 bg-white p-8 card-shadow"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Microscope size={24} />
              </div>
              <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-primary">
                Aim
              </span>
              <h2 className="mb-5 text-3xl font-extrabold text-slate-900">
                A credible platform for scientific contribution
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Published as the flagship journal publication initiative of Trimplin, IJFINK aims to provide a credible and accessible platform for researchers, academicians, healthcare professionals, industry experts and policymakers.
                </p>
                <p>
                  The journal supports dissemination of high-quality scientific research that contributes to academic advancement, societal well-being and sustainable development.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-emerald-500/5 p-8"
            >
              <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-primary">
                Contributions
              </span>
              <h2 className="mb-5 text-2xl font-extrabold text-slate-900">
                Manuscripts We Welcome
              </h2>
              <p className="mb-5 text-sm leading-relaxed text-slate-600">
                IJFINK welcomes submissions that demonstrate scientific rigor, innovation and practical significance.
              </p>
              <div className="grid gap-3">
                {manuscriptTypes.map((type) => (
                  <div key={type} className="flex items-center gap-3 rounded-xl border border-white/80 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-700">
                    <CheckCircle2 size={17} className="flex-shrink-0 text-emerald-500" />
                    {type}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-primary">
              Scope of the Journal
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 md:text-4xl">
              Research Areas
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-500">
              IJFINK welcomes submissions in, but not limited to, these core areas
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {scopeGroups.map((group, index) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-2xl border border-slate-100 bg-white p-6 card-shadow"
              >
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${group.color}`}>
                  <group.icon size={24} />
                </div>
                <h3 className="mb-5 text-xl font-extrabold text-slate-900">
                  {group.title}
                </h3>
                <ul className="space-y-2">
                  {group.areas.map((area) => (
                    <li key={area} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-primary">
              Journal Objectives
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 md:text-4xl">
              What IJFINK Aims To Do
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {objectives.map((objective, index) => (
              <motion.div
                key={objective.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="rounded-2xl border border-slate-100 bg-white p-6 card-shadow transition-all hover:border-primary/25 hover:elevated-shadow"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <objective.icon size={21} />
                </div>
                <h3 className="mb-2 font-bold text-slate-900">{objective.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{objective.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-primary to-emerald-500 px-4 py-8">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="mb-2 text-2xl font-extrabold text-white">
            Contribute to IJFINK
          </h2>
          <p className="mb-6 text-white/80">
            The journal welcomes contributions from researchers, academicians, clinicians, industry professionals and policy experts from across the globe.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/submit"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-bold text-primary transition-all hover:shadow-xl"
            >
              Submit Manuscript <ArrowRight size={18} />
            </Link>
            <Link
              to="/journal"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              View Journal
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AimsScope;
