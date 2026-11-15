import { createFileRoute } from "@tanstack/react-router";
import { PageHero, seo } from "@/components/site/PageHero";
import { useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/terms")({
  head: () => seo("Terms & Conditions — LockIn Group", "Terms and conditions for LockIn Group escape-room experiences and bookings."),
  component: TermsPage,
});

function TermsPage() {
  const { legal } = useSiteContent();
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" />
      <div className="mx-auto max-w-3xl px-5 pb-28 leading-relaxed text-muted-foreground">
        <p className="whitespace-pre-line">{legal.terms}</p>
      </div>
    </>
  );
}
