-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Pilot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Pilot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Flight" (
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

-- CreateTable
CREATE TABLE "_FlightPilots" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_FlightPilots_A_fkey" FOREIGN KEY ("A") REFERENCES "Flight" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FlightPilots_B_fkey" FOREIGN KEY ("B") REFERENCES "Pilot" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_FlightPilots_AB_unique" ON "_FlightPilots"("A", "B");

-- CreateIndex
CREATE INDEX "_FlightPilots_B_index" ON "_FlightPilots"("B");
