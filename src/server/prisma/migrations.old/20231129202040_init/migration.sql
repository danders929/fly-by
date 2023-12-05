/*
  Warnings:

  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Task";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Pilot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Flight" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "solo" BOOLEAN NOT NULL,
    "picId" INTEGER NOT NULL,
    "sicId" INTEGER NOT NULL,
    "aircraftId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "departure" TEXT NOT NULL,
    "arrival" TEXT NOT NULL,
    "engineStartTime" DATETIME NOT NULL,
    "engineStopTime" DATETIME NOT NULL,
    "pilotId" INTEGER,
    CONSTRAINT "Flight_picId_fkey" FOREIGN KEY ("picId") REFERENCES "Pilot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Flight_sicId_fkey" FOREIGN KEY ("sicId") REFERENCES "Pilot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Flight_aircraftId_fkey" FOREIGN KEY ("aircraftId") REFERENCES "Aircraft" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Flight_pilotId_fkey" FOREIGN KEY ("pilotId") REFERENCES "Pilot" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FlightTime" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "flightId" INTEGER NOT NULL,
    "timeStart" DATETIME NOT NULL,
    "timeStop" DATETIME NOT NULL,
    "dayFlight" BOOLEAN NOT NULL,
    "nightFlight" BOOLEAN NOT NULL,
    CONSTRAINT "FlightTime_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "Flight" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Aircraft" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "makeModel" TEXT NOT NULL,
    "tailNum" TEXT NOT NULL,
    "singleEngine" BOOLEAN NOT NULL,
    "hobbs" REAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Pilot_email_key" ON "Pilot"("email");
