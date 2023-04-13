import { Inject, HttpException, HttpStatus } from "@nestjs/common";
import { Repository } from "typeorm";
import { UserSchema } from "./user.entity";
import { CreateUserDto, CreateWithGoogleUserDto, UpdateUserDto } from "./user.dto";
import * as bcrypt from 'bcrypt';
import * as process from "process";
const mailer = require('../config/mailer')
//Thao tác cụ thể dữ liệu db
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
            let newUser = await this.userRepository.save({
                password: hashPassword,
                email,
                phone
            });
            if (newUser){
                bcrypt.hash(newUser.email, parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashedEmail) => {
                    mailer.sendMail(newUser.email, "Xin Chào,Hãy xác thực tài khoản EZHome 0.1", `<a href="http://localhost:3002/api/v1/users/active?email=${newUser.email}&token=${hashedEmail}"> Verify </a>`)
                })
            }
            return newUser
        } catch (err) {
            throw new HttpException(err.code, HttpStatus.BAD_REQUEST)
        }
    }

    async createWithGoogle(body): Promise<any> {
        let email = body.email       
        let newUser = await this.userRepository
            .createQueryBuilder()
            .insert()
            .into('users')
            .values({ email })
            .execute()
        
        if (newUser) {
            return newUser
        } else {
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST)
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
    }

    async active(query): Promise<any> {
        let user = await this.findByObj(query.email)
        if (user.active) {
            throw new HttpException('Already active', HttpStatus.OK)
        }
        let activeUser = await this.userRepository
            .createQueryBuilder()
            .update('users')
            .set({ active: true })
            .where( { email: query.email })
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
                    .where({ idUser })
                    .execute()
                throw new HttpException('Active host success', HttpStatus.OK)
            } else {
                throw new HttpException('Active host already', HttpStatus.OK)
            }
        }
    }

}