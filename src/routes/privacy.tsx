import { createFileRoute } from "@tanstack/react-router";
import { PageHero, seo } from "@/components/site/PageHero";

export const Route = createFileRoute("/privacy")({
  head: () => seo("Privacy Policy — LockIn Group", "How LockIn Group collects, uses and protects your personal data."),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <div className="mx-auto max-w-3xl px-5 pb-28 leading-relaxed text-muted-foreground">
        <p>We collect the details you submit through our consultation form (such as your name, email, contact number and event details) only to respond to your enquiry and plan your event. We do not sell your data. Photos and videos featuring customers are only published with consent, and for anyone under 18 we require consent from a parent or guardian. To request access, correction or deletion of your data, contact us at [CONTACT EMAIL]. [FULL PRIVACY POLICY — TO BE PROVIDED, INCLUDING PDPA DETAILS]</p>
      </div>
    </>
  );
}
