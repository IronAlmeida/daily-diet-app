import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { prisma } from "../prisma/prismaClient";

export async function postMealsController(
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

  const decode: { [key: string]: any } = await request.jwtDecode();

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

export async function putMealsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const putMealsSchema = z.object({
    name: z
      .string()
      .min(3, "Obrigatório ao menos 3 caracteres para identificação"),
    description: z
      .string()
      .min(3, "Obrigatório ao menos 3 caracteres para identificação"),
    diet_on: z.boolean(),
  });

  const getReqParamsSchema = z.object({
    id: z.string(),
  });

  const putMeals = putMealsSchema.parse(request.body);
  const reqParams = getReqParamsSchema.parse(request.params);
  const { id } = reqParams;

  const { name, description, diet_on } = putMeals;

  await prisma.meals.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      diet_on,
    },
  });

  reply.status(200).send({ message: "Refeição atualizada!" });
}

export async function deleteMealsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getReqParamsSchema = z.object({
    id: z.string(),
  });

  const reqParams = getReqParamsSchema.parse(request.params);

  const { id } = reqParams;

  await prisma.meals.delete({
    where: {
      id,
    },
  });

  reply.status(204);
}
