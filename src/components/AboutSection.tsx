import { motion } from "framer-motion";
import { BookOpen, Users, Globe, Award } from "lucide-react";

const stats = [
  { icon: BookOpen, value: "0", label: "Published Papers" },
  { icon: Users, value: "0", label: "Researchers" },
  { icon: Globe, value: "0", label: "Countries" },
  { icon: Award, value: "Peer", label: "Reviewed" },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold tracking-wider uppercase text-primary mb-3 block">
            About Us
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-6">
            Welcome to Ink Your Journal
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We provide innovative research article publication services in the field of Biological Sciences. Our platform connects researchers worldwide, ensuring rigorous peer review and global accessibility
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-xl p-6 text-center card-shadow border border-border"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-secondary flex items-center justify-center">
                <stat.icon className="text-primary" size={22} />
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
