import { FastifyInstance } from "fastify";
import {
  postMealsController,
  putMealsController,
  deleteMealsController,
} from "../controllers/mealsController";
import { checkSectionTokenExists } from "../middlewares/check-section-token-exists";

export async function mealsRoute(app: FastifyInstance) {
  app.post("/", { onRequest: checkSectionTokenExists }, postMealsController);

  app.put("/:id", { onRequest: checkSectionTokenExists }, putMealsController);

  app.delete(
    "/:id",
    { onRequest: checkSectionTokenExists },
    deleteMealsController
  );
}
