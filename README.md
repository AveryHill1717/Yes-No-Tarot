# Yes/No Tarot

A mystical tarot card web app built with **Next.js 14 (App Router)** and **Tailwind CSS**.

- 7 face-down tarot cards in a responsive grid
- Click any card for a true 3-D flip animation revealing **YES** or **NO**
- Gold sparkle-pulse glow on click
- Hover float effect on unrevealed cards
- **Reset** and **Shuffle** controls
- Fully keyboard-accessible (Tab / Enter / Space)

---

## Project structure

```
yes-no-tarot/
├── app/
│   ├── globals.css       ← Tailwind + 3-D flip CSS + sparkle keyframes
│   ├── layout.tsx        ← Root layout (server component)
│   └── page.tsx          ← Main page with state (client component)
├── components/
│   └── TarotCard.tsx     ← Reusable card with flip logic
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── package.json
```

---

## Local setup

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
# Verify the production build passes before pushing
npm run build
```

---

## Push to GitHub

```bash
git init
git add .
git commit -m "init"
git branch -M main
git remote add origin <YOUR_REPO_URL>
git push -u origin main
```

---

## Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and **Sign in with GitHub**.
2. Click **Add New Project** and import your repository.
3. Leave all settings as default — Vercel auto-detects Next.js.
4. Click **Deploy**.

No environment variables or extra configuration required.
