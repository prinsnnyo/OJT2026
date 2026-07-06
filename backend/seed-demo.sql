CREATE TABLE IF NOT EXISTS "User" (
  id text PRIMARY KEY,
  email text NOT NULL UNIQUE,
  password text NOT NULL,
  name text,
  "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO "User" (id, email, password, name)
VALUES ('demo-user-id', 'demo@ojt.com', '$2b$10$tDqKqduSeEQRSVDxmpfamO71N/Hh6DS0G23wQ9RFcSVukD.jRwpdu', 'Demo User')
ON CONFLICT (email) DO NOTHING;

SELECT id, email, name FROM "User" WHERE email = 'demo@ojt.com';
