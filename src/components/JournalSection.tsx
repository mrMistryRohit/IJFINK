import { motion } from "framer-motion";
import { ArrowRight, Microscope, HeartPulse, FlaskConical, Brain, Leaf, Pill, Calendar, User, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import bioImg from "@/assets/istockphoto-1500469862-640x640.jpg";

const topics = [
  { icon: HeartPulse, name: "Healthcare" },
  { icon: Pill, name: "Pharmacy" },
  { icon: FlaskConical, name: "Biochemistry" },
  { icon: Microscope, name: "Biotechnology" },
  { icon: Brain, name: "Neuroscience" },
  { icon: Leaf, name: "Environmental Biology" },
];

const recentArticles = [
  {
    title: "CRISPR-Cas9 Mediated Gene Therapy for Sickle Cell Disease",
    authors: "Mitchell, S., Chen, J., & Taylor, R.",
    date: "March 2026",
    category: "Biotechnology",
  },
  {
    title: "Novel Biomarkers for Early Detection of Alzheimer's Disease",
    authors: "Gonzalez, M., Patel, A., & Okafor, M.",
    date: "February 2026",
    category: "Neuroscience",
  },
  {
    title: "Antimicrobial Resistance Patterns in Southeast Asian Hospitals",
    authors: "Taylor, R., Chen, J., & Mitchell, S.",
    date: "January 2026",
    category: "Healthcare",
  },
];

const JournalSection = () => {
  return (
    <section id="journal" className="section-padding bg-muted/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold tracking-wider uppercase text-primary mb-3 block">
            Our Journal
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-6">
            Biological Sciences Journal
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Discover cutting-edge research across diverse biological disciplines. Our journal publishes high-quality, peer-reviewed articles from leading researchers worldwide
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-2xl overflow-hidden card-shadow">
              <img
                src={bioImg}
                alt="Biological Sciences Journal"
                className="w-full h-80 object-cover"
                loading="lazy"
                width={800}
                height={600}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">Research Topics</h3>
            <p className="text-muted-foreground mb-8">
              We welcome original research, review articles and case studies across these key areas:
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {topics.map((topic, i) => (
                <motion.div
                  key={topic.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 bg-card rounded-lg px-4 py-3 border border-border card-shadow"
                >
                  <topic.icon className="text-primary flex-shrink-0" size={20} />
                  <span className="text-sm font-medium text-foreground">{topic.name}</span>
                </motion.div>
              ))}
            </div>

            <Link
              to="/research"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              View All Research <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>

        {/* Published Journals Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-foreground">Recently Published</h3>
            <Link
              to="/research"
              className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
            >
              View All <ArrowRight size={14} />
            </Link>
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
          {/* <div className="grid md:grid-cols-3 gap-6">
            {recentArticles.map((article, i) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl border border-border card-shadow p-5 hover:elevated-shadow transition-shadow group"
              >
                <span className="bg-secondary text-secondary-foreground text-[11px] px-2.5 py-1 rounded-full font-medium">
                  {article.category}
                </span>
                <h4 className="text-sm font-bold text-foreground mt-3 mb-2 leading-snug group-hover:text-primary transition-colors">
                  {article.title}
                </h4>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                  <User size={11} /> {article.authors}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar size={11} /> {article.date}
                </p>
              </motion.div>
            ))}
          </div> */}
        </motion.div>
      </div>
    </section>
  );
};

export default JournalSection;
