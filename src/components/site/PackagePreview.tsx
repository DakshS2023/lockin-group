import { Link } from "@tanstack/react-router";
import { Check, Clock } from "lucide-react";
import { packages, packagesIntro } from "@/content/site";

export function PackagePreview() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-28 lg:px-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">LockIn Packages</p>
          <h2 className="mt-5 text-3xl font-semibold md:text-5xl">Choose your level of adventure.</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">{packagesIntro}</p>
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {packages.map((p) => (
          <div
            key={p.id}
            className={`relative flex flex-col rounded-3xl border p-7 md:p-8 ${
              p.recommended
                ? "border-primary/60 bg-gradient-to-b from-accent to-card shadow-glow"
                : "border-border bg-card/40"
            }`}
          >
            {p.recommended && (
              <span className="absolute -top-3 left-7 rounded-full bg-gradient-primary px-3 py-1 text-[0.6rem] font-semibold tracking-[0.2em] text-primary-foreground">
                RECOMMENDED
              </span>
            )}
            <p className="inline-flex items-center gap-2 text-xs tracking-[0.18em] text-muted-foreground">
              <Clock className="h-3.5 w-3.5 text-primary-glow" /> {p.duration.toUpperCase()}
            </p>
            <h3 className="mt-3 text-2xl font-semibold">{p.name}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{p.tagline}</p>
            <ul className="mt-6 space-y-2.5 text-sm">
              {p.highlights.slice(0, 4).map((h) => (
                <li key={h} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-glow" />
                  <span className={h.endsWith("plus:") ? "text-muted-foreground" : ""}>{h}</span>
                </li>
              ))}
              {p.highlights.length > 4 && (
                <li className="pl-6 text-xs text-muted-foreground/70">+{p.highlights.length - 4} more</li>
              )}
            </ul>
            <p className="mt-auto pt-6 text-xs leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">Best for:</span> {p.bestFor}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          to="/pricing"
          className="rounded-full bg-gradient-primary px-8 py-4 text-xs font-semibold tracking-[0.18em] text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
        >
          READ MORE — FULL PACKAGE COMPARISON
        </Link>
      </div>
    </section>
  );
}
