export type RegisterDto = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
};

export type UserDto = {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    birth_date: string;
    created_at: string;
    updated_at: string;
};

export type AuthResponse = {
    token: string;
    user: UserDto;
};

export type CreateAdReqDto = {
    title: string;
    description: string;
    price?: number;
    quantity?: number;
};

export type CreateAdResDto = {
    id: string;
    title: string;
    description: string;
    price?: number;
    quantity?: number;
    user_id: string;
    created_at: string;
    updated_at: string;
    photos: {
        id: string;
        url: string;
        sort_order: number;
        created_at: string;
    }[];
};


