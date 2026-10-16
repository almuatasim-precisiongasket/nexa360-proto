// RIVE_CLI may point to a verified, project-local official Rive executable.
import { spawnSync } from "node:child_process";
import { copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import "./author-learning-desk.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const cli = process.env.RIVE_CLI || "rive";
for (const args of [
  ["art/rive/learning-desk", "--verify"],
  ["inspect", "art/rive/learning-desk", "--summary"],
  ["art/rive/learning-desk", "--once"],
]) {
  const result = spawnSync(cli, args, { cwd: root, stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
await copyFile(
  new URL("../art/rive/learning-desk/build/learning-desk.riv", import.meta.url),
  new URL("../public/assets/rive/learning-desk.riv", import.meta.url),
);
await copyFile(
  new URL("../node_modules/@rive-app/canvas/rive.wasm", import.meta.url),
  new URL("../public/assets/rive/rive.wasm", import.meta.url),
);
console.log("Published local learning desk asset and matching runtime WASM.");
