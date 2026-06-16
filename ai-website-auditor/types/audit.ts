export interface AuditData {
  title: string;
  pageUrl: string;
  metaDescription: string | null;
  links: number;
  images: number;
  h1Count: number;
  h2Count: number;

   performance?: number;
  accessibility?: number;
  seo?: number;
  bestPractices?: number;
}

export interface AuditResponse {
  success: boolean;
  data?: AuditData;
  message?: string;
}

