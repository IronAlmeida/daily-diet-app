import { FastifyInstance } from "fastify";
import { mealsController } from "../controllers/mealsController";
import { checkSectionTokenExists } from "../middlewares/check-section-token-exists";

export async function mealsRoute(app: FastifyInstance) {
  app.post("/", { preHandler: checkSectionTokenExists }, mealsController);
}
