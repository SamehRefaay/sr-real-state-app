/*
  Warnings:

  - You are about to drop the column `value` on the `Property` table. All the data in the column will be lost.
  - Added the required column `description` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Property" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,
    CONSTRAINT "Property_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Property_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "PropertyType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Property_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "PropertyStatus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Property" ("id", "statusId", "typeId", "userId") SELECT "id", "statusId", "typeId", "userId" FROM "Property";
DROP TABLE "Property";
ALTER TABLE "new_Property" RENAME TO "Property";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
