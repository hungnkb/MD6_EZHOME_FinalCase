import { Body, Controller, Get, Put, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UserSchema } from './user.entity';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    findAll(@Query() query): Promise<any> {
        if (query.obj) {
            return this.userService.findByObj(query.obj)
        }
        return this.userService.findAll()
    }

    @Post()
    create(@Body() body: CreateUserDto): Promise<any> {
        return this.userService.create(body)
    }

    @Put()
    update(@Body() body: UpdateUserDto): Promise<any> {
        return this.userService.update(body)
    }

}