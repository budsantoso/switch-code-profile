export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.switchcode.id";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "customer";
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data: {
    user: User;
    token: string;
  };
}

export interface ProductModule {
  id?: number;
  product_id?: number;
  name: string;
  description?: string | null;
  price: number | string;
  is_required: boolean;
  sort_order?: number;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  summary?: string | null;
  description?: string | null;
  base_price: string | number;
  thumbnail?: string | null;
  thumbnail_url?: string | null;
  is_active: boolean;
  modules?: ProductModule[];
  created_at?: string;
}

export interface ArticleImage {
  id: number;
  article_id: number;
  image_path: string;
  caption?: string | null;
  sort_order: number;
  url?: string | null;
}

export interface Article {
  id: number;
  author_id?: number | null;
  title: string;
  slug: string;
  summary?: string | null;
  content: string;
  is_published: boolean;
  published_at?: string | null;
  images?: ArticleImage[];
  author?: {
    id: number;
    name: string;
  };
  created_at?: string;
}
