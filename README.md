# OJT Todo App

Full-stack todo application for OJT practice — login, register, and full todo CRUD (create, read, update, delete).

| Layer | Stack | Port |
| --- | --- | --- |
| Frontend | Nuxt 4 SPA, Vue 3, Tailwind CSS v4, Reka UI | `3000` |
| Backend | NestJS 11, Prisma 7, PostgreSQL | `4000` |
| Database | PostgreSQL (local, no Docker) | `5432` (or your port) |

## Documentation

| Document | Description |
| --- | --- |
| [INSTALLATION.md](./INSTALLATION.md) | **Step-by-step setup** — PostgreSQL, backend, frontend, run the app |
| [backend/README.md](./backend/README.md) | Backend architecture |
| [frontend/README.md](./frontend/README.md) | Frontend architecture |

## Quick start

Install each app separately:

```bash
cd backend && npm install
cd ../frontend && npm install
```

Then follow [INSTALLATION.md](./INSTALLATION.md) for database setup, migrations, and environment files.

**Two terminals:**

```bash
# Terminal 1 — API
npm run dev:backend

# Terminal 2 — SPA
npm run dev:frontend
```

- Frontend: [http://localhost:3000](http://localhost:3000)  
- Backend API: [http://localhost:4000](http://localhost:4000)  
- Demo login: `demo@ojt.com` / `demo123`

## Project structure

```text
OJT2026/
├── backend/          NestJS REST API + Prisma
├── frontend/         Nuxt 4 SPA
├── INSTALLATION.md   Setup guide (start here)
├── README.md         This file
└── package.json      Root helper scripts for separate installs
```
