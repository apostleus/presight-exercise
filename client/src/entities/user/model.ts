export interface User {
    id: string;
    avatar: string;
    first_name: string;
    last_name: string;
    age: number;
    nationality: string;
    hobbies: string[];
}

export interface FilterOption {
    name: string;
    count: number;
}

export interface UsersApiResponse {
    data: User[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        topHobbies: FilterOption[];
        topNationalities: FilterOption[];
    };
}
