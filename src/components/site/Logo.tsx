export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-glow">
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
      </span>
      <span className="font-display text-base font-semibold tracking-tight">
        Lock<span className="text-gradient">In</span>
        <span className="ml-1.5 text-[0.65rem] font-normal tracking-[0.25em] text-muted-foreground">GROUP</span>
      </span>
    </span>
  );
}
