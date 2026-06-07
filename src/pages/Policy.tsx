import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PolicyAccordion from "@/components/PolicyAccordion";
import { policySections, publicationSummary } from "@/data/policies";

const Policy = () => {
  const sections = [
    ...policySections.slice(0, 5),
    publicationSummary,
    ...policySections.slice(5),
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        badge="Journal Policies"
        title="Policy"
        description="Transparent editorial, access, privacy and publication standards for IJFINK authors, reviewers, editors and readers."
      />

      <section className="section-padding bg-slate-50">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-primary">
              Editorial Standards
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 md:text-4xl">
              Complete Policy Statements
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-500">
              Open each section to read the full policy text. Publication guidance includes a short summary here and a dedicated page for the full statements.
            </p>
          </div>

          <PolicyAccordion sections={sections} includePublicationLink />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Policy;
