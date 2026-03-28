import { Link, Outlet } from "react-router-dom";

export const App = () => {
    return (
        <div className="flex h-screen w-full bg-gray-50 text-gray-900 font-sans">
            <nav className="w-20 flex flex-col items-center py-6 bg-white border-r border-gray-200 gap-8">
                <div className="font-bold text-blue-600 text-xl">PS</div>
                <Link title="Users" to="/users" className="p-3 hover:bg-blue-50 rounded-xl transition-colors">👥</Link>
                <Link title="Streaming" to="/streaming" className="p-3 hover:bg-blue-50 rounded-xl transition-colors">📺</Link>
                <Link title="Workers" to="/workers" className="p-3 hover:bg-blue-50 rounded-xl transition-colors">⚙️</Link>
            </nav>

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8 justify-between">
                    <h1 className="text-lg font-semibold uppercase tracking-wider text-gray-500">
                        Presight Exercise Dashboard
                    </h1>
                    <div className="flex items-center gap-4">
             <span className="text-sm text-green-500 flex items-center gap-2">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
               Socket Online
             </span>
                    </div>
                </header>

                <main className="flex-1 overflow-auto bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default App;