import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [status, setStatus] = useState<"checking" | "ok" | "error">("checking");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ error }) => {
        if (error) {
          setStatus("error");
          setMessage(error.message);
        } else {
          setStatus("ok");
          setMessage("Client Supabase initialisé");
        }
      })
      .catch((err: unknown) => {
        setStatus("error");
        setMessage(err instanceof Error ? err.message : String(err));
      });
  }, []);

  const dotClass =
    status === "ok"
      ? "bg-green-500"
      : status === "error"
        ? "bg-red-500"
        : "bg-yellow-500";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        LA VOYAGERIE PLATFORM
      </h1>
      <div className="flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm">
        <span className={`inline-block h-2 w-2 rounded-full ${dotClass}`} />
        <span className="text-muted-foreground">
          {status === "checking"
            ? "Vérification Supabase…"
            : status === "ok"
              ? `Supabase connecté — ${message}`
              : `Erreur Supabase — ${message}`}
        </span>
      </div>
    </main>
  );
}
