import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/experience")({
  beforeLoad: () => { throw redirect({ to: "/", hash: "highlights", statusCode: 301 }); },
});
