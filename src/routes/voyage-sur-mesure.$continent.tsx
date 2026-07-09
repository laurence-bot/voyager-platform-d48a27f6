import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/voyage-sur-mesure/$continent")({
  component: () => <Outlet />,
});
