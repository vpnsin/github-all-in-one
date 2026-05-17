import fs from 'fs';
import path from 'path';

function slugify(text) {
  return text
    .trim()
    .replace(/^[🏠📚🎨🧩🚀🧪🛠️🗺️📄📦\s]+/, '') // Remove emojis
    .replace(/[^\w\s-]/g, '')                    // Remove special chars
    .trim()
    .replace(/[\s_-]+/g, '-')                    // Replace spaces and underscores
    .toLowerCase();
}

function splitMarkdownIntoFiles(content, outputDir = 'wiki-src') {
  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Regex to match each ## section
  const sectionRegex = /##\s*\*\*(.*?)\*\*(.*?)(?=##\s*\*\*|$)/gs;

  let match;
  let count = 0;

  while ((match = sectionRegex.exec(content)) !== null) {
    const fullHeader = `## **${match[1]}**`;
    const body = match[2].trim();
    const rawTitle = match[1].trim();

    const cleanTitle = rawTitle.replace(/^[🏠📚🎨🧩🚀🧪🛠️🗺️📄📦\s]+/, '').trim();
    const filename = slugify(cleanTitle) + '.md';
    const filepath = path.join(outputDir, filename);

    const fullContent = `${fullHeader}\n\n${body}`.trim();

    fs.writeFileSync(filepath, fullContent, 'utf-8');

    console.log(`✅ Created: ${filepath}`);
    count++;
  }

  console.log(`\n🎉 Done! Created ${count} markdown files in ./${outputDir}/`);
}

// ========================
// MAIN EXECUTION
// ========================

const markdownContent = `## **🏠 Home**
**Purpose:** Overview of the project, mission, and quick links.  
**Sections:**
- What is Flora Dine?
- Tech Stack
- Quick Start
- Useful Links (Issues, PRs, Roadmap)

---

## **📚 Architecture Overview**
**Purpose:** Explain how the system is built.  
**Sections:**
- Folder Structure  
- Component Architecture  
- State Management  
- API / Data Flow  
- Performance Principles  

---

## **🎨 UI/UX Guidelines**
**Purpose:** Keep design consistent.  
**Sections:**
- Color Palette (Teal‑Blue #0FB5B5 etc.)  
- Typography  
- Component Library  
- Animation Guidelines  
- Accessibility Rules  

---

## **🧩 Components Library**
**Purpose:** Document reusable components.  
**Sections:**
- Cards  
- Sections  
- Layouts  
- Forms  
- Icons  

---

## **🚀 Deployment Guide**
**Purpose:** Explain how to deploy to Vercel.  
**Sections:**
- Environments  
- Build Commands  
- Environment Variables  
- Preview Deployments  

---

## **🧪 Testing Guide**
**Purpose:** Standardize testing.  
**Sections:**
- Unit Tests  
- Integration Tests  
- Visual Regression  
- Test Commands  

---

## **🛠️ DevOps & Workflows**
**Purpose:** Document CI/CD.  
**Sections:**
- GitHub Actions  
- Linting  
- Build Pipeline  
- Release Workflow  

---

## **🗺️ Roadmap**
**Purpose:** High‑level future plans.  
**Sections:**
- Q2 Goals  
- Q3 Goals  
- Feature Backlog  

---

## **📄 API Documentation (If applicable)**
**Purpose:** Document backend endpoints.  
**Sections:**
- Endpoints  
- Payloads  
- Authentication  

---

## **📦 Content Guidelines**
**Purpose:** Standardize content writing.  
**Sections:**
- Tone of Voice  
- SEO Rules  
- Image Optimization  
- Metadata Rules  

---

If you want, I can generate **all wiki pages with full content** too.
`;

// Run the splitter
splitMarkdownIntoFiles(markdownContent, 'wiki');