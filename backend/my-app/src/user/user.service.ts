import { Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { UserSchema } from "./user.entity";
import { IUser } from "./user.interface";

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

    async create(body): Promise<UserSchema | undefined> {
        console.log(body);
        
        return this.userRepository.insert(body);

    }
}