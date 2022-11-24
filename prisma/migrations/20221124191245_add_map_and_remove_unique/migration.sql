/*
  Warnings:

  - You are about to drop the column `imageURL` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `secondName` on the `Plant` table. All the data in the column will be lost.
  - Added the required column `second_name` to the `Plant` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Plant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "second_name" TEXT NOT NULL,
    "image_url" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Plant" ("id", "name") SELECT "id", "name" FROM "Plant";
DROP TABLE "Plant";
ALTER TABLE "new_Plant" RENAME TO "Plant";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
