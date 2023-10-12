import { fastify } from "fastify";
import { fastifyCookie } from "@fastify/cookie";
import { fastifyJwt } from "@fastify/jwt";
import { registerRoute } from "./routes/registerRoute";
import { loginRoute } from "./routes/loginRoute";
import { mealsRoute } from "./routes/mealsRoute";
import { metricsRoute } from "./routes/metricsRoute";
import { env } from "./env";

const app = fastify();

app.register(fastifyCookie);
app.register(fastifyJwt, {
  secret: env.SECRET_JWT,
  cookie: {
    cookieName: "token",
    signed: false,
  },
});

app.register(registerRoute, {
  prefix: "register",
});

app.register(loginRoute, {
  prefix: "login",
});

app.register(mealsRoute, {
  prefix: "meals",
});

app.register(metricsRoute, {
  prefix: "metrics",
});

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log("Server is runnig...");
  });
