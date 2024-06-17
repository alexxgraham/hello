import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "admin@aode.space";

  // await prisma.user.delete({ where: { email } }).catch();

  const hashedPassword = await bcrypt.hash("admin", 10);

  await prisma.user.create({
    data: {
      username: "owner",
      displayName: "Owner",
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
