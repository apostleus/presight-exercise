import { parentPort } from "worker_threads";

if (!parentPort) throw new Error("Must run as a worker thread");

parentPort.on("message", async ({ id }: { id: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    parentPort!.postMessage({
        id,
        result: `Processed job ${id} at ${new Date().toISOString()}`,
    });
});
