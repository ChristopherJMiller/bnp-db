import { IsEmail, IsNotEmpty } from "class-validator";

export interface AccessTokenResponse {
    accessToken: string,
}

export class SignInRequest {
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
}

export class RegisterRequest {
    @IsNotEmpty()
    name: string;
    @IsEmail()
    email: string;
}

export interface NewAccountResponse {
    password: string,
}