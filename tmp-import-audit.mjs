import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const files = execSync("git ls-files", { encoding: "utf8" })
  .trim()
  .split(/\r?\n/)
  .filter(Boolean);
const set = new Set(files);
const exts = [".jsx", ".js", ".css", ".json", ".svg", ".png", ".jpg", ".webp"];

function resolveImport(fromFile, spec) {
  const base = path.posix.dirname(fromFile);
  const raw = path.posix.normalize(path.posix.join(base, spec));
  const candidates = [];
  if (path.posix.extname(raw)) candidates.push(raw);
  else for (const ext of exts) candidates.push(raw + ext);
  for (const ext of exts) candidates.push(raw + "/index" + ext);
  const hit = candidates.find((c) => set.has(c));
  if (hit) return { ok: true, hit };
  const caseHits = files.filter((f) =>
    candidates.some((c) => c.toLowerCase() === f.toLowerCase())
  );
  return { ok: false, tried: candidates, caseHits };
}

const importRe =
  /(?:import|export)\s[^'"\n]*?from\s*['"]([^'"]+)['"]|import\s*['"]([^'"]+)['"]|url\(\s*['"]?([^'")]+)['"]?\s*\)/g;

const problems = [];
const checked = [];

for (const file of files) {
  if (!/\.(jsx?|css)$/.test(file)) continue;
  const text = fs.readFileSync(file, "utf8");
  const re = new RegExp(importRe.source, "g");
  let match;
  while ((match = re.exec(text))) {
    const spec = match[1] || match[2] || match[3];
    if (!spec || spec.startsWith("data:") || spec.startsWith("http") || spec.startsWith("#")) continue;
    if (!spec.startsWith(".")) continue;
    const result = resolveImport(file, spec);
    checked.push({ file, spec, ...result });
    if (!result.ok) problems.push({ file, spec, caseHits: result.caseHits });
  }
}

console.log("RELATIVE IMPORTS " + checked.length);
console.log("PROBLEMS " + problems.length);
for (const problem of problems) console.log("BAD " + JSON.stringify(problem));
for (const item of checked) {
  console.log("OK  " + item.file + " -> " + item.spec + " => " + item.hit);
}
