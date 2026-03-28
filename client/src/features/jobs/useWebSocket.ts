import { useEffect } from "react";
import { socket } from "../../../shared/lib/socket";

interface JobResult {
    id: string;
    result: string;
}

export function useJobResults(onResult: (payload: JobResult) => void) {
    useEffect(() => {
        socket.on("job:result", onResult);
        return () => {
            socket.off("job:result", onResult);
        };
    }, [onResult]);
}
