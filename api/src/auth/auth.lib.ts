
export interface AccessTokenResponse {
    accessToken: string,
}

export interface SignInRequest {
    email: string,
    password: string,
}

export interface RegisterRequest {
    name: string,
    email: string,
}

export interface NewAccountResponse {
    password: string,
}