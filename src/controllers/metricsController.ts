import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../prisma/prismaClient";

export async function metricsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const decode: { [key: string]: any } = await request.jwtDecode();

  const totalMeals = await prisma.meals.count({
    where: {
      userId: decode.id,
    },
  });

  const totalMealsOn = await prisma.meals.count({
    where: {
      userId: decode.id,
      AND: {
        diet_on: true,
      },
    },
  });

  const totalMealsOff = await prisma.meals.count({
    where: {
      userId: decode.id,
      AND: {
        diet_on: false,
      },
    },
  });

  const bestStreak = await prisma.user.findFirst({
    where: {
      id: decode.id,
    },
  });

  reply.status(200).send({
    total: `Total de refeições: ${totalMeals}`,
    dietOn: `Refeições dentro da dieta: ${totalMealsOn}`,
    dietOff: `Refeições fora da dieta: ${totalMealsOff}`,
    bestStreak: `Melhor sequência de refeições dentro da dieta: ${bestStreak?.best_streak}`,
  });
}
