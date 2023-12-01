/*
  Warnings:

  - You are about to drop the `_FlightToPilot` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_FlightToPilot_B_index";

-- DropIndex
DROP INDEX "_FlightToPilot_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_FlightToPilot";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_FlightPilots" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_FlightPilots_A_fkey" FOREIGN KEY ("A") REFERENCES "Flight" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FlightPilots_B_fkey" FOREIGN KEY ("B") REFERENCES "Pilot" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Flight" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "solo" BOOLEAN NOT NULL,
    "picId" INTEGER NOT NULL,
    "sicId" INTEGER,
    "aircraftId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "departure" TEXT NOT NULL,
    "arrival" TEXT NOT NULL,
    "engineStartTime" DATETIME NOT NULL,
    "engineStopTime" DATETIME,
    CONSTRAINT "Flight_picId_fkey" FOREIGN KEY ("picId") REFERENCES "Pilot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Flight_sicId_fkey" FOREIGN KEY ("sicId") REFERENCES "Pilot" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Flight_aircraftId_fkey" FOREIGN KEY ("aircraftId") REFERENCES "Aircraft" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Flight" ("aircraftId", "arrival", "date", "departure", "engineStartTime", "engineStopTime", "id", "picId", "sicId", "solo") SELECT "aircraftId", "arrival", "date", "departure", "engineStartTime", "engineStopTime", "id", "picId", "sicId", "solo" FROM "Flight";
DROP TABLE "Flight";
ALTER TABLE "new_Flight" RENAME TO "Flight";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_FlightPilots_AB_unique" ON "_FlightPilots"("A", "B");

-- CreateIndex
CREATE INDEX "_FlightPilots_B_index" ON "_FlightPilots"("B");
