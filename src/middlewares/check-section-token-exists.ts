import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";
import { env } from "../env";

export async function checkSectionTokenExists(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { token } = request.cookies;
    if (token) {
      jwt.verify(token, env.SECRET_JWT);
    }
  } catch (error) {
    reply.status(401).send("Não autorizado");
  }
}
