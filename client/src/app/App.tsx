import { Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { socket } from "../../shared/lib/socket";

export const App = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        socket.on("connect", () => setIsConnected(true));
        socket.on("disconnect", () => setIsConnected(false));
        return () => {
            socket.off("connect");
            socket.off("disconnect");
        };
    }, []);

    return (
        <div className="flex h-screen w-full bg-gray-50 text-[#404040] font-sans">
            <nav className="w-20 flex flex-col items-center py-6 bg-white border-r border-gray-200 gap-8">
                <Link title="Home" to="/" className="p-3 -my-4 rounded-xl transition-colors">
                    <div className="font-bold text-[#00A3FF] text-xl">PS</div>
                </Link>
                <Link title="Users" to="/users" className="p-3 hover:bg-[#e6f6ff] rounded-xl transition-colors">👥</Link>
                <Link title="Streaming" to="/streaming" className="p-3 hover:bg-[#e6f6ff] rounded-xl transition-colors">📺</Link>
                <Link title="Workers" to="/workers" className="p-3 hover:bg-[#e6f6ff] rounded-xl transition-colors">⚙️</Link>
            </nav>

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8 justify-between">
                    <h1 className="text-lg font-semibold uppercase tracking-wider text-gray-500">
                        Presight Exercise Dashboard
                    </h1>
                    <span className={`text-sm flex items-center gap-2 ${isConnected ? "text-[#7edb56]" : "text-red-400"}`}>
                        <span className={`w-2 h-2 rounded-full ${isConnected ? "bg-[#7edb56] animate-pulse" : "bg-red-400"}`} />
                        {isConnected ? "Socket Online" : "Socket Offline"}
                    </span>
                </header>

                <main className="flex-1 overflow-auto bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default App;
