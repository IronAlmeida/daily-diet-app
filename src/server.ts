import { fastify } from "fastify";
import { env } from "./env";
import { registerRoute } from "./routes/registerRoute";
import { loginRoute } from "./routes/loginRoute";
import { fastifyCookie } from "@fastify/cookie";

const app = fastify();

app.register(fastifyCookie);

app.register(registerRoute, {
  prefix: "register",
});

app.register(loginRoute, {
  prefix: "login",
});

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log("Server is runnig...");
  });
