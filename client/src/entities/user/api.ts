import type { UsersApiResponse } from "./model";

interface FetchUsersParams {
    page: number;
    limit?: number;
    search?: string;
    nationalities?: string[];
    hobbies?: string[];
}

export async function fetchUsers(params: FetchUsersParams): Promise<UsersApiResponse> {
    const query = new URLSearchParams();
    query.set("page", String(params.page));
    query.set("limit", String(params.limit ?? 20));
    if (params.search) query.set("search", params.search);
    if (params.nationalities?.length) query.set("nationalities", params.nationalities.join(","));
    if (params.hobbies?.length) query.set("hobbies", params.hobbies.join(","));

    const res = await fetch(`/api/users?${query}`);
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
}
