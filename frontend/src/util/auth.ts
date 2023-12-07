import { API_URL } from "./api";

export interface AuthResposne {
    accessToken: string;
}

export interface UserClaims {
    sub: number;
    name: string;
    email: string;
    iat: number;
    exp: number
}

export async function login(email: string, password: string) {
    return fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        }),
    });
}