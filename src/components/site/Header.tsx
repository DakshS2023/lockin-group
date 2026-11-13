import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/pricing", label: "Packages" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "border-b border-border bg-background/85 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
        <Link to="/" onClick={() => setOpen(false)} aria-label="LockIn Group home">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/contact" hash="consultation"
            className="hidden rounded-full bg-gradient-primary px-5 py-2.5 text-xs font-semibold tracking-wider text-primary-foreground shadow-glow transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            BOOK A CONSULTATION
          </Link>
          <Button variant="ghost" size="icon"
            className="rounded-full p-2 text-foreground lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border px-5 pb-6 pt-2 lg:hidden" aria-label="Mobile">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block border-b border-border py-4 font-display text-lg"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact" hash="consultation"
            onClick={() => setOpen(false)}
            className="mt-5 flex justify-center rounded-full bg-gradient-primary px-5 py-3.5 text-sm font-semibold tracking-wider text-primary-foreground"
          >
            BOOK A CONSULTATION
          </Link>
        </nav>
      )}
    </header>
  );
}
