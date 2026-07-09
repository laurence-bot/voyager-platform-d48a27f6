import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/agence-cassis")({
  beforeLoad: () => {
    throw redirect({ to: "/agence" });
  },
  component: () => null,
});
