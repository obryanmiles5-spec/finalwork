export interface Product {
  id: string;
  name: string;
  chemicalName: string;
  category: string;
  purity: string; // e.g. "99.2%"
  concentration: string; // e.g. "5mg", "10mg"
  price: number;
  image: string; // Base64 or SVG placeholder data
  fallbackSvg?: string; // Preserve original SVG if image path is overridden
  badge?: 'Featured' | 'New' | 'Best Seller' | null;
  shortDesc: string;
  longDesc: string;
  benefits: string[];
  usageInfo: string;
  storageInfo: string;
  specifications: Record<string, string>;
  faqs: { question: string; answer: string }[];
  seoTitle: string;
  seoMetaDesc: string;
  schemaMarkup: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  date: string;
  category: string;
  readTime: string;
  featuredImage: string;
  introduction: string;
  sections: {
    heading: string;
    content: string;
    subsections?: { title: string; content: string }[];
  }[];
  faqs: { question: string; answer: string }[];
  tableOfContents: string[];
  callToAction: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}
