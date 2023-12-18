const prisma = require("../prisma");
const router = require("express").Router();
module.exports = router;

// /api/flights - GET all flights
router.get("/", async (req, res, next) => {
  try {
    const usrId = parseInt(req.query.usrId);

    let flights;
    if (usrId) {
      flights = await prisma.flight.findMany({
        where: {
          OR: [
            { picId: usrId },
            { sicId: usrId },
          ],
        },
        include: {
          FlightTimes: true,
        },
      });
    } else {
      // If usrId is not provided, fetch all flights
      flights = await prisma.flight.findMany({
        include: {
          FlightTimes: true,
        },
      });
    }

    res.json(flights);
  } catch (err) {
    next(err);
  }
});

// /api/flights/:id - GET the details of flight specified by the id
router.get("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const result = await prisma.flight.findUnique({
      where: {
        id: id,
      },
      include: {
        pilots: true,
        aircraft: true,
        FlightTimes: true,
      },
    });
    if (!result) {
      return next({
        status: 404,
        message: `Could not find flight with id ${id}`,
      });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// /api/flights - POST, create a new flight
router.post("/", async (req, res, next) => {
  try {
    
    const { solo, picId, sicId, aircraftId, date, departure, arrival, engineStartTime, pilots} = req.body;
    if (!picId || !aircraftId || !departure || !arrival) {
      const error = {
        status: 400,
        message: "picId, aircraftId, Departure, and Arrival fields are required.",
      };
      return next(error);
    }
    const newFlight = await prisma.flight.create({
      data: {
        solo,
        picId,
        sicId,
        aircraftId,
        date,
        departure,
        arrival,
        engineStartTime,
        pilots
      },
    });
    res.json(newFlight);
  } catch (err) {
    next(err);
  }
});

// /api/flights/:id - PATCH, updates a flight by id number
router.patch("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;

    const { solo, picId, sicId, aircraftId, departure, arrival, engineStopTime, pilots } = req.body;

    const updateFlight = await prisma.flight.update({
      where: { id: id },
      data: {
        solo,
        picId,
        sicId,
        aircraftId,
        departure,
        arrival,
        engineStopTime,
        pilots,
      },
    });

    res.json(updateFlight);
  } catch (err) {
    next(err);
  }
});

// /api/flights/:id - DELETE, deletes a flight by id number
router.delete("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const result = await prisma.flight.delete({
      where: {
        id: id,
      },
    });
    if (!result) {
      return next({
        status: 404,
        message: `Could not find flight with id ${id}`,
      });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});
