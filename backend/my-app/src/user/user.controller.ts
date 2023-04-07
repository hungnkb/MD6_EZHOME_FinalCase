import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    findAll(): Promise<any> {
        return this.userService.findAll();
    }

    @Get(':id')
    findById(@Param() params): Promise<any> {
        return this.userService.findById(params.id);
    }

    @Post()
    create(@Body() body: CreateUserDto): Promise<any> {
        return this.userService.create(body);
    }
    
}