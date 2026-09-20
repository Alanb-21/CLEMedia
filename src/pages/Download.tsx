import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { Button, Container, Section } from "@/components/ui";
import { IconDownload } from "@/components/icons";

type ErrorCode = "not_found" | "expired" | "exhausted" | "server_error";

type State =
  | { k: "loading" }
  | { k: "ready"; url: string; title: string; used: number; allowed: number }
  | { k: "error"; code: ErrorCode };

const MESSAGES = {
  not_found: {
    h: "We couldn't find that download",
    p: "The link may be wrong or incomplete. Check the link in your Stripe receipt, or get in touch and we will sort it out.",
  },
  expired: {
    h: "This link has expired",
    p: "Download links are valid for 24 hours. Get in touch with your receipt and we will issue a new one.",
  },
  exhausted: {
    h: "This link has been used up",
    p: "Each link allows five downloads. Get in touch with your receipt and we will issue a new one.",
  },
  server_error: {
    h: "Something went wrong",
    p: "That is on us, not you. Try again in a moment, and if it keeps happening let us know.",
  },
} as const;

function code_of(v: unknown): ErrorCode {
  return v === "not_found" || v === "expired" || v === "exhausted" ? v : "server_error";
}

export default function Download() {
  const { token } = useParams();
  const [state, setState] = useState<State>({ k: "loading" });

  const fetchLink = useCallback(async () => {
    if (!token || token === "pending") {
      setState({ k: "error", code: "not_found" });
      return;
    }
    setState({ k: "loading" });
    try {
      const r = await fetch(`/api/download?token=${encodeURIComponent(token)}`);
      const d = await r.json();
      if (!r.ok) {
        const code: ErrorCode = code_of(d.error);
        setState({ k: "error", code });
        return;
      }
      setState({ k: "ready", url: d.url, title: d.title, used: d.downloadsUsed, allowed: d.downloadsAllowed });
    } catch {
      setState({ k: "error", code: "server_error" });
    }
  }, [token]);

  useEffect(() => { void fetchLink(); }, [fetchLink]);

  return (
    <>
      <Seo title="Your download" description="Download your purchase." path={`/download/${token ?? ""}`} noIndex />
      <Section>
        <Container>
          <div className="max-w-[54ch]">
            {state.k === "loading" && (
              <>
                <h1 className="text-[length:var(--text-h1)]">Preparing your download…</h1>
                <p className="mt-4 font-body text-[length:var(--text-lead)]">One moment.</p>
              </>
            )}

            {state.k === "ready" && (
              <>
                <p className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-red-deep">
                  Payment received
                </p>
                <h1 className="mt-4 text-[length:var(--text-h1)]">{state.title} is ready</h1>

                <div className="glass-warm mt-6 rounded-[var(--radius-lg)] border-l-[3px] !border-l-red px-5 py-4">
                  <p className="font-body text-[15px] font-semibold text-ink">Save this file now.</p>
                  <p className="mt-1 font-body text-[14.5px] text-body">
                    We do not create an account for you, so there is nowhere to come back to. This
                    link works for 24 hours and up to {state.allowed} downloads
                    {state.used > 1 && `, and you have used ${state.used}`}.
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href={state.url}>Download {state.title}<IconDownload size={17} /></Button>
                  <Button to="/shop" variant="secondary">Back to the shop</Button>
                </div>
              </>
            )}

            {state.k === "error" && (
              <>
                <h1 className="text-[length:var(--text-h1)]">{MESSAGES[state.code].h}</h1>
                <p className="mt-4 font-body text-[length:var(--text-lead)] leading-relaxed">
                  {MESSAGES[state.code].p}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {state.code === "server_error" && <Button onClick={() => void fetchLink()}>Try again</Button>}
                  <Button to="/contact" variant={state.code === "server_error" ? "secondary" : "primary"}>
                    Get in touch
                  </Button>
                  <Button to="/shop" variant="secondary">Back to the shop</Button>
                </div>
              </>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
