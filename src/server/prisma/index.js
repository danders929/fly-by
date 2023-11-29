const { PrismaClient } = require('@prisma/client');
let prisma = new PrismaClient();



// Following code is for when we wish to implement hashing passwords and JWT
// const bcrypt = require("bcrypt");

// // Hash user password before saving to database
// prisma = prisma.$extends({
//   query: {
//     user: {
//       async create({ args, query }) {
//         const password = await bcrypt.hash(args.data.password, 10);
//         args.data.password = password;
//         return query(args);
//       },
//     },
//   },
// });

module.exports = prisma;
