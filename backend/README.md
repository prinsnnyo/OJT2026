# Backend — Architecture

NestJS REST API for the OJT Todo App. Handles authentication (JWT) and todo CRUD. Data is stored in PostgreSQL via Prisma 7.

**Setup:** see [INSTALLATION.md](../INSTALLATION.md)  
**Runs on:** http://localhost:4000

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | NestJS 11 |
| Language | TypeScript 5.7 |
| ORM | Prisma 7 (`@prisma/adapter-pg` + `pg`) |
| Database | PostgreSQL |
| Auth | Passport JWT + bcrypt |
| Validation | class-validator / class-transformer |

---

## High-level architecture

```
                    ┌─────────────────────────────────────────┐
                    │              main.ts                     │
                    │  CORS · ValidationPipe · listen(:4000)  │
                    └────────────────────┬────────────────────┘
                                         │
                    ┌────────────────────▼────────────────────┐
                    │              AppModule                   │
                    │  ConfigModule · Prisma · Auth · Todos   │
                    └───────┬─────────────────┬───────────────┘
                            │                 │
              ┌─────────────▼──────┐   ┌──────▼──────────────┐
              │    AuthModule      │   │    TodosModule      │
              │  register / login  │   │  CRUD /todos        │
              │  JWT strategy      │   │  AuthGuard('jwt')   │
              └─────────┬──────────┘   └──────┬──────────────┘
                        │                     │
                        └──────────┬──────────┘
                                   │
                        ┌──────────▼──────────┐
                        │    PrismaModule     │
                        │    PrismaService    │
                        └──────────┬──────────┘
                                   │
                        ┌──────────▼──────────┐
                        │     PostgreSQL      │
                        │   User · Todo       │
                        └─────────────────────┘
```

---

## Folder structure

```
backend/
├── prisma/
│   ├── schema.prisma      # User + Todo models
│   ├── migrations/        # SQL migration history
│   └── seed.ts            # Demo user + sample todos
├── src/
│   ├── main.ts            # Bootstrap, CORS, global pipes
│   ├── app.module.ts      # Root module
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts   # POST /auth/register, /auth/login
│   │   ├── auth.service.ts      # bcrypt + JWT signing
│   │   ├── jwt.strategy.ts      # Validates Bearer token
│   │   └── dto/auth.dto.ts
│   ├── todos/
│   │   ├── todos.module.ts
│   │   ├── todos.controller.ts  # GET/POST/PUT/DELETE /todos
│   │   ├── todos.service.ts     # Prisma queries (scoped by userId)
│   │   └── dto/todo.dto.ts
│   └── prisma/
│       ├── prisma.module.ts     # Global Prisma provider
│       └── prisma.service.ts    # PrismaClient + pg Pool adapter
├── .env                   # DATABASE_URL, JWT_SECRET, PORT (not committed)
└── package.json
```

---

## Database schema

```prisma
User
├── id        UUID (PK)
├── email     unique
├── password  bcrypt hash
├── name      optional
└── todos[]   one-to-many

Todo
├── id          UUID (PK)
├── title
├── description optional
├── completed   boolean (default false)
├── userId      FK → User (cascade delete)
├── createdAt
└── updatedAt
```

Todos are **always scoped to the logged-in user**. A user cannot read or modify another user's todos.

---

## Request flow

### Public routes (no JWT)

```
Client  POST /auth/register  { name, email, password }
           │
           ▼
        AuthController → AuthService
           │  hash password (bcrypt)
           │  create User in DB
           ▼
        { accessToken, user }

Client  POST /auth/login  { email, password }
           │
           ▼
        AuthService compares bcrypt hash
           ▼
        { accessToken, user }
```

### Protected routes (JWT required)

```
Client  GET /todos
        Header: Authorization: Bearer <token>
           │
           ▼
        AuthGuard('jwt') → JwtStrategy validates token
           │  extracts userId from payload.sub
           ▼
        TodosController → TodosService.findAll(userId)
           ▼
        JSON array of todos
```

Same guard applies to `POST`, `PUT`, and `DELETE` on `/todos`.

---

## API endpoints

| Method | Path | Auth | Body | Response |
|--------|------|------|------|----------|
| POST | `/auth/register` | — | `{ name, email, password }` | `{ accessToken, user }` |
| POST | `/auth/login` | — | `{ email, password }` | `{ accessToken, user }` |
| GET | `/todos` | JWT | — | `Todo[]` |
| GET | `/todos/:id` | JWT | — | `Todo` |
| POST | `/todos` | JWT | `{ title, description? }` | `Todo` |
| PUT | `/todos/:id` | JWT | `{ title?, description?, completed? }` | `Todo` |
| DELETE | `/todos/:id` | JWT | — | `204 No Content` |

### Error responses

NestJS returns standard HTTP status codes:

| Status | When |
|--------|------|
| 400 | Validation failed (DTO) |
| 401 | Invalid login or missing/invalid JWT |
| 404 | Todo not found (or not owned by user) |
| 409 | Email already registered |

---

## Authentication details

1. **Register / Login** — `AuthService` hashes passwords with bcrypt (10 rounds) and signs a JWT with `JWT_SECRET`.
2. **JWT payload** — `{ sub: userId, email }`.
3. **Protected routes** — `JwtStrategy` reads `Authorization: Bearer <token>`, validates signature, and attaches `{ userId, email }` to the request.
4. **Todo ownership** — every `TodosService` method filters by `userId` from the JWT.

---

## Prisma 7 + PostgreSQL

Prisma 7 uses the **driver adapter** pattern instead of a direct connection string in the client:

```typescript
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
```

`DATABASE_URL` is read from `backend/.env`.

---

## Configuration

| Variable | Purpose | Example |
|----------|---------|---------|
| `DATABASE_URL` | PostgreSQL connection | `postgresql://postgres:admin@localhost:5432/ojt?schema=public` |
| `JWT_SECRET` | Signs JWT tokens | any long random string in dev |
| `PORT` | API listen port | `4000` |

CORS is enabled for `http://localhost:3000` and `http://127.0.0.1:3000` in `main.ts`.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run start:dev` | Dev server with hot reload |
| `npm run build` | Compile to `dist/` |
| `npm run start:prod` | Run compiled `dist/main.js` |
| `npx prisma migrate dev` | Apply migrations |
| `npx prisma db seed` | Seed demo data |
| `npx prisma studio` | Visual database browser |

---

## Design decisions

| Decision | Reason |
|----------|--------|
| NestJS modules | Clear separation: auth vs todos vs database |
| JWT (stateless) | Simple SPA auth without server sessions |
| Prisma | Type-safe queries and migrations |
| User-scoped todos | Security — no cross-user data access |
| `204` on DELETE | Standard REST — no response body |
| Port 4000 | Avoids conflict with Nuxt on 3000 |
