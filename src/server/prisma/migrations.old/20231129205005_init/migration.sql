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
    "pilotId" INTEGER,
    CONSTRAINT "Flight_picId_fkey" FOREIGN KEY ("picId") REFERENCES "Pilot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Flight_sicId_fkey" FOREIGN KEY ("sicId") REFERENCES "Pilot" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Flight_aircraftId_fkey" FOREIGN KEY ("aircraftId") REFERENCES "Aircraft" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Flight_pilotId_fkey" FOREIGN KEY ("pilotId") REFERENCES "Pilot" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Flight" ("aircraftId", "arrival", "date", "departure", "engineStartTime", "engineStopTime", "id", "picId", "pilotId", "sicId", "solo") SELECT "aircraftId", "arrival", "date", "departure", "engineStartTime", "engineStopTime", "id", "picId", "pilotId", "sicId", "solo" FROM "Flight";
DROP TABLE "Flight";
ALTER TABLE "new_Flight" RENAME TO "Flight";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
