import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Microscope, Award, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-biology.jpg";

const highlights = [
  { icon: Award, label: "Impact Factor 0" },
  { icon: BookOpen, label: "Open Access" },
  { icon: Microscope, label: "Peer Reviewed" },
  { icon: Globe, label: "0 Countries" },
];

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={heroImg}
          alt="Biological Sciences Research"
          className="w-full h-full object-cover"
          width={1920}
          height={800}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220,55%,8%)]/90 via-[hsl(220,45%,12%)]/80 to-[hsl(168,55%,12%)]/75" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
      </div>

      {/* Glows */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto relative z-10 pt-28 pb-16 px-4">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Biological Sciences Journal
            </motion.span> */}

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] mb-6">
              Advancing Research{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Through Discovery
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-4 max-w-2xl">
              A premier open-access, peer-reviewed journal publishing breakthrough research across Healthcare, Pharmacy, Biochemistry, Biotechnology, Neuroscience and Environmental Biology
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.07 }}
                  className="flex items-center gap-1.5 bg-white/8 border border-white/12 backdrop-blur-sm px-3 py-1.5 rounded-full text-white/80 text-xs font-semibold"
                >
                  <h.icon size={12} className="text-emerald-400" />
                  {h.label}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/journal"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-primary/90 transition-all hover:shadow-2xl hover:shadow-primary/40 active:scale-[0.98]"
              >
                Explore Journal <ArrowRight size={18} />
              </Link>
              <Link
                to="/submit"
                className="inline-flex items-center gap-2 border-2 border-white/25 text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-white/10 hover:border-white/40 transition-all"
              >
                Submit Your Paper
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating stat cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap gap-4 mt-16"
          >
            {[
              { value: "0", label: "CiteScore" },
              { value: "0", label: "Impact Factor" },
              { value: "0", label: "Citations" },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl px-6 py-4 text-center">
                <div className="text-2xl font-extrabold text-white">{s.value}</div>
                <div className="text-xs text-white/55 font-medium mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="text-white/40 text-xs font-medium tracking-widest uppercase">Scroll</div>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
