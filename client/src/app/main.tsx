import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import "./index.css";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "users",
                lazy: async () => {
                    const { UsersPage } = await import("../pages/UsersPage");
                    return { Component: UsersPage };
                },
            },
            {
                path: "streaming",
                lazy: async () => {
                    const { StreamPage } = await import("../pages/StreamPage");
                    return { Component: StreamPage };
                },
            },
            {
                path: "workers",
                lazy: async () => {
                    const { WorkersPage } = await import("../pages/WorkersPage");
                    return { Component: WorkersPage };
                },
            },
        ],
    },
]);

const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error("Failed to find the root element");
}

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>
);