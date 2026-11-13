import { Link } from "@tanstack/react-router";

export function CtaBand() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-28 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card px-8 py-16 text-center md:px-16 md:py-20">
        <div className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-[700px] -translate-x-1/2 rounded-full bg-primary/30 blur-[100px]" />
        <h2 className="relative text-3xl font-semibold md:text-5xl">Ready to lock in?</h2>
        <p className="relative mx-auto mt-5 max-w-lg text-muted-foreground">Tell us about your event and we’ll help you find the perfect experience.</p>
        <Link to="/book" className="relative mt-9 inline-flex rounded-full bg-gradient-primary px-8 py-4 text-xs font-semibold tracking-[0.18em] text-primary-foreground shadow-glow">
          BOOK A CONSULTATION
        </Link>
      </div>
    </section>
  );
}
