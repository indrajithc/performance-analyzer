import { serve } from "bun";
import * as fs from "fs";
import * as path from "path";

import dotenv from "dotenv";

dotenv.config();

// Load environment variables from .env file
const port = process.env.PORT || 3001;
const buildDir = process.env.BUILD_DIR || path.join(process.cwd(), "build");

// Base directory to store the JSON files and logs
const baseDir = path.join(process.cwd(), "data");
const logDir = path.join(process.cwd(), "logs");
const apiPrefix = "/api";

// Ensure the base directories exist
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir);
}
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Helper function to ensure directory exists for a key
function ensureKeyDirectory(key) {
  const keyDir = path.join(baseDir, key);
  if (!fs.existsSync(keyDir)) {
    fs.mkdirSync(keyDir);
  }
}

// Log request details into a log file
function logRequest(requestDetails) {
  const logFile = path.join(logDir, "save_requests.log");
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} - ${requestDetails}\n`;
  fs.appendFileSync(logFile, logMessage);
}

// Helper function to serve static files
function serveStaticFile(filePath) {
  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath);
    const contentType =
      ext === ".html"
        ? "text/html"
        : ext === ".js"
        ? "application/javascript"
        : ext === ".css"
        ? "text/css"
        : "application/octet-stream";
    const content = fs.readFileSync(filePath);
    return new Response(content, {
      headers: { "Content-Type": contentType },
    });
  }
  return null;
}

// API to save JSON by key
serve({
  async fetch(req) {
    const url = new URL(req.url);
    const method = req.method;

    // Health check endpoint
    if (url.pathname === `/health` && method === "POST") {
      return new Response("OK", { status: 200 });
    }

    // Save API
    if (url.pathname === `${apiPrefix}/save` && method === "POST") {
      const { key, json } = await req.json();

      if (!key || !json) {
        return new Response("Missing key or json data", { status: 400 });
      }

      ensureKeyDirectory(key); // Make sure the key's directory exists

      // Generate a unique ID for the new JSON entry
      const keyDir = path.join(baseDir, key);
      const id =
        (fs.readdirSync(keyDir).length + 1).toString() + `_${Date.now()}`;
      const filePath = path.join(keyDir, `${id}.json`);

      // Save the JSON to a file
      fs.writeFileSync(filePath, JSON.stringify(json));

      // Log the request details
      logRequest(
        `POST /save - Key: ${key}, ID: ${id}, JSON: ${JSON.stringify(json)}`
      );

      return new Response(JSON.stringify({ id, key }), { status: 200 });
    }

    // Get all JSON by key
    if (url.pathname.startsWith(`${apiPrefix}/get/`) && method === "GET") {
      const key = url.pathname.split("/get/")[1];
      const keyDir = path.join(baseDir, key);

      if (!fs.existsSync(keyDir)) {
        return new Response("Key not found", { status: 404 });
      }

      // Read all JSON files in the directory and return them
      const files = fs.readdirSync(keyDir).map((file) => {
        const filePath = path.join(keyDir, file);
        return JSON.parse(fs.readFileSync(filePath, "utf-8"));
      });

      return new Response(JSON.stringify(files), { status: 200 });
    }

    // Get JSON by key and ID
    if (url.pathname.startsWith(`${apiPrefix}/getById/`) && method === "GET") {
      const [, , , key, id] = url.pathname.split("/");
      const keyDir = path.join(baseDir, key);

      if (!fs.existsSync(keyDir)) {
        return new Response("Key not found", { status: 404 });
      }

      const filePath = path.join(keyDir, `${id}.json`);
      if (!fs.existsSync(filePath)) {
        return new Response("ID not found", { status: 404 });
      }

      const json = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      return new Response(JSON.stringify(json), { status: 200 });
    }

    // Serve React build files
    if (req.method === "GET") {
      const filePath = path.join(
        buildDir,
        url.pathname === "/" ? "/index.html" : url.pathname
      );
      const staticResponse = serveStaticFile(filePath);

      if (staticResponse) {
        return staticResponse;
      }

      // If file not found, serve the React app's `index.html` (for SPA fallback)
      return (
        serveStaticFile(path.join(buildDir, "index.html")) ||
        new Response("Not found", { status: 404 })
      );
    }

    return new Response("Not found", { status: 404 });
  },
  port: port,
});
