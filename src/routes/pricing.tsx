import { createFileRoute, Link } from "@tanstack/react-router";
import { Fragment } from "react";
import { ArrowRight, Check } from "lucide-react";
import { packages, comparisonGroups, packageNotice, packageNotes } from "@/content/site";
import { PageHero, seo } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/pricing")({
  head: () => seo("LockIn Plus Packages — Basic, Standard & Premium", "Compare proposed LockIn Plus packages: gameplay duration, Synesthesia AV, customisation and exclusive extras."),
  component: PricingPage,
});
function PricingPage() {
  return <>
    <PageHero eyebrow="LockIn Plus · All packages include Synesthesia AV" title={<>Choose your level of <span className="text-gradient">adventure.</span></>} />
    <div className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
      <p className="border-l-2 border-primary pl-4 text-sm text-muted-foreground">{packageNotice}</p>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {packages.map((p, i) => <article key={p.id} className={`relative flex flex-col rounded-lg border p-6 sm:p-8 ${p.recommended ? "border-primary bg-accent/30" : "border-border bg-card"}`}>
          <p className="eyebrow">Tier {i + 1}{p.recommended ? " · Recommended" : ""}</p>
          <h2 className="mt-4 text-2xl font-semibold">{p.name}</h2>
          <p className="mt-6 text-4xl font-semibold font-display">{p.duration}<span className="mt-2 block text-xs font-sans text-muted-foreground">MINUTES OF GAMEPLAY</span></p>
          <p className="mt-6 text-muted-foreground">{p.blurb}</p>
          <p className="mt-4 text-xl font-semibold">{p.price}</p>
          <ul className="mt-6 space-y-3 text-sm">{p.features.map(f => <li key={f} className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-glow" /><span>{f}</span></li>)}</ul>
          <p className="mb-6 mt-8 text-sm text-muted-foreground"><strong className="text-foreground">Best for:</strong> {p.bestFor}</p>
          <Button asChild variant={p.recommended ? "default" : "outline"} className="mt-auto h-auto py-3"><Link to="/contact" search={{ package: p.id }} hash="consultation">Enquire about {p.name.replace("LockIn ", "")} <ArrowRight /></Link></Button>
        </article>)}
      </div>
      <section className="mt-20">
        <p className="eyebrow">LockIn Plus — Package comparison</p>
        <h2 className="mt-4 text-3xl font-semibold">Full perks comparison</h2>
        <p className="mt-4 text-sm text-muted-foreground">✓ Included · — Not included · Enhanced = upgraded version</p>
        <div className="mt-8 overflow-x-auto rounded-lg border border-border" tabIndex={0} aria-label="Package comparison">
          <table className="w-full min-w-[700px] text-sm">
            <thead className="bg-card"><tr><th className="p-5 text-left">Features</th>{packages.map(p => <th key={p.id} className="p-5 text-center">{p.name.replace("LockIn ", "")}</th>)}</tr></thead>
            <tbody>{comparisonGroups.map(g => <Fragment key={g.name}>
              <tr className="border-t border-border bg-secondary/50"><th colSpan={4} className="p-4 text-left font-mono text-xs uppercase text-primary-glow">{g.name}</th></tr>
              {g.rows.map(r => <tr key={r.feature} className="border-t border-border"><th scope="row" className="p-4 text-left font-normal">{r.feature}</th>{r.values.map((v,i) => <td key={i} className={`p-4 text-center ${v === "—" ? "text-muted-foreground" : "text-foreground"}`}>{v}</td>)}</tr>)}
            </Fragment>)}</tbody>
          </table>
        </div>
      </section>
      <section className="mt-16 border-t border-border pt-10">
        <h2 className="text-2xl font-semibold">Package details to confirm</h2>
        <ul className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">{packageNotes.map(n => <li key={n} className="flex gap-3"><span className="text-primary-glow">—</span>{n}</li>)}</ul>
      </section>
    </div>
  </>;
}
