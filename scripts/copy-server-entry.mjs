import { copyFileSync, mkdirSync } from "node:fs";

mkdirSync("dist/server", { recursive: true });
copyFileSync("dist/server/server.js", "dist/server/index.js");
