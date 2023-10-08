import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { prisma } from "../prisma/prismaClient";
import { hashSync } from "bcrypt";

export async function registerController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerUserSchema = z.object({
    name: z.string(),
    login: z.string(),
    password: z.string(),
  });

  const register = registerUserSchema.parse(request.body);

  const { name, login, password } = register;

  const saltRounds = 10;
  const hash = hashSync(password, saltRounds);

  const user = await prisma.user.findFirst({
    where: {
      login,
    },
  });

  if (user) {
    reply.status(400).send("Já existe usuário com esse nome.");
  }

  await prisma.user.create({
    data: {
      name,
      login,
      password: hash,
    },
  });

  reply.status(201).send("Created");
}
