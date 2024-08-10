/*
  Warnings:

  - You are about to drop the column `statusId` on the `PropertyStatus` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `PropertyType` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PropertyStatus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL
);
INSERT INTO "new_PropertyStatus" ("id", "value") SELECT "id", "value" FROM "PropertyStatus";
DROP TABLE "PropertyStatus";
ALTER TABLE "new_PropertyStatus" RENAME TO "PropertyStatus";
CREATE TABLE "new_PropertyType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL
);
INSERT INTO "new_PropertyType" ("id", "value") SELECT "id", "value" FROM "PropertyType";
DROP TABLE "PropertyType";
ALTER TABLE "new_PropertyType" RENAME TO "PropertyType";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
