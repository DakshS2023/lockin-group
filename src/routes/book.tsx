import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/book")({
  validateSearch: (s: Record<string, unknown>): { room?: string; package?: string } => ({
    ...(typeof s.room === "string" ? { room: s.room } : {}),
    ...(typeof s.package === "string" ? { package: s.package } : {}),
  }),
  beforeLoad: ({ search }) => { throw redirect({ to: "/contact", search, hash: "consultation", statusCode: 301 }); },
});
