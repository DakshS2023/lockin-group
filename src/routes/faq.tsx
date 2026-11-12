import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/content/site";
import { PageHero, seo } from "@/components/site/PageHero";
import { CtaBand } from "@/components/site/CtaBand";

export const Route = createFileRoute("/faq")({
  head: () => seo("FAQ — LockIn Mobile Escape Rooms", "Answers to common questions about LockIn mobile escape rooms, packages, group sizes and booking."),
  component: Faq,
});

function Faq() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Questions, answered." />
      <div className="mx-auto max-w-3xl px-5 pb-12">
        <Accordion type="single" collapsible className="rounded-3xl border border-border bg-card px-6 md:px-8">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`q${i}`} className="last:border-0">
              <AccordionTrigger className="py-6 text-left text-base">{f.q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <CtaBand />
    </>
  );
}
