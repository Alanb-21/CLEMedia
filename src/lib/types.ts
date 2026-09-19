export type BlockValue = { text?: string; html?: string; url?: string; alt?: string };

export interface ContentBlock {
  id: string;
  page: string;
  section_key: string;
  type: "text" | "richtext" | "image" | "link";
  value: BlockValue;
  updated_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  category_id: string | null;
  excerpt: string | null;
  body: string | null;
  hero_image: string | null;
  hero_alt: string | null;
  status: "draft" | "scheduled" | "published";
  published_at: string | null;
  author: string | null;
}

export interface Category { id: string; name: string; slug: string; description: string | null; sort_order: number }

export interface Person {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  photo: string | null;
  type: "team" | "advisor";
  sort_order: number;
  visible: boolean;
  unconfirmed: boolean;
}

export interface MediaItem {
  id: string;
  title: string;
  outlet: string | null;
  published_on: string | null;
  description: string | null;
  thumbnail: string | null;
  link: string | null;
  embed_url: string | null;
  sort_order: number;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price_cents: number;
  currency: string;
  thumbnail: string | null;
  file_path: string;
  active: boolean;
}

export interface Settings {
  key: string;
  value: Record<string, unknown>;
}
