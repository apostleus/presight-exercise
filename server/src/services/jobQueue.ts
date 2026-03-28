import { Worker } from "worker_threads";
import { fileURLToPath } from "url";
import path from "path";
import type { Server } from "socket.io";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let worker: Worker;

export function initJobQueue(io: Server) {
    worker = new Worker(
        path.join(__dirname, "../workers/jobWorker.ts"),
        { execArgv: ["--import", "tsx/esm"] }
    );

    worker.on("message", ({ id, result }: { id: string; result: string }) => {
        io.emit("job:result", { id, result });
    });

    worker.on("error", (err) => console.error("Worker error:", err));
}

export function enqueueJob(id: string) {
    worker.postMessage({ id });
}
