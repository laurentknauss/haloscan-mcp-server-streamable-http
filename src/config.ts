import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const EnvSchema = z.object({
  MCP_HTTP_PORT: z.coerce.number().int().positive().default(3000),
  HALOSCAN_API_KEY: z.string().default(""),
});

const parsedEnv = EnvSchema.safeParse(process.env);

if (!parsedEnv.success) {
  if (process.stdout.isTTY) {
    console.error("❌ Invalid environment variables:", parsedEnv.error.flatten().fieldErrors);
  }
  process.exit(1);
}

// Warn if no API key (useful for local testing)
if (!parsedEnv.data.HALOSCAN_API_KEY) {
  console.warn("⚠️  No HALOSCAN_API_KEY set - API calls will fail");
}

export const config = parsedEnv.data;
