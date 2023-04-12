import { Body, Controller, Get, Put, Post, Query, Param } from '@nestjs/common';
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

    @Get('/active/:idUser')
    active(@Param() param: any): Promise<any> {
        return this.userService.active(param)
    }

    @Get('/active-host/:idUser')
    activeHost(@Param() param: any): Promise<any> {
        return this.userService.activeHost(param)
    }

}