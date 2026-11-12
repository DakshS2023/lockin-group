import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Room, RoomTheme } from "@/content/site";

export const themeStyles: Record<RoomTheme, { accent: string; border: string; label: string; font: string; glow: string }> = {
  horror: { accent: "text-horror", border: "hover:border-horror/60", label: "Signal lost", font: "font-mono", glow: "bg-horror/25" },
  classified: { accent: "text-classified", border: "hover:border-classified/60", label: "Case file #A-01", font: "font-mono", glow: "bg-classified/25" },
  genie: { accent: "text-genie", border: "hover:border-genie/60", label: "Ancient legend", font: "font-display", glow: "bg-genie-2/30" },
};

export function RoomCard({ room }: { room: Room }) {
  const t = themeStyles[room.theme];
  return (
    <article className={`group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:-translate-y-1 ${t.border}`}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={room.image} alt={`${room.name} escape room`} loading="lazy" width={1600} height={1008}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        <span className={`absolute left-5 top-5 rounded-full border border-border bg-background/70 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] backdrop-blur ${t.accent} ${t.font}`}>
          {t.label}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-7">
        <p className={`text-xs uppercase tracking-[0.18em] ${t.accent}`}>{room.genre}</p>
        <h3 className="mt-3 text-xl font-semibold leading-tight">{room.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{room.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {room.features.map((f) => (
            <li key={f} className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">{f}</li>
          ))}
        </ul>
        <Link to="/rooms/$slug" params={{ slug: room.slug }}
          className="mt-auto inline-flex items-center gap-2 pt-7 text-xs font-semibold tracking-[0.18em] text-foreground">
          EXPLORE EXPERIENCE <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
