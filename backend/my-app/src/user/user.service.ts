import { Inject, HttpException, HttpStatus } from "@nestjs/common";
import { Repository } from "typeorm";
import { UserSchema } from "./user.entity";
import { IUser } from "./user.interface";
import { CreateUserDto } from "./user.dto";
import * as bcrypt from 'bcrypt';

export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<UserSchema>
    ) { }

    async findAll(): Promise<UserSchema[] | undefined> {
        return this.userRepository.find()
    }

    async findById(id: number): Promise<UserSchema | undefined> {
        return this.userRepository.findOneBy({ id })
    }

    async create(body: CreateUserDto): Promise<UserSchema> {
        try {
            let { username, password, email } = body

            const saltOrRounds = 10
            const hashPassword = await bcrypt.hash(password, saltOrRounds)

            let newUser = await this.userRepository.save({
                username,
                password: hashPassword,
                email
            });

            return newUser

        } catch (err) {
            throw new HttpException(err.code, HttpStatus.BAD_REQUEST)
        }
    }
}