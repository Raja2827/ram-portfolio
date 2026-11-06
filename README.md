# RAM — Raja Asutosh Mishra Portfolio

Minimal React + TypeScript + Vite portfolio with GSAP-powered first-session intro.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deploy

Push this folder to GitHub. On Vercel or Netlify, import the repository, choose Vite, use `npm run build` as build command and `dist` as output directory. No backend or environment variables required.

## Customize

- `src/App.tsx` — resume data, content, links, preloader timeline.
- `src/styles.css` — visual styling and responsive layout.
- `public/Raja_Asutosh_Mishra_Resume.docx` — replace with a current PDF and update the download link when ready.

Intro plays once per tab session via sessionStorage, and can be replayed from the footer. Reduced-motion preference skips it.

Do not upload confidential client screenshots or private Google Drive assets without authorization.
