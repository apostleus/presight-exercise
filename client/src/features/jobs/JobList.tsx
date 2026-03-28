import { useState, useCallback } from "react";
import { useJobResults } from "./useWebSocket";

interface Job {
    id: string;
    status: "pending" | "done";
    result: string | null;
}

export function JobList() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isRunning, setIsRunning] = useState(false);

    const handleResult = useCallback(({ id, result }: { id: string; result: string }) => {
        setJobs((prev) =>
            prev.map((job) => (job.id === id ? { ...job, status: "done", result } : job))
        );
    }, []);

    useJobResults(handleResult);

    const startJobs = async () => {
        setIsRunning(true);
        setJobs([]);

        const responses = await Promise.all(
            Array.from({ length: 20 }, () =>
                fetch("/api/jobs", { method: "POST" }).then((r) => r.json())
            )
        );

        setJobs(responses.map((r) => ({ id: r.id, status: "pending", result: null })));
        setIsRunning(false);
    };

    const doneCount = jobs.filter((j) => j.status === "done").length;

    return (
        <div className="flex flex-col gap-4 p-6 h-full">
            <div className="flex items-center gap-4">
                <button
                    onClick={startJobs}
                    disabled={isRunning || jobs.some((j) => j.status === "pending")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                >
                    {isRunning ? "Sending..." : "Send 20 Jobs"}
                </button>

                {jobs.length > 0 && (
                    <span className="text-sm text-gray-500">
                        {doneCount} / {jobs.length} done
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-2 overflow-auto">
                {jobs.map((job, i) => (
                    <div
                        key={job.id}
                        className="bg-white rounded-lg border border-gray-100 px-4 py-3 flex items-center gap-3"
                    >
                        <span className="text-xs text-gray-400 w-6">#{i + 1}</span>

                        <span
                            className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                job.status === "done" ? "bg-green-500" : "bg-yellow-400 animate-pulse"
                            }`}
                        />

                        <span
                            className={`text-xs font-medium w-14 ${
                                job.status === "done" ? "text-green-600" : "text-yellow-600"
                            }`}
                        >
                            {job.status}
                        </span>

                        <span className="text-sm text-gray-600 truncate">
                            {job.result ?? "waiting for result..."}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
