import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Minus } from "lucide-react";
import { packageTiers, type Tier } from "@/content/site";
import { PageHero, seo } from "@/components/site/PageHero";

export const Route = createFileRoute("/pricing")({
  head: () => seo("Packages & Pricing — LockIn & LockIn Plus", "Compare LockIn and LockIn Plus escape-room packages, including Synesthesia AV sound, lighting and visual effects."),
  component: PricingPage,
});

function PricingPage() {
  const [tier, setTier] = useState<Tier>("lockin");
  const data = packageTiers[tier];
  return (
    <>
      <PageHero eyebrow="Packages & pricing" title={<>Pick your level of <span className="text-gradient">immersion.</span></>}>
        Two ways to play. Choose the classic LockIn experience, or go further with LockIn Plus.
      </PageHero>

      <div className="mx-auto max-w-7xl px-5 pb-28 lg:px-8">
        <div className="flex justify-center">
          <div role="tablist" aria-label="Package category" className="relative inline-grid grid-cols-2 rounded-full border border-border bg-card p-1.5">
            <span aria-hidden className={`absolute inset-y-1.5 left-1.5 w-[calc(50%-0.375rem)] rounded-full bg-gradient-primary shadow-glow transition-transform duration-500 ease-out ${tier === "plus" ? "translate-x-full" : ""}`} />
            {(["lockin", "plus"] as Tier[]).map((k) => (
              <button key={k} role="tab" aria-selected={tier === k} onClick={() => setTier(k)}
                className={`relative z-10 min-w-36 rounded-full px-6 py-3 text-xs font-semibold tracking-[0.2em] transition-colors sm:min-w-44 ${tier === k ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {packageTiers[k].label.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <p key={tier + "i"} className="reveal mx-auto mt-6 max-w-xl text-center text-sm text-muted-foreground">{data.intro}</p>

        <div key={tier} className="mt-14 grid gap-6 md:grid-cols-3">
          {data.packages.map((p, i) => (
            <div key={p.id} style={{ animationDelay: `${i * 90}ms` }}
              className={`reveal relative flex flex-col rounded-3xl border p-8 ${p.recommended ? "border-primary/60 bg-gradient-to-b from-accent to-card shadow-glow" : "border-border bg-card"}`}>
              {p.recommended && <span className="absolute -top-3 left-8 rounded-full bg-gradient-primary px-3 py-1 text-[0.65rem] font-semibold tracking-[0.2em] text-primary-foreground">RECOMMENDED</span>}
              <p className="eyebrow">{data.label}</p>
              <h3 className="mt-3 text-2xl font-semibold">{p.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
              <p className="mt-6 font-display text-4xl font-semibold">{p.price}</p>
              <ul className="mt-7 space-y-3 text-sm">
                {data.comparison.map((f) => {
                  const has = p.features.includes(f);
                  return (
                    <li key={f} className={`flex items-start gap-3 ${has ? "" : "text-muted-foreground/50"}`}>
                      {has ? <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-glow" /> : <Minus className="mt-0.5 h-4 w-4 shrink-0" />}
                      {f}
                    </li>
                  );
                })}
              </ul>
              <Link to="/book" search={{ package: p.id }}
                className={`mt-auto block rounded-full pt-0 text-center text-xs font-semibold tracking-[0.18em] ${p.recommended ? "bg-gradient-primary text-primary-foreground" : "border border-border hover:bg-secondary"} mt-8 px-6 py-4`}>
                {p.recommended ? "BOOK NOW" : "ENQUIRE"}
              </Link>
            </div>
          ))}
        </div>

        <div key={tier + "t"} className="reveal mt-20">
          <h2 className="text-2xl font-semibold md:text-3xl">Compare {data.label} packages</h2>
          <div className="mt-8 overflow-x-auto rounded-3xl border border-border">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-card">
                <tr>
                  <th className="p-5 font-medium text-muted-foreground">Feature</th>
                  {data.packages.map((p) => <th key={p.id} className="p-5 text-center font-semibold">{p.name}</th>)}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="p-5 text-muted-foreground">Price</td>
                  {data.packages.map((p) => <td key={p.id} className="p-5 text-center">{p.price}</td>)}
                </tr>
                {data.comparison.map((f) => (
                  <tr key={f} className="border-t border-border">
                    <td className="p-5">{f}</td>
                    {data.packages.map((p) => (
                      <td key={p.id} className="p-5 text-center">
                        {p.features.includes(f) ? <Check className="mx-auto h-4 w-4 text-primary-glow" aria-label="Included" /> : <Minus className="mx-auto h-4 w-4 text-muted-foreground/40" aria-label="Not included" />}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Note: final pricing may depend on the selected experience, venue and event requirements. Contact us for a tailored quote.
          </p>
        </div>
      </div>
    </>
  );
}
