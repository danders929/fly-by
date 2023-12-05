/*
  Warnings:

  - You are about to drop the column `pilotId` on the `Flight` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_FlightToPilot" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_FlightToPilot_A_fkey" FOREIGN KEY ("A") REFERENCES "Flight" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FlightToPilot_B_fkey" FOREIGN KEY ("B") REFERENCES "Pilot" ("id") ON DELETE CASCADE ON UPDATE CASCADE
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
    "engineStopTime" DATETIME NOT NULL,
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
CREATE UNIQUE INDEX "_FlightToPilot_AB_unique" ON "_FlightToPilot"("A", "B");

-- CreateIndex
CREATE INDEX "_FlightToPilot_B_index" ON "_FlightToPilot"("B");
