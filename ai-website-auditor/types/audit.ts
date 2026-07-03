export interface AuditData {
  title: string;
  pageUrl: string;
  metaDescription: string | null;

  links: number;
  images: number;

  missingAltTags: number;

  h1Count: number;
  h2Count: number;

  screenshot: string;

  seoAnalysis: {
  score: number;

  checks: {
    hasTitle: boolean;
    hasMetaDescription: boolean;
    hasH1: boolean;

    titleLengthGood: boolean;
    metaLengthGood: boolean;

    singleH1: boolean;

    hasCanonical: boolean;

    hasOgTitle: boolean;
    hasOgDescription: boolean;
    hasOgImage: boolean;
  };
};
  contentAnalysis: {
    score: number;
  };

  technicalAnalysis: {
  score: number;
  checks: {
    usesHttps: boolean;
    hasViewport: boolean;
    hasRobots: boolean;
    hasSitemap: boolean;
    hasSchema: boolean;
  };
};

  accessibilityAnalysis: {
  score: number;
};

  overallScore: number;

  recommendations: string[];

  aiRecommendations: string;

  hasCanonical: boolean;

hasOgTitle: boolean;
hasOgDescription: boolean;
hasOgImage: boolean;
}

export interface AuditResponse {
  success: boolean;
  data?: AuditData;
  message?: string;
}