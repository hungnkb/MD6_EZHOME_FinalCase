import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateHomeDto } from './dto/home.dto';
import { UserSchema } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { HomeSchema } from './entities/home.entity';

@Injectable()
export class HomeService {
    constructor(
        @Inject('HOME_REPOSITORY')
        private homeRepository: Repository<HomeSchema>,
        private userService: UserService
    ) { }

    async create(body: CreateHomeDto): Promise<Object> {
        let { title, price, address, bathrooms, bedrooms, description, email, idCategory } = body
        let user = await this.userService.findByObj(email);
        if (!user) {
            throw new HttpException('Unauthorized', HttpStatus.BAD_REQUEST)
        }
        let newHome = await this.homeRepository
            .createQueryBuilder()
            .insert()
            .into(HomeSchema)
            .values({ title, price, address, bathrooms, bedrooms, description, idCategory, idUser: user.idUser })
            .execute()

        return newHome
    }

    async findAll(): Promise<HomeSchema[]> {
        return this.homeRepository.find()
    }

    async findByObj(obj): Promise<HomeSchema[] | undefined> {
        if (obj.idUser) {
            return this.homeRepository
                .createQueryBuilder()
                .select()
                .where('idUser = :id', { id: obj.idUser })
                .getMany()
        } else if (obj.idHome) {
            return this.homeRepository
                .createQueryBuilder()
                .select()
                .where('idHome = :id', { id: obj.idHome })
                .getMany()
        } else {
            return this.homeRepository.find()
        }
    }
}

