import { fastify } from "fastify";
import { env } from "./env";
import { registerRoute } from "./routes/registerRoute";
import { loginRoute } from "./routes/loginRoute";
import { fastifyCookie } from "@fastify/cookie";
import { mealsRoute } from "./routes/mealsRoute";
import fastifyJwt from "@fastify/jwt";

const app = fastify();

app.register(fastifyCookie);

app.register(registerRoute, {
  prefix: "register",
});

app.register(loginRoute, {
  prefix: "login",
});

app.register(mealsRoute, {
  prefix: "/meals",
});

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log("Server is runnig...");
  });
