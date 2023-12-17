const prisma = require("../prisma");
const router = require("express").Router();
module.exports = router;

// /api/pilots - GET all pilots
router.get("/", async (req, res, next) => {
  try {
    const pilots = await prisma.pilot.findMany({
      include: {
        flights: true,
      },
    });
    res.json(pilots);
  } catch (err) {
    next(err);
  }
});

// /api/pilots/:id - GET the details of pilot specified by the id
router.get("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const result = await prisma.pilot.findUnique({
      where: {
        userId: id,
      },
      include: {
        flights: true,
        user: true,
      },
    });
    if (!result) {
      return next({
        status: 404,
        message: `Could not find pilot with id ${id}`,
      });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// /api/pilots - POST, create a new pilot
router.post("/", async (req, res, next) => {
  try {
    const { firstName, lastName, user } = req.body;
    const newPilot = await prisma.pilot.create({
      data: {
        firstName,
        lastName,
        user,
      },
    });
    res.json(newPilot);
  } catch (err) {
    next(err);
  }
});

// /api/pilots/:id - PATCH, updates a pilot by id number
router.patch("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;

    const { firstName, lastName, email, gpa, imageUrl } = req.body;

    const updatePilot = await prisma.pilot.update({
      where: { id: id },
      data: {
        firstName: firstName,
        lastName: lastName,
      },
    });

    res.json(updatePilot);
  } catch (err) {
    next(err);
  }
});

// /api/pilots/:id - DELETE, deletes a pilot by id number
router.delete("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const result = await prisma.pilot.delete({
      where: {
        id: id,
      },
    });
    if (!result) {
      return next({
        status: 404,
        message: `Could not find pilot with id ${id}`,
      });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});
