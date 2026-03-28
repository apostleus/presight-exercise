import { useRef, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { User } from "../../entities/user/model";
import { UserCard } from "../../entities/user/UserCard";

interface Props {
    items: User[];
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
}

const ITEM_HEIGHT = 112;

export function UserList({ items, hasNextPage, isFetchingNextPage, fetchNextPage }: Props) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);

    const virtualizer = useVirtualizer({
        count: items.length,
        getScrollElement: () => scrollRef.current,
        estimateSize: () => ITEM_HEIGHT,
        overscan: 5,
    });

    useEffect(() => {
        if (!sentinelRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <div ref={scrollRef} className="flex-1 overflow-auto">
            <div style={{ height: virtualizer.getTotalSize(), position: "relative" }}>
                {virtualizer.getVirtualItems().map((virtualItem) => (
                    <UserCard
                        key={items[virtualItem.index].id}
                        user={items[virtualItem.index]}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: `${virtualItem.size}px`,
                            transform: `translateY(${virtualItem.start}px)`,
                        }}
                    />
                ))}
            </div>

            <div ref={sentinelRef} className="h-4">
                {isFetchingNextPage && (
                    <div className="text-center text-gray-400 text-sm py-2">Loading...</div>
                )}
            </div>
        </div>
    );
}
