-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Audit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "url" TEXT NOT NULL,
    "title" TEXT,
    "seoScore" INTEGER NOT NULL,
    "contentScore" INTEGER NOT NULL,
    "technicalScore" INTEGER NOT NULL,
    "overallScore" INTEGER NOT NULL,
    "metaDescription" TEXT,
    "links" INTEGER,
    "images" INTEGER,
    "missingAltTags" INTEGER,
    "h1Count" INTEGER,
    "h2Count" INTEGER,
    "screenshot" TEXT,
    "aiRecommendations" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Audit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Audit" ("aiRecommendations", "contentScore", "createdAt", "h1Count", "h2Count", "id", "images", "links", "metaDescription", "missingAltTags", "overallScore", "screenshot", "seoScore", "technicalScore", "title", "url") SELECT "aiRecommendations", "contentScore", "createdAt", "h1Count", "h2Count", "id", "images", "links", "metaDescription", "missingAltTags", "overallScore", "screenshot", "seoScore", "technicalScore", "title", "url" FROM "Audit";
DROP TABLE "Audit";
ALTER TABLE "new_Audit" RENAME TO "Audit";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
