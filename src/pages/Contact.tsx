import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import type { FormEvent } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { submitContactQuery } from "@/lib/contactApi";
import {
  Mail, Phone, MapPin, Clock, Send, MessageSquare,
  FileText, HelpCircle, Users, ArrowRight, CheckCircle2
} from "lucide-react";

const contactReasons = [
  { icon: FileText, title: "Manuscript Submission", desc: "Questions about submitting your research paper", color: "bg-emerald-100 text-emerald-600" },
  { icon: HelpCircle, title: "Peer Review Queries", desc: "Status updates or review process questions", color: "bg-blue-100 text-blue-600" },
  { icon: Users, title: "Editorial Enquiries", desc: "Contact the editorial team or board members", color: "bg-purple-100 text-purple-600" },
  { icon: MessageSquare, title: "General Information", desc: "Any other questions or feedback", color: "bg-amber-100 text-amber-600" },
];

const contactInfo = [
  { icon: Mail, label: "Email", value: "contact@ijfink.com", sub: "We reply within 24–48 hours" },
  { icon: Phone, label: "Phone", value: "+91 83370 75844", sub: "Available for inquiries" },
  { icon: MapPin, label: "Address", value: "RDB Boulevard, 5th Floor, Trimplin", sub: "Regus Campus, EP and GP block, Plot K-1, Sector V, Kolkata-700091 West Bengal" },
  { icon: Clock, label: "Office Hours", value: "24/7", sub: "Always Available" },
];

const faqs = [
  { q: "How long does peer review take?", a: "Our average turnaround is 4–6 weeks from submission to first editorial decision, depending on reviewer availability." },
  { q: "Is there a publication fee?", a: "We charge a modest Article Processing Charge (APC) to cover production and hosting costs. Authors from low-income countries may apply for a waiver." },
  { q: "Can I track my submission?", a: "Yes. Once submitted, you'll receive login credentials to our editorial management portal where you can track every stage of the review process." },
  { q: "What file formats do you accept?", a: "We accept manuscripts in Microsoft Word (.docx) or LaTeX format. Figures should be submitted as high-resolution TIFF or EPS files (≥300 dpi)." },
  { q: "Do you accept review articles?", a: "Yes, we publish original research articles, systematic reviews, meta-analyses, case reports and rapid communications." },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    institution: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await submitContactQuery({
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim(),
        subject: formData.subject,
        message: formData.message.trim(),
      });
      toast({
        title: "Message sent",
        description: response.message ?? "Your query has been submitted successfully.",
      });
      setFormData({ firstName: "", lastName: "", email: "", institution: "", subject: "", message: "" });
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
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(220,55%,10%)] via-[hsl(220,48%,13%)] to-[hsl(168,55%,14%)] pt-32 pb-20 px-4">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
        <div className="absolute right-0 top-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto relative z-10 max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
              <Mail size={12} /> Get In Touch
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-5 leading-tight">
              We'd Love to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Hear From You
              </span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Whether you have a question about submitting your research, peer review, or anything else — our team is ready to help
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact reasons */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto max-w-4xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactReasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl border border-slate-100 p-5 text-center card-shadow hover:elevated-shadow transition-all group cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${r.color} group-hover:scale-110 transition-transform`}>
                  <r.icon size={20} />
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-1">{r.title}</h3>
                <p className="text-xs text-slate-500">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content: form + info */}
      <section className="section-padding bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Send Us a Message</h2>
              <p className="text-slate-500 mb-8">Fill out the form below and we'll get back to you within 1–2 business days.</p>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">First Name *</label>
                    <input
                      type="text"
                      placeholder="John"
                      required
                      value={formData.firstName}
                      onChange={(event) => setFormData({ ...formData, firstName: event.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Last Name *</label>
                    <input
                      type="text"
                      placeholder="Doe"
                      required
                      value={formData.lastName}
                      onChange={(event) => setFormData({ ...formData, lastName: event.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    placeholder="john.doe@university.edu"
                    required
                    value={formData.email}
                    onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Institution / Affiliation</label>
                  <input
                    type="text"
                    placeholder="University or research organization"
                    value={formData.institution}
                    onChange={(event) => setFormData({ ...formData, institution: event.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Subject *</label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(event) => setFormData({ ...formData, subject: event.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors bg-white"
                  >
                    <option value="">Select a topic...</option>
                    <option>Manuscript Submission</option>
                    <option>Peer Review Status</option>
                    <option>Editorial Enquiry</option>
                    <option>Publication Fees / APC</option>
                    <option>Technical Support</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Message *</label>
                  <textarea
                    rows={5}
                    placeholder="Please describe your query in detail..."
                    required
                    value={formData.message}
                    onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]"
                >
                  <Send size={16} /> {isSubmitting ? "Sending..." : "Send Message"}
                </button>
                <p className="text-xs text-slate-400 text-center">
                  By submitting this form, you agree to our privacy policy. We'll never share your information with third parties.
                </p>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Contact Information</h2>
                <p className="text-slate-500 text-sm">Reach us directly through any of these channels.</p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info, i) => (
                  <div key={info.label} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <info.icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">{info.label}</div>
                      <div className="text-sm font-semibold text-slate-800">{info.value}</div>
                      <div className="text-xs text-slate-400">{info.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-primary to-emerald-600 rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-2">Ready to Submit Your Paper?</h3>
                <p className="text-white/80 text-sm mb-4">Our editorial team is here to guide you through every step of the submission process.</p>
                <Link to="/submit" className="inline-flex items-center gap-2 bg-white text-primary px-4 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg transition-all">
                  Start Submission <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-slate-50">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest uppercase text-primary mb-3 block">Quick Answers</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white border border-slate-100 rounded-2xl p-6 card-shadow"
              >
                <div className="flex gap-3">
                  <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
