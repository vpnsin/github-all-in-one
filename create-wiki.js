#!/usr/bin/env node

/**
 * Auto-generate GitHub Wiki pages + sidebar
 * Authentication is handled by `gh auth login` + `gh auth setup-git`
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const REPO = "vpnsin/learn-github-actions"; // change if needed
const WIKI_REPO = `https://github.com/${REPO}.wiki.git`;

const LOCAL_WIKI = "./.wiki-temp";
const SRC_DIR = "./wiki-src";

function run(cmd) {
  execSync(cmd, { stdio: "inherit" });
}

function extractSubsections(content) {
  const lines = content.split("\n");
  const subs = [];

  lines.forEach(line => {
    if (line.startsWith("## ")) {
      subs.push({ level: 2, title: line.replace("## ", "").trim() });
    }
    if (line.startsWith("### ")) {
      subs.push({ level: 3, title: line.replace("### ", "").trim() });
    }
  });

  return subs;
}

function generateSidebar(pages) {
  let sidebar = "# 📚 Documentation\n\n";

  pages.forEach(page => {
    sidebar += `- [${page.name}](${page.name.replace(/ /g, "-")})\n`;

    page.subsections.forEach(sub => {
      const indent = sub.level === 2 ? "  " : "    ";
      sidebar += `${indent}- ${sub.title}\n`;
    });
  });

  return sidebar;
}

(function () {
  console.log("📘 Generating Wiki…");

  // Clean temp folder
  run(`rm -rf ${LOCAL_WIKI}`);

  // Clone wiki repo (auth handled by gh)
  run(`git clone ${WIKI_REPO} ${LOCAL_WIKI}`);

  const pages = [];

  // Copy wiki pages
  fs.readdirSync(SRC_DIR).forEach(file => {
    const srcPath = path.join(SRC_DIR, file);
    const destPath = path.join(LOCAL_WIKI, file);

    const content = fs.readFileSync(srcPath, "utf8");
    fs.writeFileSync(destPath, content);

    pages.push({
      name: file.replace(".md", ""),
      subsections: extractSubsections(content)
    });
  });

  // Generate sidebar
  const sidebarContent = generateSidebar(pages);
  fs.writeFileSync(path.join(LOCAL_WIKI, "_Sidebar.md"), sidebarContent);

  // Commit & push
  run(`cd ${LOCAL_WIKI} && git add .`);
  run(`cd ${LOCAL_WIKI} && git commit -m "Auto-update wiki" || true`);
  run(`cd ${LOCAL_WIKI} && git push`);

  console.log("✅ Wiki updated successfully!");
})();
