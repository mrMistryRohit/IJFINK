import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, FileText } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { PolicySection } from "@/data/policies";

interface PolicyAccordionProps {
  sections: PolicySection[];
  includePublicationLink?: boolean;
}

const PolicyAccordion = ({ sections, includePublicationLink = false }: PolicyAccordionProps) => {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      {sections.map((section) => (
        <AccordionItem
          key={section.id}
          value={section.id}
          className="overflow-hidden rounded-2xl border border-slate-100 bg-white px-5 card-shadow transition-all hover:border-primary/25"
        >
          <AccordionTrigger className="gap-4 py-5 text-left hover:no-underline">
            <span className="flex items-center gap-3">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText size={19} />
              </span>
              <span>
                <span className="block text-base font-extrabold text-slate-900">
                  {section.title}
                </span>
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="border-t border-slate-100 pb-6 pt-5">
            {section.summary && (
              <p className="mb-5 rounded-xl border border-primary/15 bg-primary/5 p-4 text-sm leading-relaxed text-slate-600">
                {section.summary}
              </p>
            )}
            <div className="space-y-4 text-sm leading-relaxed text-slate-600">
              {section.blocks.map((block, index) =>
                block.type === "paragraph" ? (
                  <p key={index}>{block.text}</p>
                ) : (
                  <ul key={index} className="grid gap-2 sm:grid-cols-2">
                    {block.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ),
              )}
            </div>
            {includePublicationLink && section.id === "publication" && (
              <Link
                to="/publication-policy"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
              >
                Read More <ArrowRight size={16} />
              </Link>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default PolicyAccordion;
