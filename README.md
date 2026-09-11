# Pixora — Instagram-style authentication

Starter project for an Instagram-style authentication screen using:

- Next.js 16 / App Router
- TypeScript
- Firebase Authentication
- Email + password
- Google sign-in
- Password reset
- Vercel deployment

## 1. Requirements

- Node.js 20.9+
- npm
- A Firebase project

## 2. Install

```bash
npm install
```

## 3. Firebase setup

1. Open Firebase Console and create a project.
2. Add a **Web app** to the project.
3. Copy the Firebase web configuration values.
4. Open **Authentication** and enable:
   - Email/Password
   - Google
5. Copy `.env.local.example` to `.env.local` and fill in the values.

Windows PowerShell:

```powershell
Copy-Item .env.local.example .env.local
```

Then edit `.env.local`.

> Do not store users' passwords in Firestore. Firebase Authentication manages password credentials. Firestore should only contain application/profile data if you add it later.

## 4. Run locally

```bash
npm run dev
```

Open http://localhost:3000

## 5. Deploy to Vercel

The easiest workflow is GitHub -> Vercel:

1. Push this project to GitHub.
2. Import the GitHub repository in Vercel.
3. Add the same `NEXT_PUBLIC_FIREBASE_*` variables in **Project Settings -> Environment Variables**.
4. Deploy.
5. Copy the final production domain, for example `your-project.vercel.app`.
6. In Firebase Authentication settings, add that production domain to **Authorized domains** for Google sign-in.
7. Redeploy if you changed Vercel environment variables.

No `vercel.json` is required for this Next.js project.

## Project structure

```text
insta-style-auth/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   └── page.tsx       # login / signup / Google / reset password
│   │   ├── feed/
│   │   │   └── page.tsx       # protected placeholder after login
│   │   ├── globals.css        # responsive Instagram-style UI
│   │   ├── layout.tsx
│   │   └── page.tsx           # redirects to /auth
│   └── lib/
│       └── firebase.ts         # Firebase initialization
├── .env.local.example
├── .gitignore
├── eslint.config.mjs
├── next-env.d.ts
├── package.json
├── tsconfig.json
└── README.md
```
