import jsPDF from "jspdf";

import type { AuditData } from "@/types/audit";

export function generatePdfReport(
  data: AuditData
) {

  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("Website Audit Report", 20, 20);

  doc.setFontSize(12);

  doc.text(`Title: ${data.title}`, 20, 40);

  doc.text(
    `SEO Score: ${data.seoAnalysis.score}`,
    20,
    50
  );

  doc.text(`Links: ${data.links}`, 20, 60);

  doc.text(`Images: ${data.images}`, 20, 70);

  doc.text(`H1 Tags: ${data.h1Count}`, 20, 80);

  doc.text(`H2 Tags: ${data.h2Count}`, 20, 90);

   doc.save("website-audit-report.pdf");
}