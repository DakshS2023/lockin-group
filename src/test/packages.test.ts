import { describe, expect, it } from "vitest";
import { packages, comparisonGroups } from "@/content/site";
const rows = comparisonGroups.flatMap(g => g.rows);
const values = (feature: string) => rows.find(r => r.feature === feature)?.values;
describe("Proposed LockIn Plus package allocations", () => {
  it("uses the supplied gameplay durations", () => {
    expect(packages.map(p => p.duration)).toEqual(["45–50", "60", "75–80"]);
    expect(values("Game duration")).toEqual(["45–50 min", "60 min", "75–80 min"]);
  });
  it.each(["Dedicated game master", "Original storyline", "Interactive puzzles", "Hints and assistance", "Background music"])("includes %s in every package", f => expect(values(f)).toEqual(["✓", "✓", "✓"]));
  it.each([
    ["Synesthesia AV", ["Basic", "Standard", "Synesthesia+"]],
    ["Sound effects", ["Basic", "Enhanced", "Premium"]],
    ["Lighting effects", ["—", "Good", "Advanced"]],
    ["Special effects", ["—", "Good", "Advanced"]],
    ["Immersive introduction", ["—", "✓", "Enhanced"]],
    ["Customised storyline", ["—", "Limited", "Extensive"]],
    ["Personalised messages", ["—", "Limited", "✓"]],
    ["Customised puzzles", ["—", "—", "✓"]],
    ["Personalised final reveal", ["—", "—", "✓"]],
    ["Live actor", ["—", "—", "✓ Free"]],
    ["Additional game master", ["—", "—", "Upon request"]],
    ["Special finale sequence", ["—", "—", "✓"]],
    ["Premium props and equipment", ["—", "✓", "Enhanced"]],
    ["Dedicated technical operator", ["—", "✓", "✓"]],
    ["Priority setup planning", ["—", "—", "✓"]],
  ])("allocates %s as supplied", (f, expected) => expect(values(f as string)).toEqual(expected));
});
