# Installation Guide — OJT Todo App

Step-by-step instructions to install and run the **backend** and **frontend** on your machine.

**No Docker.** You need PostgreSQL installed locally (pgAdmin or `psql`).

---

## Prerequisites

Install these before you begin:

| Tool | Version | Verify |
|------|---------|--------|
| Node.js | 20.x or 22.x LTS | `node -v` |
| npm | 10+ | `npm -v` |
| PostgreSQL | 14+ (16+ recommended) | pgAdmin or `psql` |

Optional: VS Code with the **Vue (Official)** extension.

---

## Overview

```
┌─────────────┐     HTTP (JWT)      ┌─────────────┐     SQL      ┌──────────────┐
│  Frontend   │ ──────────────────► │   Backend   │ ───────────► │  PostgreSQL  │
│  :3000      │                     │   :4000     │              │  database    │
│  Nuxt SPA   │                     │   NestJS    │              │  ojt         │
└─────────────┘                     └─────────────┘              └──────────────┘
```

**Ports (do not swap them):**

- Frontend → `3000`
- Backend API → `4000`

---

## Part 1 — PostgreSQL database

### Step 1: Start PostgreSQL

On Windows, open **Services** and confirm the PostgreSQL service is **Running**.

Or open **pgAdmin** — if it connects to your server, PostgreSQL is up.

### Step 2: Note your connection details

In pgAdmin: right-click your server → **Properties** → **Connection**

| Field | Common value |
|-------|----------------|
| Host | `localhost` |
| Port | `5432` (some installs use `5434` — check yours) |
| Username | `postgres` |
| Password | your PostgreSQL password |

### Step 3: Create the database

1. Expand **Servers** → your server  
2. Right-click **Databases** → **Create** → **Database…**  
3. Name: **`ojt`** → Save  

If `ojt` already exists, skip this step.

---

## Part 2 — Backend (NestJS API)

### Step 1: Go to the backend folder

```bash
cd backend
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Create environment file

```bash
cp .env.example .env
```

Edit `backend/.env` with your PostgreSQL credentials:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/ojt?schema=public"
JWT_SECRET="ojt-dev-secret-change-in-production"
PORT=4000
```

**Examples:**

```env
# Default port 5432, password "admin"
DATABASE_URL="postgresql://postgres:admin@localhost:5432/ojt?schema=public"

# PostgreSQL on port 5434 (common on some Windows installs)
DATABASE_URL="postgresql://postgres:admin@localhost:5434/ojt?schema=public"
```

> If your password contains special characters, URL-encode them (`@` → `%40`, `#` → `%23`).

### Step 4: Run database migrations

Creates `User` and `Todo` tables in the `ojt` database:

```bash
npx prisma migrate dev
```

When prompted for a migration name, you can press Enter to accept the default.

### Step 5: Seed demo data

```bash
npx prisma db seed
```

This creates:

| Email | Password |
|-------|----------|
| `demo@ojt.com` | `demo123` |

Plus two sample todos for the demo user.

**Verify in pgAdmin:** Databases → **ojt** → Schemas → public → Tables → `User`, `Todo`.

### Step 6: Start the API

```bash
npm run start:dev
```

You should see:

```
API running on http://localhost:4000
```

**Test the API:**

```bash
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"demo@ojt.com\",\"password\":\"demo123\"}"
```

Expected: JSON with `accessToken` and `user` — not HTML.

### Backend API reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | No | Create account |
| POST | `/auth/login` | No | Login, returns JWT |
| GET | `/todos` | JWT | List your todos |
| POST | `/todos` | JWT | Create todo |
| PUT | `/todos/:id` | JWT | Update todo |
| DELETE | `/todos/:id` | JWT | Delete todo (204, no body) |

Send JWT as: `Authorization: Bearer <accessToken>`

---

## Part 3 — Frontend (Nuxt SPA)

Open a **new terminal** (keep the backend running).

### Step 1: Go to the frontend folder

```bash
cd frontend
```

### Step 2: Install dependencies

```bash
npm install
```

**Windows only** — if you see a Rolldown binding error:

```bash
npm install @rolldown/binding-win32-x64-msvc
```

TypeScript is required for UI components (installed as a dev dependency). If you see `Failed to load TypeScript`:

```bash
npm install -D typescript vue-tsc
```

### Step 3: Generate Nuxt types

```bash
node ./node_modules/nuxt/bin/nuxt.mjs prepare
```

> On Windows, `nuxi` may not be in PATH — use the command above instead of `npx nuxi prepare`.

### Step 4: Create environment file

```bash
cp .env.example .env
```

Edit `frontend/.env`:

```env
NUXT_PUBLIC_API_BASE=http://localhost:4000
```

Must match the backend `PORT` in `backend/.env`.

### Step 5: Start the dev server

```bash
npm run dev
```

Open **http://localhost:3000**

You should be redirected to the login page.

### Step 6: Log in and use the app

1. Go to http://localhost:3000/login  
2. Sign in with `demo@ojt.com` / `demo123`  
3. You land on **My Todo List**  
4. Add, edit, complete, and delete tasks  

---

## Part 4 — Run from project root (optional)

The repo is an npm **workspace**. From the root folder `OJT2026/`:

### Install everything once

```bash
npm install
```

### Database (from root)

```bash
npm run db:migrate
npm run db:seed
```

### Dev servers (two terminals)

```bash
# Terminal 1
npm run dev:backend

# Terminal 2
npm run dev:frontend
```

### Other root scripts

| Script | Description |
|--------|-------------|
| `npm run db:generate` | Regenerate Prisma client |
| `npm run db:studio` | Open Prisma Studio (DB browser) |
| `npm run build:backend` | Production build — API |
| `npm run build:frontend` | Production build — SPA |
| `npm run prepare:frontend` | Run `nuxt prepare` for frontend |

---

## Verify everything works

1. PostgreSQL is running and database `ojt` exists  
2. Backend: `npm run start:dev` in `backend/` → http://localhost:4000  
3. Frontend: `npm run dev` in `frontend/` → http://localhost:3000  
4. Login with demo account → see todo list  
5. Add a todo → appears in the list and in pgAdmin `Todo` table  
6. Edit / complete / delete → changes persist after refresh  

---

## Troubleshooting

### Blank white page in the browser

1. Stop the frontend dev server (`Ctrl+C`)  
2. Clear Nuxt cache and restart:

```bash
cd frontend
rm -rf .nuxt node_modules/.cache
node ./node_modules/nuxt/bin/nuxt.mjs prepare
npm run dev
```

3. Hard refresh the browser: `Ctrl+Shift+R`  
4. Try http://localhost:3000/login directly  

### `Can't reach database server`

- PostgreSQL service is not running  
- Wrong host/port in `DATABASE_URL` (check pgAdmin → server Properties)  

### `password authentication failed`

- Wrong username or password in `DATABASE_URL`  

### `database "ojt" does not exist`

- Create database `ojt` in pgAdmin (Part 1, Step 3)  

### Login returns 401

```bash
cd backend
npx prisma db seed
```

Use exactly: `demo@ojt.com` / `demo123`

### CORS or network errors

- Backend must be running on port **4000**  
- Frontend `.env` must be `NUXT_PUBLIC_API_BASE=http://localhost:4000`  
- Frontend must be on port **3000** (`strictPort: true` in `nuxt.config.ts`)  

### Login hits HTML instead of JSON (port conflict)

If Nuxt steals port 3000 or backend is on the wrong port, login calls the wrong server.

```bash
# Backend FIRST — port 4000
cd backend && npm run start:dev

# Frontend — port 3000 only
cd frontend && npm run dev
```

### `[TSCONFIG_ERROR] Tsconfig not found` in terminal

The `.nuxt` folder was deleted while the dev server was running.

```bash
cd frontend
rm -rf .nuxt node_modules/.cache
node ./node_modules/nuxt/bin/nuxt.mjs prepare
npm run dev
```

### Delete shows JSON parse error

Fixed in `useApi.ts` — empty DELETE responses are handled. Refresh the page if you see stale todos after a failed delete.

### Project on OneDrive (slow or EBUSY errors)

OneDrive can lock files during dev. If builds fail with `EBUSY`:

- Pause OneDrive sync while developing, or  
- Move the project to a local folder (e.g. `C:\dev\OJT2026`)  

---

## Next steps

- [Backend architecture](./backend/README.md)  
- [Frontend architecture](./frontend/README.md)  
