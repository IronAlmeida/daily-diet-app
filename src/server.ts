import { fastify } from "fastify";
import { env } from "./env";
import { registerRoute } from "./routes/registerRoute";

const app = fastify();

app.register(registerRoute, {
  prefix: "register",
});

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log("Server is runnig...");
  });
