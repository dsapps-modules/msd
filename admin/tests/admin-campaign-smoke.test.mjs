import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const files = {
  list: path.join(repoRoot, "src/app/[locale]/divulgador/campanhas/page.tsx"),
  detail: path.join(repoRoot, "src/app/[locale]/divulgador/campanhas/[id]/page.tsx"),
  edit: path.join(repoRoot, "src/app/[locale]/divulgador/campanhas/[id]/edit/page.tsx"),
  create: path.join(repoRoot, "src/app/[locale]/divulgador/campanhas/nova/page.tsx"),
  layout: path.join(repoRoot, "src/components/blocks/divulgador-section/DivulgadorLayout.tsx"),
  action: path.join(repoRoot, "src/modules/divulgador-section/divulgador.action.ts"),
  form: path.join(repoRoot, "src/components/blocks/divulgador-section/DivulgadorCampaignForm.tsx"),
  details: path.join(repoRoot, "src/components/blocks/divulgador-section/DivulgadorCampaignDetails.tsx"),
  table: path.join(repoRoot, "src/components/blocks/divulgador-section/DivulgadorCampaignTable.tsx"),
};

function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function assertFileExists(filePath) {
  assert.equal(fs.existsSync(filePath), true, `Missing expected file: ${filePath}`);
}

test("campaign routes exist and are wired to the dedicated campaign endpoint", () => {
  for (const filePath of Object.values(files)) {
    assertFileExists(filePath);
  }

  const detailSource = readFile(files.detail);
  const editSource = readFile(files.edit);
  const actionSource = readFile(files.action);
  const layoutSource = readFile(files.layout);

  assert.match(detailSource, /useDivulgadorCampaignQuery/);
  assert.match(editSource, /useDivulgadorCampaignQuery/);
  assert.doesNotMatch(detailSource, /useDivulgadorDashboardQuery/);
  assert.doesNotMatch(editSource, /useDivulgadorDashboardQuery/);
  assert.match(actionSource, /useDivulgadorCampaignQuery/);
  assert.match(actionSource, /useDivulgadorCampaignStoreMutation/);
  assert.match(actionSource, /useDivulgadorCampaignUpdateMutation/);
  assert.match(layoutSource, /Campanhas/);
  assert.match(layoutSource, /pathname\.startsWith\(\`\$\{item\.href\}\/\`\)/);
});

test("campaign copy remains normalized and free of mojibake", () => {
  const texts = [
    readFile(files.list),
    readFile(files.detail),
    readFile(files.edit),
    readFile(files.create),
    readFile(files.form),
    readFile(files.details),
    readFile(files.table),
  ];

  for (const source of texts) {
    assert.doesNotMatch(source, /Ã|Â/);
  }
});
