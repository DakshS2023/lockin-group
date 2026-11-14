import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Clock, Minus } from "lucide-react";
import { packages, packageComparison, packagesIntro, packagesDisclaimer } from "@/content/site";
import { PageHero, seo } from "@/components/site/PageHero";

export const Route = createFileRoute("/pricing")({
  head: () => seo("LockIn Packages — Compare Basic, Standard & Premium", "Compare LockIn escape-room packages: Basic, Standard and Premium, all enhanced with Synesthesia AV sound, lighting and visual effects."),
  component: PricingPage,
});

function CellValue({ value }: { value: string }) {
  if (value === "✓") return <Check className="mx-auto h-4 w-4 text-primary-glow" aria-label="Included" />;
  if (value === "—") return <Minus className="mx-auto h-4 w-4 text-muted-foreground/40" aria-label="Not included" />;
  if (value.startsWith("✓")) return <span className="text-primary-glow">{value}</span>;
  return <span className="text-muted-foreground">{value}</span>;
}

function PricingPage() {
  return (
    <>
      <PageHero eyebrow="LockIn Packages" title={<>Choose your level of <span className="text-gradient">adventure.</span></>}>
        {packagesIntro}
      </PageHero>

      <div className="mx-auto max-w-7xl px-5 pb-28 lg:px-8">
        {/* Package cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {packages.map((p, i) => (
            <div key={p.id} style={{ animationDelay: `${i * 90}ms` }}
              className={`reveal relative flex flex-col rounded-3xl border p-8 ${p.recommended ? "border-primary/60 bg-gradient-to-b from-accent to-card shadow-glow" : "border-border bg-card"}`}>
              {p.recommended && <span className="absolute -top-3 left-8 rounded-full bg-gradient-primary px-3 py-1 text-[0.65rem] font-semibold tracking-[0.2em] text-primary-foreground">RECOMMENDED</span>}
              <p className="inline-flex items-center gap-2 text-xs tracking-[0.18em] text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-primary-glow" /> {p.duration.toUpperCase()}
              </p>
              <h3 className="mt-3 text-2xl font-semibold">{p.name}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{p.tagline}</p>
              <p className="mt-6 font-display text-4xl font-semibold">{p.price}</p>
              <ul className="mt-7 space-y-3 text-sm">
                {p.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-glow" />
                    <span className={h.endsWith("plus:") ? "text-muted-foreground" : ""}>{h}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">Best for:</span> {p.bestFor}
              </p>
              <div className="mt-auto pt-8">
                <Link to="/book" search={{ package: p.id }}
                  className={`block rounded-full px-6 py-4 text-center text-xs font-semibold tracking-[0.18em] ${p.recommended ? "bg-gradient-primary text-primary-foreground" : "border border-border hover:bg-secondary"}`}>
                  {p.recommended ? "BOOK NOW" : "ENQUIRE"}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Full perks comparison */}
        <div className="reveal mt-20">
          <h2 className="text-2xl font-semibold md:text-3xl">Full perks comparison</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            ✓ Included · — Not included · Enhanced = upgraded version
          </p>
          <div className="mt-8 overflow-x-auto rounded-3xl border border-border">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-card">
                <tr>
                  <th className="p-5 font-medium text-muted-foreground">Features</th>
                  {packages.map((p) => (
                    <th key={p.id} className="p-5 text-center font-semibold">
                      {p.name.replace("LockIn ", "")}
                      <span className="mt-1 block text-xs font-normal text-muted-foreground">{p.duration}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="p-5 text-muted-foreground">Price</td>
                  {packages.map((p) => <td key={p.id} className="p-5 text-center font-semibold">{p.price}</td>)}
                </tr>
                {packageComparison.map((g) => (
                  <>
                    <tr key={g.group} className="border-t border-border bg-card/60">
                      <td colSpan={4} className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-glow">
                        {g.group}
                      </td>
                    </tr>
                    {g.rows.map((r) => (
                      <tr key={r.feature} className="border-t border-border">
                        <td className="p-5">{r.feature}</td>
                        {r.values.map((v, i) => (
                          <td key={i} className="p-5 text-center"><CellValue value={v} /></td>
                        ))}
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">{packagesDisclaimer}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Final pricing may depend on the selected experience, venue and event requirements. Contact us for a tailored quote.
          </p>
        </div>
      </div>
    </>
  );
}
