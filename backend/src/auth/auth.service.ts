import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { changePasswordDto } from "src/user/user.dto";
import { Repository } from "typeorm";
import { UserSchema } from "src/user/user.entity";

export type User = any;

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<UserSchema>,
    ) { }

    // async register(body): Promise<Object> {
    //     let { password, email, phone } = body;
    //     let userByPhone = await this.userService.findByObj(phone)
    //     let userByEmail = await this.userService.findByObj(email)

    //     if (userByEmail) {
    //         if (userByPhone) {
    //             throw new HttpException('Email and Phone already exists', HttpStatus.BAD_REQUEST)
    //         } else {
    //             throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST)
    //         }
    //     } else {
    //         if (userByPhone) {
    //             throw new HttpException('Email and Phone already exists', HttpStatus.BAD_REQUEST)
    //         }
    //     }

    //     return this.userRepository.save({email, password, phone})
    // }

    async login(body): Promise<Object> {
        let { email, password } = body

        let user = await this.userService.findByObj(email)
        if (!user) throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
        let isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const payload = { email: user.email, role: user.role, sub: user.idUser }
            return {
                accessToken: await this.assignToken(payload),
            };
        } else {
            throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST)
        }
    }

    async changePassword(body: changePasswordDto): Promise<Object> {
        let { email, currentPassword, newPassword } = body;
        let user = await this.userService.findByObj(email)
        const isMatch = await this.verifyPassword(currentPassword, user.password)
        if (isMatch) {
            const saltOrRounds = 10
            const newHashPassword = await bcrypt.hash(newPassword, saltOrRounds)
            let { password, ...rest } = user;
            let newUser = { ...rest, password: newHashPassword }
            return this.userRepository.save({
                ...user,
                ...newUser
            })
        } else {
            throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST)
        }
    }

    async verifyToken(accessToken: string): Promise<Object> {
        try {
            const payload = await this.jwtService.verifyAsync(
                accessToken,
                {
                    secret: jwtConstants.secret
                }
            )
            return payload
        } catch {
            throw new UnauthorizedException
        }
    }

    async assignToken(payload: Object): Promise<string> {
        return await this.jwtService.signAsync(payload)
    }

    async verifyPassword(currentPassword: string, hashPassword: string): Promise<boolean | any> {
        return await bcrypt.compare(currentPassword, hashPassword);
    }
}