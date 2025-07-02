#!/usr/bin/env node

import { readdir, readFile, writeFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PROMPTS_DIR = join(__dirname, "../public/data/prompts");
const CONFIG_FILE = join(__dirname, "index-config.json");
const OUTPUT_FILE = join(PROMPTS_DIR, "_index.json");

async function loadConfig() {
  try {
    const configData = await readFile(CONFIG_FILE, "utf-8");
    return JSON.parse(configData);
  } catch (error) {
    console.error("Error loading config:", error.message);
    process.exit(1);
  }
}

async function getPromptDirectories() {
  try {
    const entries = await readdir(PROMPTS_DIR, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
      .map((entry) => entry.name);
  } catch (error) {
    console.error("Error reading prompts directory:", error.message);
    process.exit(1);
  }
}

async function loadPromptMeta(promptId) {
  try {
    const metaFile = join(PROMPTS_DIR, promptId, "meta.json");
    const metaData = await readFile(metaFile, "utf-8");
    return JSON.parse(metaData);
  } catch (error) {
    console.warn(
      `Warning: Could not load meta.json for ${promptId}:`,
      error.message
    );
    return null;
  }
}

async function generateIndex() {
  console.log("🔍 Scanning prompts directory...");

  const config = await loadConfig();
  const promptDirs = await getPromptDirectories();

  console.log(`📁 Found ${promptDirs.length} prompt directories`);

  // Load all prompt metadata
  const promptsData = [];
  const categoryCounts = {};
  const difficultyCounts = { beginner: 0, intermediate: 0, advanced: 0 };

  for (const promptId of promptDirs) {
    const meta = await loadPromptMeta(promptId);
    if (meta) {
      promptsData.push(meta);

      // Count categories
      if (meta.category) {
        categoryCounts[meta.category] =
          (categoryCounts[meta.category] || 0) + 1;
      }

      // Count difficulties
      if (meta.difficulty) {
        difficultyCounts[meta.difficulty]++;
      }
    }
  }

  // Update category counts in config
  const updatedCategories = config.categories.map((cat) => ({
    ...cat,
    count: categoryCounts[cat.id] || 0,
  }));

  // Generate index structure
  const indexData = {
    updated_at: new Date().toISOString(),
    total_prompts: promptsData.length,
    categories: updatedCategories,
    prompts: promptsData.map((meta) => ({
      id: meta.id,
      title: meta.title,
      slug: meta.slug || meta.id,
      category: meta.category,
      featured: meta.featured,
      tags: meta.tags || [],
      created_at: meta.created_at,
      preview_url: `/data/prompts/${meta.id}/preview.png`,
    })),
  };

  // Write index file
  await writeFile(OUTPUT_FILE, JSON.stringify(indexData, null, 2));

  console.log("✅ Index file generated successfully!");
  console.log(`📊 Total prompts: ${indexData.total_prompts}`);
  console.log(
    `📂 Categories: ${updatedCategories
      .map((c) => `${c.title} (${c.count})`)
      .join(", ")}`
  );
}

// Run the script
generateIndex().catch((error) => {
  console.error("❌ Error generating index:", error.message);
  process.exit(1);
});
