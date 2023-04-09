import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { IUser } from "src/user/user.interface";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { jwtConstants } from "./constants";

export type User = any;

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async login(body): Promise<any> {
        let { username, password } = body

        let user = await this.userService.findByObj(username)
        if (!user) throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
        let isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const payload = { username: user.username, email: user.email, role: user.role, sub: user.id }
            return {
                accessToken: await this.jwtService.signAsync(payload),
            };
        } else {
            throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST)
        }
    }

    async verifyToken(body): Promise<any> {
        try {
            const payload = await this.jwtService.verifyAsync(
                body.accessToken,
                {
                    secret: jwtConstants.secret
                }
            )
            return payload
        } catch {
            throw new UnauthorizedException
        }
    }
}