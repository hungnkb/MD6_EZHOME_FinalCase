import { Inject, HttpException, HttpStatus } from "@nestjs/common";
import { Repository } from "typeorm";
import { UserSchema } from "./user.entity";
import { CreateUserDto, UpdateUserDto } from "./user.dto";
import * as bcrypt from 'bcrypt';

export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<UserSchema>,
    ) { }

    async findAll(): Promise<UserSchema[] | undefined> {
        return this.userRepository.find()
    }

    async findByObj(obj: any): Promise<UserSchema | undefined> {
        let user = await this.userRepository.findOne({
            where: [
                { idUser: obj },
                { email: obj },
                { phone: obj }
            ]
        })

        if (user) {
            return user
        }

        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST)
    }

    async create(body: CreateUserDto): Promise<UserSchema> {
        try {
            let { password, email, phone } = body
            const saltOrRounds = 10
            const hashPassword = await bcrypt.hash(password, saltOrRounds)
            console.log(hashPassword)
            let newUser = await this.userRepository.save({
                password: hashPassword,
                email,
                phone
            });
            console.log(newUser)
            return newUser
        } catch (err) {
            throw new HttpException(err.code, HttpStatus.BAD_REQUEST)
        }
    }

    async update(body: UpdateUserDto): Promise<any> {
        let { email, phone, fullName, address } = body;
        let user = await this.userRepository.findOne({ where: { email } })
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

    async active({ idUser }): Promise<any> {
        let user = await this.findByObj(idUser)
        if (user.active) {
            throw new HttpException('Already active', HttpStatus.OK)
        }
        let activeUser = await this.userRepository
            .createQueryBuilder()
            .update('users')
            .set({ active: true })
            .where('idUser = :id', { id: idUser })
            .execute()

        throw new HttpException('Active success', HttpStatus.OK)
    }

    async activeHost({ idUser }): Promise<any> {
        let user = await this.findByObj(idUser)
        if (user.idUser) {
            if (user.role == 'user') {
                let activeUserHost = await this.userRepository
                    .createQueryBuilder()
                    .update('users')
                    .set({ role: 'host' })
                    .where({idUser})
                    .execute()
                throw new HttpException('Active host success', HttpStatus.OK)
            } else {
                throw new HttpException('Active host already', HttpStatus.OK)
            }
        }
    }

}