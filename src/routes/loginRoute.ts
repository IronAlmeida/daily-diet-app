import { FastifyInstance } from "fastify";
import { loginController } from "../controllers/loginController";

export async function loginRoute(app: FastifyInstance) {
  app.post("/", loginController);
}
