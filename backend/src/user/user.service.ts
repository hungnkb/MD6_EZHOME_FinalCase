import { Inject, HttpException, HttpStatus } from "@nestjs/common";
import { Repository } from "typeorm";
import { UserSchema } from "./user.entity";
import { CreateUserDto, UpdateUserDto } from "./user.dto";
import * as bcrypt from 'bcrypt';

export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<UserSchema>
    ) { }

    async findAll(): Promise<UserSchema[] | undefined> {
        return this.userRepository.find()
    }

    async findByObj(obj: any): Promise<UserSchema | undefined> {
        let user = await this.userRepository.findOne({
            where: [
                { idUser: obj },
                { email: obj },
                { username: obj }
            ]
        })

        if (user) {
            return user
        }

        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST)
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

    async update(body: UpdateUserDto): Promise<any> {
        let { username, phone, fullName, address } = body;
        let user = await this.userRepository.findOne({ where: { username } })
        if (!user) {
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST)
        }

        let newUser = await this.userRepository
            .createQueryBuilder()
            .update(UserSchema)
            .set({ phone, fullName, address })
            .where({ idUser: user.idUser })
            .execute()
            
        return newUser
        // return this.userRepository.save({
        //     id: user.id,
        //     phone, fullName, address
        // })
    }

    async active({idUser}): Promise<any> {
        // let user = await this.findByObj(idUser)
        // console.log(user);
        
        
    }

}