import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { submitContactQuery } from "@/lib/contactApi";

const ContactSection = () => {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await submitContactQuery({
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });
      toast({ title: "Message sent", description: response.message ?? "Your query has been submitted successfully." });
      setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast({
        title: "Message not sent",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold tracking-wider uppercase text-primary mb-3 block">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-6">
            Contact Us
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Have questions about submission or publication? We're here to help
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          <div className="lg:col-span-2 space-y-6">
            {[
              { icon: Mail, label: "Email", value: "contact@ijfink.com" },
              { icon: Phone, label: "Phone", value: "+91 83370 75844" },
              { icon: MapPin, label: "Address", value: "RDB Boulevard, 5th Floor, Trimplin, Regus Campus, EP and GP block, Plot K-1, Sector V, Kolkata-700091 West Bengal" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <item.icon className="text-primary" size={18} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{item.label}</div>
                  <div className="text-sm text-muted-foreground">{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="text"
                placeholder="Last Name"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <input
              type="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              type="text"
              placeholder="Subject"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              {isSubmitting ? "Sending..." : "Send Message"} <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
