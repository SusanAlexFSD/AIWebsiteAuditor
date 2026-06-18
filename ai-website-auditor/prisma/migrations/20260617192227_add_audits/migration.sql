-- CreateTable
CREATE TABLE "Audit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "title" TEXT,
    "seoScore" INTEGER NOT NULL,
    "contentScore" INTEGER NOT NULL,
    "technicalScore" INTEGER NOT NULL,
    "overallScore" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
