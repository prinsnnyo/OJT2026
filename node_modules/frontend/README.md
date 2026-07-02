# Frontend — Architecture

Nuxt 4 single-page application (SPA) for the OJT Todo App. Users log in, then manage a personal todo list with full CRUD.

**Setup:** see [INSTALLATION.md](../INSTALLATION.md)  
**Runs on:** http://localhost:3000  
**API:** http://localhost:4000 (configured in `.env`)

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | Nuxt 4 (SPA mode, `ssr: false`) |
| UI | Vue 3, TypeScript 5.7 |
| Styling | Tailwind CSS v4 |
| Components | Reka UI (shadcn-style primitives) |
| Forms | VeeValidate + Zod |
| Icons | Lucide Vue |
| HTTP | Native `fetch` via `useApi` composable |

---

## High-level architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser (SPA)                            │
├─────────────────────────────────────────────────────────────────┤
│  Pages                                                           │
│  ├── /login          guest middleware                            │
│  ├── /register       guest middleware                            │
│  └── /todos          auth middleware → todo dashboard            │
├─────────────────────────────────────────────────────────────────┤
│  Components                                                      │
│  ├── TodoList        add form + task list + actions              │
│  └── TodoEditDialog  modal edit form                             │
├─────────────────────────────────────────────────────────────────┤
│  Composables                                                     │
│  ├── useAuth         login, register, logout, JWT cookie         │
│  ├── useTodos        fetch, create, update, delete todos         │
│  └── useApi          fetch wrapper + Authorization header        │
├─────────────────────────────────────────────────────────────────┤
│  Middleware                                                      │
│  ├── auth.ts         redirect to /login if not authenticated     │
│  └── guest.ts        redirect to /todos if already logged in     │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTP + JWT
                             ▼
                    NestJS API (:4000)
```

---

## Folder structure

```
frontend/
├── app/
│   ├── app.vue                 # Root layout (<NuxtPage />)
│   ├── assets/css/tailwind.css # Tailwind v4 theme tokens
│   ├── components/
│   │   ├── todos/
│   │   │   ├── TodoList.vue        # Main list + add form
│   │   │   └── TodoEditDialog.vue  # Edit modal
│   │   └── ui/                     # Button, Card, Checkbox, etc.
│   ├── composables/
│   │   ├── useApi.ts           # HTTP client
│   │   ├── useAuth.ts          # Auth state + actions
│   │   └── useTodos.ts         # Todo state + CRUD
│   ├── lib/utils.ts            # cn() — class name helper
│   ├── middleware/
│   │   ├── auth.ts
│   │   └── guest.ts
│   ├── pages/
│   │   ├── index.vue           # Redirect → /login or /todos
│   │   ├── login.vue
│   │   ├── register.vue
│   │   └── todos/index.vue     # Main app screen after login
│   ├── schemas/index.ts        # Zod validation schemas
│   ├── types/index.ts          # User, Todo, AuthResponse types
│   └── spa-loading-template.html
├── nuxt.config.ts
├── .env                        # NUXT_PUBLIC_API_BASE
└── package.json
```

Nuxt 4 uses the `app/` directory as the source root. The `@/` alias points to `app/`.

---

## Routing and navigation

| Route | Page | Middleware | Purpose |
|-------|------|------------|---------|
| `/` | `index.vue` | — | Redirects to `/login` or `/todos` |
| `/login` | `login.vue` | `guest` | Sign in |
| `/register` | `register.vue` | `guest` | Create account |
| `/todos` | `todos/index.vue` | `auth` | Todo dashboard |

### Middleware behavior

**`auth`** — if no `auth_token` cookie → redirect to `/login`  
**`guest`** — if `auth_token` exists → redirect to `/todos`

---

## User flow

```
1. User opens http://localhost:3000
         │
         ▼
2. index.vue → navigateTo(/login) or /todos)
         │
         ▼
3. /login — VeeValidate form → useAuth.login()
         │
         ▼
4. POST /auth/login → store JWT in cookie → navigateTo(/todos)
         │
         ▼
5. /todos — fetchTodos() → render TodoList
         │
         ├── Add task    → POST /todos
         ├── Edit (modal)→ PUT /todos/:id
         ├── Checkbox    → PUT /todos/:id { completed }
         └── Delete      → DELETE /todos/:id
```

---

## State management

No Pinia — Nuxt composables with `useState` for shared reactive state:

| Composable | State | Persistence |
|------------|-------|-------------|
| `useAuth` | `token` (cookie), `user` (useState) | Cookie survives refresh |
| `useTodos` | `todos`, `loading`, `error` | In-memory per session |

### `useApi`

Central HTTP client:

- Prefixes requests with `NUXT_PUBLIC_API_BASE`
- Attaches `Authorization: Bearer <token>` when logged in
- Handles empty responses (e.g. `204` DELETE) without JSON parse errors

### `useAuth`

```typescript
login(email, password)    → POST /auth/login → set cookie + user
register(name, email, pw) → POST /auth/register → set cookie + user
logout()                  → clear cookie + user → /login
isAuthenticated           → computed from cookie
```

### `useTodos`

```typescript
fetchTodos()              → GET /todos
createTodo(title, desc?)  → POST /todos → prepend to list
updateTodo(id, data)      → PUT /todos/:id → replace in list
deleteTodo(id)            → DELETE /todos/:id → remove from list
```

---

## Forms and validation

Zod schemas in `app/schemas/index.ts`:

| Schema | Used in |
|--------|---------|
| `loginSchema` | `login.vue` |
| `registerSchema` | `register.vue` (includes password match) |
| `createTodoSchema` | `TodoList.vue` add form |
| `updateTodoSchema` | `TodoEditDialog.vue` |

Forms use **VeeValidate** (`useForm` + `toTypedSchema`) with native `<input>` elements and `v-model` on `defineField` refs.

---

## UI components

Built with **Reka UI** primitives in `app/components/ui/`:

| Component | Usage |
|-----------|--------|
| `Button` | Actions, submit, logout |
| `Card` | Page sections, login box, edit dialog |
| `Checkbox` | Mark todo complete |
| `Label` | Form labels |

Styled with Tailwind CSS v4 and `cn()` from `tailwind-merge` + `clsx`.

---

## Key pages

### `login.vue`

- Guest-only page (`layout: false` — full-screen centered card)
- Demo account helper (fill credentials button)
- On success → `/todos`

### `todos/index.vue`

- App shell: header (title, user, logout) + `TodoList` + `TodoEditDialog`
- Loads todos on mount
- Handles edit, delete, toggle-complete events from `TodoList`

### `TodoList.vue`

- Add task form at top
- List of tasks with checkbox, title, description, edit/delete buttons
- Emits events to parent for API calls

### `TodoEditDialog.vue`

- Modal overlay for editing title, description, and completed status
- Pre-fills form when `todo` prop changes

---

## Configuration

### `nuxt.config.ts` highlights

| Setting | Value | Why |
|---------|-------|-----|
| `ssr: false` | SPA mode | Client-only app, no server render |
| `devServer.port` | `3000` | Fixed frontend port |
| `devServer.strictPort` | `true` | Fail if 3000 is taken |
| `runtimeConfig.public.apiBase` | from `.env` | Backend URL |
| `experimental.appManifest` | `false` | Avoids dev manifest issues |
| `vite.server.watch.usePolling` | `true` | Better file watching on Windows/OneDrive |

### Environment

```env
NUXT_PUBLIC_API_BASE=http://localhost:4000
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server on port 3000 |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `node ./node_modules/nuxt/bin/nuxt.mjs prepare` | Regenerate `.nuxt` types (Windows) |

---

## Design decisions

| Decision | Reason |
|----------|--------|
| Nuxt SPA (`ssr: false`) | Simpler OJT setup — API handles all data |
| JWT in cookie | Persists login across page refresh |
| Composables over Pinia | Less boilerplate for a small app |
| Zod + VeeValidate | Type-safe client validation before API calls |
| Explicit component imports | Reliable on Windows / Nuxt 4 `app/` directory |
| Separate login and todos pages | Clear auth boundary — CRUD only after login |
| `useApi` empty-body handling | DELETE returns 204 with no JSON |

---

## Related docs

- [Installation guide](../INSTALLATION.md)  
- [Backend architecture](../backend/README.md)  
