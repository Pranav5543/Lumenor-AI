# NOIRTHREAD

NOIRTHREAD is a premium dark-theme MERN fashion e-commerce platform with a React/Vite frontend and Node/Express/MongoDB backend.

It includes product browsing, product details, cart, checkout, demo auth, account dashboard, admin operations dashboard, recommendation scoring, email service setup, invoice generation, SEO metadata, and tests.

## Tech Stack

Frontend:
- React 18
- Vite
- React Router DOM
- Redux Toolkit and RTK Query
- Tailwind CSS
- Framer Motion
- Lenis smooth scrolling
- React Hook Form
- Zod
- React Hot Toast
- Headless UI
- Lucide React
- Recharts
- Swiper

Backend:
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt
- Resend email SDK
- Nodemailer fallback
- PDFKit
- Multer
- Cloudinary
- Helmet
- Morgan
- Rate limiting
- Compression
- Cookie parser
- Express validator

Testing:
- Vitest
- React Testing Library
- Jest
- Supertest

## Project Structure

```txt
NOIRTHREAD
├── client/          React + Vite frontend
├── server/          Express + MongoDB backend
├── package.json     Workspace scripts
├── pnpm-workspace.yaml
└── README.md
```

## Requirements

Install:
- Node.js 20 or newer
- pnpm 9 or newer

If pnpm is not installed:

```bash
npm install -g pnpm
```

## Install Packages

From the project root:

```bash
pnpm install
```

The project already includes all required packages in `client/package.json` and `server/package.json`.

This workspace also includes `scripts/run-pnpm.cjs`. It uses the local pnpm copy when present and falls back to global `pnpm`, which avoids Windows PATH issues.

If packages ever need to be reinstalled:

```bash
pnpm install --no-frozen-lockfile
```

## Environment Files

Create these files:

```txt
client/.env
server/.env
```

Use these examples:

```txt
client/.env.example
server/.env.example
```

## Client Environment

`client/.env`

```env
VITE_API_URL=http://localhost:8080/api
VITE_SITE_URL=http://localhost:5173
```

For Vercel production:

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
VITE_SITE_URL=https://your-frontend-url.vercel.app
```

## Server Environment

`server/.env`

```env
NODE_ENV=development
PORT=8080
CLIENT_URL=http://localhost:5173

MONGO_URI=mongodb+srv://<username>:<encoded-password>@cluster0.m8gvfzn.mongodb.net/noirthread?retryWrites=true&w=majority

JWT_ACCESS_SECRET=replace-with-long-random-access-secret
JWT_REFRESH_SECRET=replace-with-long-random-refresh-secret
COOKIE_SECRET=replace-with-long-random-cookie-secret
ACCESS_TOKEN_TTL=15m
REFRESH_TOKEN_TTL=30d

CLOUDINARY_CLOUD_NAME=dw7cppuwq
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

RESEND_API_KEY=
EMAIL_FROM=NOIRTHREAD <onboarding@resend.dev>
```

MongoDB password note:
- If your password contains `@`, encode it as `%40`.
- Example: `Pranav@23` becomes `Pranav%4023`.

Do not commit `.env` files. They are ignored by `.gitignore`.

## Run Locally

Run both frontend and backend:

```bash
pnpm dev
```

Run only frontend:

```bash
pnpm dev:client
```

Run only backend:

```bash
pnpm dev:server
```

Frontend URL:

```txt
http://localhost:5173
```

Backend health check:

```txt
http://localhost:8080/api/health
```

## Test Email

Add `RESEND_API_KEY` to `server/.env`, then run:

```bash
pnpm email:test
```

Send to another email:

```bash
pnpm --filter @noirthread/server email:test your@email.com
```

## Build

Frontend production build:

```bash
pnpm build
```

## Tests

Run all tests:

```bash
pnpm test
```

Run frontend tests:

```bash
pnpm test:client
```

Run backend tests:

```bash
pnpm test:server
```

## Seed Database

After `MONGO_URI` is added:

```bash
pnpm seed
```

Default seeded admin:

```txt
Email: admin@noirthread.example
Password: Password123
```

Change this before production.

## Deployment

Frontend: Vercel

Settings:
- Root directory: `client`
- Build command: `pnpm build`
- Output directory: `dist`
- Environment variables:
  - `VITE_API_URL`
  - `VITE_SITE_URL`

Backend: Render or Railway

Settings:
- Root directory: `server`
- Build command: `pnpm install`
- Start command: `pnpm start`
- Environment variables:
  - `NODE_ENV=production`
  - `PORT`
  - `CLIENT_URL`
  - `MONGO_URI`
  - `JWT_ACCESS_SECRET`
  - `JWT_REFRESH_SECRET`
  - `COOKIE_SECRET`
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
  - `RESEND_API_KEY`
  - `EMAIL_FROM`

Database: MongoDB Atlas

Checklist:
- Add backend deployment IP allowlist in Atlas, or allow `0.0.0.0/0` if needed.
- Create database user.
- Use URL-encoded password in `MONGO_URI`.

## Current Image Setup

The frontend uses Cloudinary AVIF images for:
- Hero image
- Atelier Wool Overcoat
- Liquid Silk Camp Shirt
- Technical Pleated Trouser
- Sculpt Knit Dress

The Open Graph/social image uses the Cloudinary hero image.

## Useful Commands

```bash
pnpm install
pnpm dev
pnpm dev:client
pnpm dev:server
pnpm build
pnpm test
pnpm email:test
pnpm seed
```

## Production Notes

- Rotate any secret that was pasted in chat or shared publicly.
- Use strong random JWT and cookie secrets.
- Use a verified sender/domain in Resend before production email sending.
- Replace demo credentials before launch.
- Set correct `CLIENT_URL` and `VITE_SITE_URL` after deployment.
