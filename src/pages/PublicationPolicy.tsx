import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PolicyAccordion from "@/components/PolicyAccordion";
import { publicationPolicySections } from "@/data/policies";
import { BookOpen } from "lucide-react";

const PublicationPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        badge="Publication Standards"
        title="Publication Policy"
        description="Detailed ethics, malpractice and publication frequency guidance governing IJFINK's scholarly publishing process"
        icon={BookOpen}
      />

      <section className="section-padding bg-slate-50">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-primary">
              Full Publication Guidance
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 md:text-4xl">
              Ethics, Malpractice and Frequency
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-500">
              These statements define responsibilities for authors, reviewers and editors, along with IJFINK's publication schedule
            </p>
          </div>

          <PolicyAccordion sections={publicationPolicySections} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PublicationPolicy;
