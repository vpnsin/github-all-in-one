# Contributing to Flora Dine Website

Thank you for considering contributing!  
This document explains the workflow, coding standards, and expectations.

---

## 🧱 Project Setup

```bash
npm install
npm run dev
```

---

## 🧩 Branching Strategy

- `main` → Production-ready code  
- `dev` → Active development  
- Feature branches follow:

```
feature/<short-description>
bugfix/<short-description>
hotfix/<short-description>
```

---

## 🧪 Commit Message Convention (Conventional Commits)

Examples:

- `feat: add sustainability insights section`
- `fix: correct mobile layout for product grid`
- `refactor: extract card component`
- `docs: update README`

---

## 🔍 Pull Request Process

1. Ensure your branch is up to date with `dev`
2. Run linting & formatting
3. Fill out the PR template completely
4. Link related issues (`Closes #12`)
5. Request review

---

## 🧼 Code Style

- Use **ESLint + Prettier** defaults
- Avoid unused imports
- Keep components small and reusable
- Prefer Tailwind utility classes over custom CSS

---

## 🧪 Testing

If tests exist:

```bash
npm run test
```

---

## 📦 Deployment

All merges to `main` trigger:

- Build
- Deployment to Vercel

---

## 🤝 Thank You

Your contributions help make Flora Dine better for everyone.