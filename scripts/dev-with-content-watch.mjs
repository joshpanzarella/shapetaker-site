import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const contentDir = path.join(rootDir, "src/content/blog");
const generatorScript = path.join(rootDir, "scripts/generate-blog-data.mjs");

let regenerateTimer = null;
let nextProcess = null;

function runGenerator() {
  return new Promise((resolve, reject) => {
    const process = spawn("node", [generatorScript], {
      cwd: rootDir,
      stdio: "inherit"
    });

    process.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`Blog data generation exited with code ${code}.`));
    });
  });
}

function scheduleRegeneration() {
  clearTimeout(regenerateTimer);
  regenerateTimer = setTimeout(() => {
    runGenerator().catch((error) => {
      console.error(error.message);
    });
  }, 100);
}

function startNext() {
  nextProcess = spawn("next", ["dev"], {
    cwd: rootDir,
    shell: true,
    stdio: "inherit"
  });

  nextProcess.on("exit", (code, signal) => {
    if (signal) {
      process.exit(0);
    }

    process.exit(code ?? 0);
  });
}

function watchContent() {
  if (!fs.existsSync(contentDir)) {
    console.warn(`Content directory not found: ${contentDir}`);
    return;
  }

  fs.watch(contentDir, { recursive: true }, (_eventType, filename) => {
    if (!filename || !/\.(md|mdx)$/.test(filename)) {
      return;
    }

    scheduleRegeneration();
  });
}

function stop() {
  if (nextProcess) {
    nextProcess.kill("SIGTERM");
  }

  process.exit(0);
}

process.on("SIGINT", stop);
process.on("SIGTERM", stop);

await runGenerator();
watchContent();
startNext();
