import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { packageTiers, type Tier } from "@/content/site";

export function PackagePreview() {
  const tiers = Object.keys(packageTiers) as Tier[];

  return (
    <section className="mx-auto max-w-7xl px-5 pb-28 lg:px-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Packages</p>
          <h2 className="mt-5 text-3xl font-semibold md:text-5xl">Pick your level of immersion.</h2>
        </div>
        <Link
          to="/pricing"
          className="text-xs font-semibold tracking-[0.18em] text-muted-foreground hover:text-foreground"
        >
          SEE FULL COMPARISON →
        </Link>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {tiers.map((tierKey) => {
          const data = packageTiers[tierKey];
          return (
            <div
              key={tierKey}
              className="rounded-3xl border border-border bg-card/40 p-7 md:p-9"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-semibold">
                  {data.label}
                  {tierKey === "plus" && (
                    <span className="ml-3 rounded-full bg-gradient-primary px-3 py-1 text-[0.6rem] font-semibold tracking-[0.2em] text-primary-foreground align-middle">
                      SYNETHESIA AV
                    </span>
                  )}
                </h3>
                <span className="text-xs tracking-[0.18em] text-muted-foreground">
                  {data.packages.length} PACKAGES
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{data.intro}</p>

              <ul className="mt-7 space-y-3">
                {data.packages.map((p) => (
                  <li
                    key={p.id}
                    className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl border px-5 py-4 ${
                      p.recommended ? "border-primary/60 bg-accent" : "border-border bg-background"
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="flex flex-wrap items-center gap-2 font-semibold">
                        {p.name}
                        {p.recommended && (
                          <span className="rounded-full bg-gradient-primary px-2.5 py-0.5 text-[0.55rem] font-semibold tracking-[0.18em] text-primary-foreground">
                            RECOMMENDED
                          </span>
                        )}
                      </p>
                      <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                        {data.comparison
                          .filter((f) => p.features.includes(f))
                          .slice(0, 3)
                          .map((f) => (
                            <span key={f} className="inline-flex items-center gap-1">
                              <Check className="h-3 w-3 shrink-0 text-primary-glow" />
                              {f}
                            </span>
                          ))}
                        {p.features.length > 3 && (
                          <span className="text-muted-foreground/70">
                            +{p.features.length - 3} more
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-display text-2xl font-semibold">{p.price}</span>
                      <Link
                        to="/book"
                        search={{ package: p.id }}
                        className="rounded-full border border-border px-4 py-2 text-[0.65rem] font-semibold tracking-[0.18em] hover:bg-secondary"
                      >
                        ENQUIRE
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Final pricing may depend on the selected experience, venue and event requirements.
      </p>
    </section>
  );
}
