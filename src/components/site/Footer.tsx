import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { navLinks } from "./Header";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Singapore’s mobile escape-room experience. Original mysteries and immersive adventures,
            delivered directly to your venue.
          </p>
          <p className="mt-4 text-sm italic text-muted-foreground">{site.tagline}</p>
        </div>
        <div>
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.to}><Link to={l.to} className="text-muted-foreground hover:text-foreground">{l.label}</Link></li>
            ))}

          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Get in touch</p>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li>{site.email}</li>
            <li>{site.location}</li>
            {site.socials.map((s) => (
              <li key={s.label}><a href={s.href} className="hover:text-foreground">{s.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} LockIn Group. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/" hash="privacy" className="hover:text-foreground">Privacy Policy</Link>
            <Link to="/" hash="terms" className="hover:text-foreground">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
