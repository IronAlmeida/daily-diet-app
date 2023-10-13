/*
  Warnings:

  - You are about to drop the `streaks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "streaks";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "streak" DECIMAL NOT NULL DEFAULT 0,
    "best_streak" DECIMAL NOT NULL DEFAULT 0
);
INSERT INTO "new_users" ("id", "login", "name", "password") SELECT "id", "login", "name", "password" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_login_key" ON "users"("login");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
