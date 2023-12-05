const prisma = require("../prisma");

/** Seeds the database with a user and some tasks */
const seed = async () => {
  await prisma.user.upsert({
    where: {
      email: "foo@bar.com",
    },
    update: {},
    create: {
      email: "foo@bar.com",
      password: "bar",
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
