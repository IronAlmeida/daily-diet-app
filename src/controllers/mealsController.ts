import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { prisma } from "../prisma/prismaClient";
import jwt, { Jwt } from "jsonwebtoken";
import { env } from "../env";
import { ObjectEncodingOptions } from "fs";

export async function mealsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createMealSchema = z.object({
    name: z.string(),
    description: z.string(),
    diet_on: z.boolean(),
  });

  const createMeal = createMealSchema.parse(request.body);

  const { name, description, diet_on } = createMeal;
  const { token } = request.cookies;

  if (token) {
    const decode = jwt.verify(token, env.SECRET_JWT) as { [key: string]: any };

    await prisma.meals.create({
      data: {
        name,
        description,
        diet_on,
        userId: decode.id,
      },
    });

    reply.status(201).send("Refeição registrada!");
  }
}
