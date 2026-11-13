import { createFileRoute } from "@tanstack/react-router";
import { Quote } from "lucide-react";
import { testimonials } from "@/content/site";
import { PageHero, seo } from "@/components/site/PageHero";
import { CtaBand } from "@/components/site/CtaBand";
export const Route = createFileRoute("/testimonials")({
  head: () => seo("Testimonials — LockIn Group Customer Stories", "Customer stories from LockIn mobile escape-room experiences. Approved testimonials will be added when available."),
  component: Testimonials,
});
function Testimonials() {
  return <>
    <PageHero eyebrow="Testimonials" title={<>Stories from those who <span className="text-gradient">locked in.</span></>} />
    <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
      <p className="text-sm text-muted-foreground">Approved customer reviews will be added here.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">{testimonials.map((t,i) => <blockquote key={i} className="rounded-lg border border-border bg-card p-7"><Quote className="h-6 w-6 text-primary-glow" /><p className="mt-6 leading-relaxed text-muted-foreground">{t.quote}</p><footer className="mt-8 text-sm">{t.name}<span className="mt-1 block text-muted-foreground">{t.event}</span></footer></blockquote>)}</div>
    </section><CtaBand />
  </>;
}
