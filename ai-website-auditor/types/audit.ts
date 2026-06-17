export interface AuditData {
  title: string;
  pageUrl: string;
  metaDescription: string | null;
  links: number;
  images: number;
  h1Count: number;
  h2Count: number;
  screenshot: string;
  recommendations: string[];

  seoAnalysis: {
    score: number;

    checks: {
      hasTitle: boolean;
      hasMetaDescription: boolean;
      hasH1: boolean;
    };
  };
}

export interface AuditResponse {
  success: boolean;
  data?: AuditData;
  message?: string;
}