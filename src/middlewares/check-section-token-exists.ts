import { FastifyRequest, FastifyReply } from "fastify";

export async function checkSectionTokenExists(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    await request.jwtVerify();
  } catch (error) {
    reply.status(401).send({ message: "Não autorizado" });
  }
}
