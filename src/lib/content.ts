import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

/**
 * The CMS read layer.
 *
 * Every editable string on the site goes through here. The rule that makes it
 * worth having: a page NEVER blocks on the network for its own copy. The copy
 * written into the page source is the default and ships in the bundle, so the
 * page renders complete with no JavaScript, no Supabase and no request. If a
 * `content_blocks` row exists for that key, it replaces the default once it
 * arrives.
 *
 * That ordering is what lets Conor edit any paragraph without the site
 * depending on the database being up, and it is why there is no loading state
 * and no skeleton anywhere in this file.
 *
 *   const heading = useBlock("home", "hero.title", "Children's media made …");
 *
 * One fetch per page, cached for the session. Not per block: eight blocks on a
 * page must not be eight round trips.
 */

type Blocks = Record<string, string>;

const cache = new Map<string, Blocks>();
const inflight = new Map<string, Promise<Blocks>>();

async function loadPage(page: string): Promise<Blocks> {
  const hit = cache.get(page);
  if (hit) return hit;

  const running = inflight.get(page);
  if (running) return running;

  const p = (async (): Promise<Blocks> => {
    if (!supabase) return {};
    const { data, error } = await supabase
      .from("content_blocks")
      .select("section_key, value")
      .eq("page", page);

    // A CMS failure must never blank the page: the defaults are already
    // rendered, so the correct response to an error is to keep them.
    if (error || !data) return {};

    const out: Blocks = {};
    for (const row of data) {
      const v = (row as { value: unknown }).value;
      const text =
        typeof v === "string"
          ? v
          : v && typeof v === "object" && "text" in (v as Record<string, unknown>)
            ? String((v as Record<string, unknown>).text ?? "")
            : "";
      if (text) out[(row as { section_key: string }).section_key] = text;
    }
    return out;
  })();

  inflight.set(page, p);
  const result = await p;
  cache.set(page, result);
  inflight.delete(page);
  return result;
}

/** Loads a page's blocks once. Call it at the top of a page component. */
export function usePageBlocks(page: string): Blocks {
  const [blocks, setBlocks] = useState<Blocks>(() => cache.get(page) ?? {});

  useEffect(() => {
    let live = true;
    loadPage(page).then((b) => {
      if (live) setBlocks(b);
    });
    return () => {
      live = false;
    };
  }, [page]);

  return blocks;
}

/**
 * Resolve one block against the loaded set.
 *
 * `fallback` is the real shipping copy, not a placeholder. Anything written
 * here is what an investor reads if the database is empty, which on this build
 * is the normal case.
 */
export function block(blocks: Blocks, key: string, fallback: string): string {
  return blocks[key] ?? fallback;
}
