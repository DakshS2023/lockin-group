import { createFileRoute } from "@tanstack/react-router";
import { PageHero, seo } from "@/components/site/PageHero";
import { useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/privacy")({
  head: () => seo("Privacy Policy — LockIn Group", "How LockIn Group collects, uses and protects your personal data."),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { legal, site } = useSiteContent();
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <div className="mx-auto max-w-3xl px-5 pb-28 leading-relaxed text-muted-foreground">
        <p className="whitespace-pre-line">{legal.privacy.replaceAll("[CONTACT EMAIL]", site.email)}</p>
      </div>
    </>
  );
}
