import { motion } from "framer-motion";
import { Upload, Search, CheckCircle, BookOpenCheck } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Submit Manuscript",
    description: "Upload your research paper through our streamlined submission portal with all required documents.",
  },
  {
    icon: Search,
    title: "Peer Review",
    description: "Expert reviewers from relevant fields evaluate your research for quality, originality and significance.",
  },
  {
    icon: CheckCircle,
    title: "Revision & Approval",
    description: "Incorporate reviewer feedback and receive final approval from the editorial board.",
  },
  {
    icon: BookOpenCheck,
    title: "Publication",
    description: "Your approved paper is published and made accessible to the global research community.",
  },
];

const ProcessSection = () => {
  return (
    <section id="process" className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold tracking-wider uppercase text-primary mb-3 block">
            How It Works
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-6">
            Publication Process
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A transparent, efficient pathway from submission to publication
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative text-center"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-border" />
              )}

              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-secondary flex items-center justify-center relative z-10">
                <step.icon className="text-primary" size={28} />
              </div>

              <div className="text-xs font-bold text-primary mb-2">STEP {i + 1}</div>
              <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
