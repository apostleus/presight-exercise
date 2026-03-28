import { useState, useRef, useCallback } from "react";

type StreamStatus = "idle" | "streaming" | "done";

export function StreamDisplay() {
    const [text, setText] = useState("");
    const [status, setStatus] = useState<StreamStatus>("idle");

    const bufferRef = useRef("");
    const queueRef = useRef<string[]>([]);
    const intervalRef = useRef<ReturnType<typeof setInterval>>(null!);
    const readerRef = useRef<ReadableStreamDefaultReader<Uint8Array> | null>(null);
    const cancelledRef = useRef(false);

    const startStream = useCallback(async () => {
        setText("");
        bufferRef.current = "";
        queueRef.current = [];
        cancelledRef.current = false;
        setStatus("streaming");

        const response = await fetch("/api/stream");
        const reader = response.body!.getReader();
        readerRef.current = reader;
        const decoder = new TextDecoder();

        intervalRef.current = setInterval(() => {
            if (queueRef.current.length > 0) {
                bufferRef.current += queueRef.current.shift()!;
                setText(bufferRef.current);
            }
        }, 100);

        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                queueRef.current.push(...decoder.decode(value, { stream: true }));
            }
        } catch {
            return;
        }

        if (cancelledRef.current) return;

        clearInterval(intervalRef.current);
        bufferRef.current += queueRef.current.join("");
        queueRef.current = [];
        setText(bufferRef.current);
        setStatus("done");
    }, []);

    const stopStream = useCallback(() => {
        cancelledRef.current = true;
        readerRef.current?.cancel();
        clearInterval(intervalRef.current);
        setText(bufferRef.current);
        setStatus("idle");
    }, []);

    return (
        <div className="flex flex-col gap-4 p-6 h-full">
            <div className="flex items-center gap-3">
                {status !== "streaming" ? (
                    <button
                        onClick={startStream}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                        {status === "done" ? "Stream Again" : "Start Streaming"}
                    </button>
                ) : (
                    <button
                        onClick={stopStream}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                    >
                        Stop
                    </button>
                )}
                {status === "streaming" && (
                    <span className="text-sm text-gray-500 flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        Streaming...
                    </span>
                )}
                {status === "done" && (
                    <span className="text-sm text-green-600">
                        ✓ {text.length} characters received
                    </span>
                )}
            </div>

            {text && (
                <div className="flex-1 overflow-auto bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                    <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap font-mono">
                        {text}
                        {status === "streaming" && (
                            <span className="inline-block w-0.5 h-4 bg-blue-500 ml-0.5 animate-pulse" />
                        )}
                    </p>
                </div>
            )}
        </div>
    );
}
