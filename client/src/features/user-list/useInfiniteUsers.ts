import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../entities/user/api";
import type { FilterOption } from "../../entities/user/model";

interface UseInfiniteUsersOptions {
    search: string;
    nationalities: string[];
    hobbies: string[];
}

export function useInfiniteUsers({ search, nationalities, hobbies }: UseInfiniteUsersOptions) {
    const query = useInfiniteQuery({
        queryKey: ["users", { search, nationalities, hobbies }],

        queryFn: ({ pageParam }) =>
            fetchUsers({ page: pageParam, search, nationalities, hobbies }),

        initialPageParam: 1,

        getNextPageParam: (lastPage) =>
            lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
    });

    const items = query.data?.pages.flatMap((page) => page.data) ?? [];

    const firstPage = query.data?.pages[0]?.meta;
    const topHobbies: FilterOption[] = firstPage?.topHobbies ?? [];
    const topNationalities: FilterOption[] = firstPage?.topNationalities ?? [];

    return {
        items,
        topHobbies,
        topNationalities,
        isLoading: query.isLoading,
        isFetchingNextPage: query.isFetchingNextPage,
        hasNextPage: query.hasNextPage,
        fetchNextPage: query.fetchNextPage,
    };
}
