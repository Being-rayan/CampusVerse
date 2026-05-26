# CampusVerse / SkillCity

Full-stack 3D student collaboration platform setup.

## Stack

- Client: React, Vite, TypeScript, Three.js, React Three Fiber, Drei, GSAP, Framer Motion, Tailwind CSS
- Server: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, Socket.io, Redis-ready config

## Run

```powershell
npm install
npm run dev
```

Client: http://localhost:5173
API health: http://localhost:5000/api/health

## Backend Core

- `POST /api/auth/register` creates a student user, hashes the password, creates a profile, and returns a JWT.
- `POST /api/auth/login` verifies email/password with bcrypt and returns a JWT.
- `GET /api/auth/me` returns the logged-in user and profile.
- `GET /api/profile/me` returns the logged-in student's profile.
- `PUT /api/profile/me` updates skills, interests, roles, goals, links, college, bio, and projects.

## Workflow

```powershell
npm run build
npm run dev
npm run check
npm run format
npm run check
```

Copy `server/.env.example` to `server/.env` when database work starts. Client env values stay in `client/.env.local` when needed.
