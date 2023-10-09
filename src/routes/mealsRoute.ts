import { FastifyInstance } from "fastify";
import {
  getMealsController,
  getMealController,
  postMealController,
  putMealController,
  deleteMealController,
} from "../controllers/mealsController";
import { checkSectionTokenExists } from "../middlewares/check-section-token-exists";

export async function mealsRoute(app: FastifyInstance) {
  app.get("/", { onRequest: checkSectionTokenExists }, getMealsController);

  app.get("/:id", { onRequest: checkSectionTokenExists }, getMealController);

  app.post("/", { onRequest: checkSectionTokenExists }, postMealController);

  app.put("/:id", { onRequest: checkSectionTokenExists }, putMealController);

  app.delete(
    "/:id",
    { onRequest: checkSectionTokenExists },
    deleteMealController
  );
}
