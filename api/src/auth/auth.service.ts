import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AccessTokenResponse, NewAccountResponse } from './auth.lib';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import generator from 'generate-password';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {
        this.usersService.findAll().then((all) => {
            if (all.length === 0) {
                console.log("Creating initial user...");
                this.register("Admin User", "admin@bnp.local").then(({ password }) => {
                    console.log("admin@bnp.local created, password is", password);
                });
            }
        });
    }

    async signIn(email: string, password: string): Promise<AccessTokenResponse> {
        const user = await this.usersService.findOneBy({ email });

        if (!user) {
            throw new UnauthorizedException();
        }
        
        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if (!isMatch) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, username: user.email };
        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }

    async register(name: string, email: string): Promise<NewAccountResponse> {
        const password = generator.generate({ length: 64, numbers: true });
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        await this.usersService.create({ name, email, passwordHash });

        return {
            password
        };
    }
}