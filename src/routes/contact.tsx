import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { site, packageNotice } from "@/content/site";
import { PageHero, seo } from "@/components/site/PageHero";
import { ConsultationForm } from "@/components/site/ConsultationForm";
export const Route = createFileRoute("/contact")({
  validateSearch: (s: Record<string, unknown>): { room?: string; package?: string } => ({
    ...(typeof s["room"] === "string" ? { room: s["room"] } : {}),
    ...(typeof s["package"] === "string" ? { package: s["package"] } : {}),
  }),
  head: () => seo("Contact & Consultation — LockIn Group Singapore", "Ask about LockIn Plus packages or request a consultation for a mobile escape-room event in Singapore."),
  component: Contact,
});
function Contact() {
  const search = Route.useSearch();
  const items = [
    { icon: Mail, label: "Email", value: site.email },
    { icon: MapPin, label: "Location", value: site.location },
    { icon: MessageCircle, label: "Social", value: site.socials.map(s => s.label).join(" · ") },
  ];
  return <>
    <PageHero eyebrow="Contact" title="Let’s plan your adventure.">Questions about an experience or an event? We’d love to hear from you.</PageHero>
    <div className="mx-auto grid max-w-5xl gap-6 px-5 md:grid-cols-3">{items.map(({icon: Icon,label,value}) => <div key={label} className="border-b border-border pb-6"><Icon className="h-6 w-6 text-primary-glow" /><p className="eyebrow mt-4">{label}</p><p className="mt-2 break-words">{value}</p></div>)}</div>
    <section id="consultation" className="mx-auto max-w-3xl scroll-mt-28 px-5 pb-8 pt-16">
      <h2 className="text-3xl font-semibold">Request a consultation</h2>
      <p className="mt-4 text-muted-foreground">Tell us about your event. Your booking is only confirmed after approval by the LockIn team.</p>
      <p className="mt-4 text-sm text-muted-foreground">{packageNotice}</p>
    </section>
    <ConsultationForm key={`${search.room ?? ""}-${search.package ?? ""}`} room={search.room} selectedPackage={search.package} />
  </>;
}
