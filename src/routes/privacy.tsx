import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/privacy")({
  beforeLoad: () => { throw redirect({ to: "/", hash: "privacy", statusCode: 301 }); },
});
