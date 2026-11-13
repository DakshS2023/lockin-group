import { createFileRoute } from "@tanstack/react-router";
import { PageHero, seo } from "@/components/site/PageHero";

export const Route = createFileRoute("/terms")({
  head: () => seo("Terms & Conditions — LockIn Group", "Terms and conditions for LockIn Group escape-room experiences and bookings."),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" />
      <div className="mx-auto max-w-3xl px-5 pb-28 leading-relaxed text-muted-foreground">
        <p>Submitting a consultation request does not confirm a booking. Bookings are confirmed only once approved by the LockIn team. Final pricing may depend on the selected experience, venue and event requirements. [FULL TERMS & CONDITIONS — TO BE PROVIDED]</p>
      </div>
    </>
  );
}
