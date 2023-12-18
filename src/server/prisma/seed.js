const prisma = require("../prisma");

/** Seeds the database with users and some tasks */
const seed = async () => {
  // Seed user John Filks
  await prisma.user.upsert({
    where: {
      email: "JohnFilks@email.com",
    },
    update: {},
    create: {
      email: "JohnFilks@email.com",
      password: "#2ks91A",
      profile: {
        create: [
          {
            firstName: "John",
            lastName: "Filks",
          },
        ],
      },
    },
  });

  // Seed user Barry Lamar
  await prisma.user.upsert({
    where: {
      email: "BarryLamar@email.com",
    },
    update: {},
    create: {
      email: "BarryLamar@email.com",
      password: "3Dca9s.!",
      profile: {
        create: [
          {
            firstName: "Barry",
            lastName: "Lamar",
          },
        ],
      },
    },
  });

  // Seed Aircraft N334CA
  await prisma.aircraft.create({
    data: {
      makeModel: "King Air B-350",
      tailNum: "N334CA",
      singleEngine: false,
      hobbs: 2311.52,
    },
  });

  // Seed Aircraft N832SD
  await prisma.aircraft.create({
    data: {
      makeModel: "Cessna 120",
      tailNum: "N832SD",
      singleEngine: true,
      hobbs: 523.64,
    },
  });

  // Flight 1 for N334CA
  await prisma.flight.create({
    data: {
      solo: true,
      picId: 1,
      aircraftId: 1,
      date: "2023-12-17T17:16:23.184Z",
      departure: "AUS",
      arrival: "AUS",
      engineStartTime: "2023-12-17T17:16:23.184Z",
      engineStopTime: "2023-12-17T18:26:16.000Z",
      FlightTimes: {
        create: [
          {
            timeStart: "2023-12-17T17:20:23.184Z",
            timeStop: "2023-12-17T18:21:16.000Z",
            dayFlight: true,
            nightFlight: false,
          },
        ],
      },
      pilots: {
        connect: [
          {
            id: 1,
          },
        ],
      },
    },
  });
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
