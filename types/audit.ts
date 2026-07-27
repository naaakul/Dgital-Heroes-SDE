export interface AuditRequest {
  url: string;
}

export interface SeoAnalysis {
  title: string | null;
  description: string | null;
  h1Count: number;
}

export interface PerformanceAnalysis {
  responseTime: number;
  htmlSize: number;
}

export interface AuditResult {
  url: string;

  status: number;

  cached: boolean;

  seo: SeoAnalysis;

  performance: PerformanceAnalysis;
}