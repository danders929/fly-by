const prisma = require("../prisma");
const router = require("express").Router();
module.exports = router;

// /api/aircraft - GET all aircraft
router.get("/", async (req, res, next) => {
  try {
    const aircraft = await prisma.aircraft.findMany({
      include: {
        flights: true,
      },
    });
    res.json(aircraft);
  } catch (err) {
    next(err);
  }
});

// /api/aircraft/:id - GET the details of aircraft specified by the id
router.get("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const result = await prisma.aircraft.findUnique({
      where: {
        id: id,
      },
      include: {
        flights: true,
      },
    });
    if (!result) {
      return next({
        status: 404,
        message: `Could not find aircraft with id ${id}`,
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
    if (!makeModel || !tailNum || !singleEngine || !hobbs) {
      const error = {
        status: 400,
        message: "All fields are required.",
      };
      return next(error);
    }
    const newAircraft = await prisma.aircraft.create({
      data: {
        makeModel: makeModel,
        tailNum: tailNum,
        singleEngine: singleEngine,
        hobbs: hobbs,
      },
    });
    res.json(newAircraft);
  } catch (err) {
    next(err);
  }
});

// /api/aircraft/:id - PATCH, updates a aircraft by id number
router.patch("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;

    const { makeModel, tailNum, singleEngine, hobbs } = req.body;

    const updateAircraft = await prisma.aircraft.update({
      where: { id: id },
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

// /api/aircraft/:id - DELETE, deletes a aircraft by id number
router.delete("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const result = await prisma.aircraft.delete({
      where: {
        id: id,
      },
    });
    if (!result) {
      return next({
        status: 404,
        message: `Could not find aircraft with id ${id}`,
      });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});
