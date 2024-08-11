/*
  Warnings:

  - You are about to drop the column `address` on the `PropertyLocation` table. All the data in the column will be lost.
  - You are about to drop the column `landmarks` on the `PropertyLocation` table. All the data in the column will be lost.
  - Added the required column `landmark` to the `PropertyLocation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streetAddress` to the `PropertyLocation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "PropertyFeature" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "parkingSpots" INTEGER NOT NULL,
    "area" INTEGER NOT NULL,
    "hasSwimmingPool" BOOLEAN NOT NULL,
    "hasGardenYard" BOOLEAN NOT NULL,
    "hasBalcony" BOOLEAN NOT NULL,
    "propertyId" INTEGER NOT NULL,
    CONSTRAINT "PropertyFeature_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PropertyLocation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "streetAddress" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "landmark" TEXT NOT NULL,
    "propertyId" INTEGER,
    CONSTRAINT "PropertyLocation_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_PropertyLocation" ("city", "id", "propertyId", "region", "state", "zip") SELECT "city", "id", "propertyId", "region", "state", "zip" FROM "PropertyLocation";
DROP TABLE "PropertyLocation";
ALTER TABLE "new_PropertyLocation" RENAME TO "PropertyLocation";
CREATE UNIQUE INDEX "PropertyLocation_propertyId_key" ON "PropertyLocation"("propertyId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "PropertyFeature_propertyId_key" ON "PropertyFeature"("propertyId");
