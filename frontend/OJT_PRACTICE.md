# OJT Todo App — Frontend Practice Tasks

The **backend API is fully working**. Your job is to wire up the remaining frontend calls.

Search for `TODO (OJT)` in the codebase.

---

## Task 1 — Register user

**File:** `app/composables/useAuth.ts`

Implement `register()` using the same pattern as `login()`:

```typescript
const response = await api.post<AuthResponse>('/auth/register', { name, email, password })
token.value = response.accessToken
user.value = response.user
```

**Test:** Submit `/register` → redirects to `/todos`.

---

## Task 2 — Update todo

**Files:**
- `app/composables/useTodos.ts` — implement `updateTodo()`
- `app/schemas/index.ts` — add `completed: z.boolean()` to `updateTodoSchema`

```typescript
const updated = await api.put<Todo>(`/todos/${id}`, data)
todos.value = todos.value.map(t => t.id === id ? updated : t)
```

**Test:** Toggle checkbox in table → persists after page refresh.

---

## Task 3 — Delete todo

**File:** `app/composables/useTodos.ts`

```typescript
await api.delete(`/todos/${id}`)
todos.value = todos.value.filter(t => t.id !== id)
```

**Test:** Click Delete → row disappears and stays gone after refresh.

---

## Task 4 — Edit dialog

**File:** `app/components/todos/TodoEditDialog.vue`

1. Add `useForm` + `toTypedSchema(updateTodoSchema)`
2. Pre-fill fields when `todo` prop changes (`watch`)
3. On submit, call `updateTodo()` and emit `saved`

**Test:** Click Edit → change title → Save → table updates.

---

## Already done (study these first)

| Feature | Files | API |
|---------|-------|-----|
| API client | `useApi.ts` | fetch + JWT header |
| Login | `useAuth.ts`, `login.vue` | `POST /auth/login` |
| List todos | `useTodos.ts`, `TodoTable.vue` | `GET /todos` |
| Create todo | `TodoForm.vue` | `POST /todos` |
| Auth guard | `middleware/auth.ts` | cookie token check |

---

## Demo account

| Email | Password |
|-------|----------|
| `demo@ojt.com` | `demo123` |

Created by `npx prisma db seed` in the backend.
