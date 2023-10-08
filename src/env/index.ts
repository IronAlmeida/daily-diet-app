import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  PORT: z.number().default(3333),
  SECRET_JWT: z.string(),
});

export const env = envSchema.parse(process.env);
