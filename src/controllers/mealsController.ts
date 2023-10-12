import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { prisma } from "../prisma/prismaClient";

export async function getMealsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const decode: { [key: string]: any } = await request.jwtDecode();

  const meals = await prisma.meals.findMany({
    where: {
      userId: decode.id,
    },
  });

  try {
    reply.header("Content-type", "application/json").status(200).send(meals);
  } catch (error) {
    reply.status(400).send({ error });
  }
}

export async function getMealController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getReqParamsSchema = z.object({
    id: z.string(),
  });

  const reqParams = getReqParamsSchema.parse(request.params);

  const { id } = reqParams;

  const decode: { [key: string]: any } = await request.jwtDecode();

  const meals = await prisma.meals.findFirst({
    where: {
      userId: decode.id,
      AND: {
        id,
      },
    },
  });

  if (!meals) {
    reply
      .status(400)
      .send({ message: "Não é possível visualizar refeição de outro usuário" });
  }

  try {
    reply.header("Content-type", "application/json").status(200).send(meals);
  } catch (error) {
    reply.status(401).send({ message: "Não autorizado" });
  }
}

export async function postMealController(
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

  await prisma.meals
    .create({
      data: {
        name,
        description,
        diet_on,
        userId: decode.id,
      },
    })
    .then(() => {
      reply.status(201).send("Refeição registrada!");
    })
    .catch((error) => {
      reply.send({ error });
    });
}

export async function putMealController(
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

  const decode: { [key: string]: any } = await request.jwtDecode();

  await prisma.meals
    .update({
      where: {
        id,
        AND: {
          userId: decode.id,
        },
      },
      data: {
        name,
        description,
        diet_on,
      },
    })
    .then(() => {
      reply.status(200).send({ message: "Refeição atualizada!" });
    })
    .catch((error) => {
      reply.status(401).send({
        message: "Não é possível alterar refeição de outro usuário",
        error,
      });
    });
}

export async function deleteMealController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getReqParamsSchema = z.object({
    id: z.string(),
  });

  const reqParams = getReqParamsSchema.parse(request.params);

  const { id } = reqParams;

  const decode: { [key: string]: any } = await request.jwtDecode();

  await prisma.meals
    .delete({
      where: {
        id,
        AND: {
          userId: decode.id,
        },
      },
    })
    .then(() => {
      reply.status(204);
    })
    .catch((error) => {
      reply.send({
        message: "Não é possível exlcuir refeição de outro usuário",
        error,
      });
    });
}
