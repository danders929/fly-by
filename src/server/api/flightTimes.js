const prisma = require("../prisma");
const router = require("express").Router();
module.exports = router;

// /api/flightTimes - GET all flightTimes
router.get("/", async (req, res, next) => {
  try {
    const flightTimes = await prisma.flightTime.findMany({
      include: {
        flight: true,
      },
    });
    res.json(flightTimes);
  } catch (err) {
    next(err);
  }
});

// /api/flightTimes/:id - GET the details of flightTime specified by the id
router.get("/:id", async (req, res, next) => {
  try {
    const id = +req.params.flt_id;
    const result = await prisma.flightTime.findUnique({
      where: {
        id: id,
      },
      include: {
        flight: true,
      },
    });
    if (!result) {
      return next({
        status: 404,
        message: `Could not find flightTime with id ${id}`,
      });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// /api/flightTimes - POST, create a new flightTime
router.post("/", async (req, res, next) => {
  try {
    const { flightTime } = req.body;
    const newFlightTime = await prisma.flightTime.create({
      data: {
        flightId,
        timeStart,
        dayFlight,
        nightFlight,
      },
    });
    res.json(newFlightTime);
  } catch (err) {
    next(err);
  }
});

// /api/flightTimes/:id - PATCH, updates a flightTime by id number
router.patch("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const { timeStop } = req.body;

    const updateFlightTime = await prisma.flightTime.update({
      where: { id: id },
      data: {
        timeStop
      },
    });

    res.json(updateFlightTime);
  } catch (err) {
    next(err);
  }
});
