# Presight Frontend Exercise

A full-stack application built with React, Node.js, and WebSockets demonstrating three real-time features.

## Tech Stack

**Client:** React 19, TypeScript, Vite, TailwindCSS v4, React Query, @tanstack/react-virtual, Socket.io-client
**Server:** Node.js, Express 5, Socket.io, worker_threads
**Architecture:** Feature Sliced Design (client), monorepo via Lerna + Yarn workspaces

## Getting Started

```bash
yarn install
yarn start
```

| Service | URL                   |
|---------|-----------------------|
| Client  | http://localhost:5174 |
| Server  | http://localhost:3000 |

## Use Cases

### 1. Users — `/users`

Paginated list of 500 users with virtual scroll and infinite scroll.
Filter by nationality and hobbies via sidebar. Search by name.

**Implementation highlights:**
- `@tanstack/react-virtual` for DOM-efficient rendering (only visible cards in DOM)
- `useInfiniteQuery` from React Query for cursor-based pagination
- `IntersectionObserver` sentinel for infinite scroll trigger
- Server-side aggregation returns top-20 hobbies/nationalities per filtered result set

### 2. Streaming — `/streaming`

Streams ~8,000 characters of text from server and displays them one character at a time.

**Implementation highlights:**
- Server sends chunked HTTP response via `res.write()` + `setInterval`
- Client reads via `response.body.getReader()` (Web Streams API)
- Characters queued in memory, displayed via `setInterval(100ms)` — decoupled from network timing
- Stop button calls `reader.cancel()` to actually close the fetch connection

### 3. Workers — `/workers`

Sends 20 jobs to the server and receives results in real-time over WebSocket.

**Implementation highlights:**
- Server processes jobs in a `worker_threads` Worker with a 2-second delay
- Results pushed to all clients via Socket.io `io.emit`
- Client subscribes with `socket.on("job:result", ...)` and updates UI reactively
- UI transitions from `pending` → `done` as each job completes

## Project Structure

```
presight-execise/
├── client/               # React app (Feature Sliced Design)
│   └── src/
│       ├── app/          # Entry point, routing, global styles
│       ├── pages/        # Page compositions
│       ├── features/     # user-list, stream, jobs
│       ├── entities/     # user (model, api, card)
│       └── shared/       # socket singleton, types
└── server/               # Node.js API
    └── src/
        ├── routes/       # users, stream, jobs
        ├── data/         # 500 generated users (faker, seeded on startup)
        ├── workers/      # worker_threads job processor
        └── services/     # job queue, socket.io wiring
```
