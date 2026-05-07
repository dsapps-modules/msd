import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const routerFile = path.resolve(__dirname, "../lib/router/app_routs.dart");

function extractBlock(source, startIndex) {
  let depth = 0;
  let blockStart = -1;

  for (let i = startIndex; i < source.length; i += 1) {
    const char = source[i];

    if (char === "(") {
      depth += 1;
      if (blockStart === -1) {
        blockStart = i;
      }
      continue;
    }

    if (char === ")") {
      depth -= 1;
      if (depth === 0 && blockStart !== -1) {
        return source.slice(blockStart, i + 1);
      }
    }
  }

  throw new Error("Unable to extract GoRoute block");
}

function extractRequiredExtraKeys(block) {
  const requiredKeys = new Set();

  for (const match of block.matchAll(/\['([^']+)'\]!/g)) {
    requiredKeys.add(match[1]);
  }

  return [...requiredKeys].sort();
}

function extractAccessedExtraKeys(block) {
  const accessedKeys = new Set();

  for (const match of block.matchAll(/extraParams\['([^']+)'\]/g)) {
    accessedKeys.add(match[1]);
  }

  return [...accessedKeys].sort();
}

function extractOptionalExtraKeys(block) {
  const optionalKeys = new Set();

  for (const match of block.matchAll(/\['([^']+)'\]\s*(?:as [^;\n]+)?\?\?/g)) {
    optionalKeys.add(match[1]);
  }

  for (const match of block.matchAll(/\['([^']+)'\]\s+as\s+[^;\n]+\?\s*\?\?/g)) {
    optionalKeys.add(match[1]);
  }

  return [...optionalKeys].sort();
}

export function loadRouteManifest() {
  const source = fs.readFileSync(routerFile, "utf8");
  const matches = [...source.matchAll(/GoRoute\(/g)];

  return matches.map((match) => {
    const block = extractBlock(source, match.index);
    const nameMatch = block.match(/name:\s*RouteNames\.([A-Za-z0-9_]+)/);
    const pathMatch = block.match(/path:\s*'([^']+)'/);

    return {
      name: nameMatch?.[1] ?? "unknown",
      path: pathMatch?.[1] ?? "",
      requiresExtra: block.includes("state.extra"),
      accessedExtraKeys: extractAccessedExtraKeys(block),
      requiredExtraKeys: extractRequiredExtraKeys(block),
      optionalExtraKeys: extractOptionalExtraKeys(block),
    };
  });
}

if (process.argv[1] === __filename) {
  process.stdout.write(`${JSON.stringify(loadRouteManifest(), null, 2)}\n`);
}
