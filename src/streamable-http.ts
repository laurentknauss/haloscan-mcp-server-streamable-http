import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import express, { type Request, type Response } from "express";

import { configureHaloscanTools } from "./haloscan-tools.js";
import { config } from "./config.js";

const app = express();
app.use(express.json());

// Create and configure MCP server with Haloscan tools
function createServer(): McpServer {
  const server = new McpServer(
    {
      name: "Haloscan SEO",
      version: "2.0.0",
    },
    { capabilities: {} }
  );

  configureHaloscanTools(server, config.HALOSCAN_API_KEY);
  return server;
}

// Streamable HTTP endpoint - single /mcp POST endpoint
app.post("/mcp", async (req: Request, res: Response) => {
  try {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });

    res.on("close", () => {
      transport.close();
    });

    const server = createServer();
    await server.connect(transport);

    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error("Error handling MCP request:", error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: "2.0",
        error: {
          code: -32603,
          message: "Internal server error",
        },
        id: null,
      });
    }
  }
});

// Method not allowed for GET
app.get("/mcp", async (_req: Request, res: Response) => {
  res.writeHead(405).end(
    JSON.stringify({
      jsonrpc: "2.0",
      error: {
        code: -32000,
        message: "Method not allowed. Use POST.",
      },
      id: null,
    })
  );
});

// Method not allowed for DELETE
app.delete("/mcp", async (_req: Request, res: Response) => {
  res.writeHead(405).end(
    JSON.stringify({
      jsonrpc: "2.0",
      error: {
        code: -32000,
        message: "Method not allowed. Use POST.",
      },
      id: null,
    })
  );
});

// Health check endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    server: "Haloscan MCP Server (Streamable HTTP)",
    version: "2.0.0",
  });
});

// Start server
app.listen(config.MCP_HTTP_PORT, () => {
  console.log(`✅ Haloscan MCP Streamable HTTP Server listening on port ${config.MCP_HTTP_PORT}`);
  console.log(`🔗 Endpoint: POST http://localhost:${config.MCP_HTTP_PORT}/mcp`);
  console.log(`💚 Health: GET http://localhost:${config.MCP_HTTP_PORT}/health`);
});

process.on("SIGINT", async () => {
  console.log("Server shutdown complete");
  process.exit(0);
});
