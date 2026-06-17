export interface AuditData {
  title: string;
  pageUrl: string;
  metaDescription: string | null;

  links: number;
  images: number;

  h1Count: number;
  h2Count: number;

  screenshot: string;

  seoAnalysis: {
    score: number;

    checks: {
      hasTitle: boolean;
      hasMetaDescription: boolean;
      hasH1: boolean;
    };
  };

  contentAnalysis: {
    score: number;
  };

  technicalAnalysis: {
    score: number;
  };

  overallScore: number;

  recommendations: string[];

  aiRecommendations: string;
}

export interface AuditResponse {
  success: boolean;
  data?: AuditData;
  message?: string;
}