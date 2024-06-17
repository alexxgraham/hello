import type { Password, User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { Object, User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function collectUserObjects(userId: User["id"]) {
  return prisma.object.findMany({
    where: { userId },
    include: { relation: { include: { timeSet: true, images: true } } },
  });
}

export async function collectUniqueObject(id: string) {
  return prisma.object.findUnique({
    where: { id },
    include: { relation: { include: { timeSet: true, images: true } } },
  });
}

export async function createUser(
  username: string,
  displayName: string,
  email: User["email"],
  password: string,
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      username,
      displayName,
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
  username: User["username"],
  password: Password["hash"],
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { username },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash,
  );

  if (!isValid) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
