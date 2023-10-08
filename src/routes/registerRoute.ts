import { FastifyInstance } from "fastify";
import { registerController } from "../controllers/registerController";

export async function registerRoute(app: FastifyInstance) {
  app.post("/", registerController);
}
