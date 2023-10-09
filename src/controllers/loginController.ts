import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { compareSync } from "bcrypt";
import { prisma } from "../prisma/prismaClient";

export async function loginController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const loginUserSchema = z.object({
    login: z.string(),
    password: z.string(),
  });

  const loginUser = loginUserSchema.parse(request.body);

  const { login, password } = loginUser;

  const user = await prisma.user.findFirst({
    where: {
      login,
    },
  });

  if (!user) {
    reply.status(400).send("Usuário não encontrado");
  }

  if (user) {
    const decode = compareSync(password, user?.password);

    if (!decode) {
      reply.status(400).send("Senha invalida!");
    }

    const token = await reply.jwtSign(
      { id: user.id, nome: user.name },
      {
        sign: {
          expiresIn: 60 * 60 * 24 * 7, //7 days
        },
      }
    );

    reply
      .cookie("token", token)
      .status(200)
      .send("Usuário logado com sucesso!");
  }
}
