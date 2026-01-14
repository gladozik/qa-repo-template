import {APIRequestContext} from "@playwright/test";
import {AuthResponse, RegisterDto} from "./types";

export async function registerUser(request: APIRequestContext, dto: RegisterDto) {
    const res = await request.post("/api/v1/auth/register", { data: dto });

    if (!res.ok()) {
        throw new Error(`Register failed: ${res.status()}\n${await res.text()}`);
    }
    return res;
}

export async function login(request: APIRequestContext, creds: { email: string; password: string }): Promise<AuthResponse> {
    const res = await request.post("/api/v1/auth/login", { data: creds });

    if (!res.ok()) {
        throw new Error(`Login failed: ${res.status()}\n${await res.text()}`);
    }
    return (await res.json()) as AuthResponse;
}
