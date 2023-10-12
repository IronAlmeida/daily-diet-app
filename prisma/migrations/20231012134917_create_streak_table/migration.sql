-- CreateTable
CREATE TABLE "streaks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "streak" DECIMAL NOT NULL DEFAULT 0,
    "best_streak" DECIMAL NOT NULL DEFAULT 0,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "streaks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
