import { motion } from "framer-motion";

interface PageHeaderProps {
  badge: string;
  title: string;
  description: string;
}

const PageHeader = ({ badge, title, description }: PageHeaderProps) => {
  return (
    <section className="bg-gradient-to-br from-foreground via-foreground to-primary/30 pt-32 pb-20 px-4">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-primary/20 text-primary-foreground text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full mb-5">
            {badge}
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground mb-5">
            {title}
          </h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PageHeader;
