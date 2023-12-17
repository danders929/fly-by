const prisma = require("../prisma");
const router = require("express").Router();
module.exports = router;

// /api/aircraft - GET all aircraft
router.get("/", async (req, res, next) => {
  try {
    const aircraft = await prisma.aircraft.findMany({
      include: {
        flights: {
          include: {
            FlightTimes: true,
          },
        },
      },
    });
    res.json(aircraft);
  } catch (err) {
    next(err);
  }
});

// /api/aircraft/:aircraftId - GET the details of aircraft specified by the id
router.get("/:aircraftId", async (req, res, next) => {
  try {
    const aircraftId = +req.params.aircraftId;
    const result = await prisma.aircraft.findUnique({
      where: {
        id: aircraftId,
      },
      include: {
        flights: {
          include: {
            FlightTimes: true,
          },
        },
      },
    });
    if (!result) {
      return next({
        status: 404,
        message: `Could not find aircraft with id ${aircraftId}`,
      });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// /api/aircraft - POST, create a new aircraft
router.post("/", async (req, res, next) => {
  try {
    const { makeModel, tailNum, singleEngine, hobbs } = req.body;
    const newAircraft = await prisma.aircraft.create({
      data: {
        makeModel: makeModel,
        tailNum: tailNum,
        singleEngine: singleEngine,
        hobbs: parseFloat(hobbs),
      },
    });
    res.json(newAircraft);
  } catch (err) {
    next(err);
  }
});

// /api/aircraft/:id - PATCH, updates a aircraft by id number
router.patch("/:aircraftId", async (req, res, next) => {
  try {
    const aircraftId = +req.params.aircraftId;

    const { makeModel, tailNum, singleEngine, hobbs } = req.body;

    const updateAircraft = await prisma.aircraft.update({
      where: { id: aircraftId },
      data: {
        makeModel: makeModel,
        tailNum: tailNum,
        singleEngine: singleEngine,
        hobbs: hobbs,
      },
    });

    res.json(updateAircraft);
  } catch (err) {
    next(err);
  }
});

// Currently not in use. May implement later.
//
// /api/aircraft/:id - DELETE, deletes a aircraft by id number
// router.delete("/:id", async (req, res, next) => {
//   try {
//     const id = +req.params.id;
//     const result = await prisma.aircraft.delete({
//       where: {
//         id: id,
//       },
//     });
//     if (!result) {
//       return next({
//         status: 404,
//         message: `Could not find aircraft with id ${id}`,
//       });
//     }
//     res.json(result);
//   } catch (err) {
//     next(err);
//   }
// });
