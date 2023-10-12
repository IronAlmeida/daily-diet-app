import { FastifyInstance } from "fastify";
import { metricsController } from "../controllers/metricsController";
import { checkSectionTokenExists } from "../middlewares/check-section-token-exists";

export async function metricsRoute(app: FastifyInstance) {
  app.get("/", { onRequest: checkSectionTokenExists }, metricsController);
}
