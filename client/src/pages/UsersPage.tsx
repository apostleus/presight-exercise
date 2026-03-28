import { useState, useCallback } from "react";
import { useInfiniteUsers } from "../features/user-list/useInfiniteUsers";
import { UserList } from "../features/user-list/UserList";
import { FilterSidebar } from "../features/user-list/FilterSidebar";

export function UsersPage() {
    const [search, setSearch] = useState("");
    const [selectedNationalities, setSelectedNationalities] = useState<string[]>([]);
    const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);

    const { items, topHobbies, topNationalities, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
        useInfiniteUsers({ search, nationalities: selectedNationalities, hobbies: selectedHobbies });

    const toggleNationality = useCallback((name: string) => {
        setSelectedNationalities((prev) =>
            prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
        );
    }, []);

    const toggleHobby = useCallback((name: string) => {
        setSelectedHobbies((prev) =>
            prev.includes(name) ? prev.filter((h) => h !== name) : [...prev, name]
        );
    }, []);

    return (
        <div className="flex h-full">
            <FilterSidebar
                topNationalities={topNationalities}
                topHobbies={topHobbies}
                selectedNationalities={selectedNationalities}
                selectedHobbies={selectedHobbies}
                onToggleNationality={toggleNationality}
                onToggleHobby={toggleHobby}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00A3FF] text-sm"
                    />
                </div>

                {isLoading ? (
                    <div className="flex-1 flex items-center justify-center text-gray-400">
                        Loading...
                    </div>
                ) : (
                    <UserList
                        items={items}
                        hasNextPage={hasNextPage}
                        isFetchingNextPage={isFetchingNextPage}
                        fetchNextPage={fetchNextPage}
                    />
                )}
            </div>
        </div>
    );
}
