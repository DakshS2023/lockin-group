import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { site } from "@/content/site";
import { PageHero, seo } from "@/components/site/PageHero";

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact LockIn Group — Singapore", "Get in touch with LockIn Group about mobile escape-room experiences, packages and events in Singapore."),
  component: Contact,
});

function Contact() {
  const items = [
    { icon: Mail, label: "Email", value: site.email },
    { icon: MapPin, label: "Location", value: site.location },
    { icon: MessageCircle, label: "Social", value: site.socials.map((s) => s.label).join(" · ") },
  ];
  return (
    <>
      <PageHero eyebrow="Contact" title="Let’s talk.">Questions about an experience or an event? We’d love to hear from you.</PageHero>
      <div className="mx-auto grid max-w-5xl gap-5 px-5 md:grid-cols-3">
        {items.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-3xl border border-border bg-card p-7">
            <Icon className="h-6 w-6 text-primary-glow" />
            <p className="eyebrow mt-5">{label}</p>
            <p className="mt-2">{value}</p>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-5xl px-5 pb-28 pt-12 text-center">
        <Link to="/book" className="inline-flex rounded-full bg-gradient-primary px-8 py-4 text-xs font-semibold tracking-[0.18em] text-primary-foreground shadow-glow">BOOK A CONSULTATION</Link>
      </div>
    </>
  );
}
