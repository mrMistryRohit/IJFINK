import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  badge: string;
  title: string;
  description: string;
  icon?: LucideIcon;
}

const PageHeader = ({ badge, title, description, icon: Icon }: PageHeaderProps) => {
  const titleWords = title.trim().split(" ");
  const highlightedWord = titleWords.length > 1 ? titleWords.pop() : "";
  const leadingTitle = titleWords.join(" ");

  return (
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
            {Icon ? <Icon size={12} /> : null}
            {badge}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-5 leading-tight">
            {highlightedWord ? (
              <>
                {leadingTitle}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                  {highlightedWord}
                </span>
              </>
            ) : (
              title
            )}
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PageHeader;
