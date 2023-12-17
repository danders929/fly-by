const { ServerError } = require("../../errors");
const prisma = require("../../prisma");
const jwt = require("./jwt");
const bcrypt = require("bcrypt");
const router = require("express").Router();
module.exports = router;

/** Creates new account and returns token */
router.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if username and password provided
    if (!email || !password) {
      throw new ServerError(400, "Username and password required.");
    }

    // Check if account already exists
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user) {
      throw new ServerError(
        400,
        `Account with the email address "${email}" already exists.`
      );
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: { email, password },
    });

    const token = jwt.sign({ id: newUser.id });
    const userId = newUser.id;
    res.json({ token, userId});
  } catch (err) {
    next(err);
  }
});

/** Returns token for account if credentials valid */
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if username and password provided
    if (!email || !password) {
      throw new ServerError(400, "email and password required.");
    }

    // Check if account exists
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new ServerError(
        400,
        `Account with the email address "${email}" does not exist.`
      );
    }

    // Check if password is correct
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new ServerError(401, "Invalid password.");
    }

    const token = jwt.sign({ id: user.id });
    const userId = user.id;
    res.json({ token, userId });
  } catch (err) {
    next(err);
  }
});
