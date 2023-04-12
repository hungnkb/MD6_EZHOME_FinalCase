import { Post, Body, Controller, Options, Put } from '@nestjs/common';
import { AuthService } from './auth.service'
import { changePasswordDto } from 'src/user/user.dto';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post()
    login(@Body() body: any): Promise<Object> {
        return this.authService.login(body)
    }

    @Options()
    verifyToken(@Body() body: any): String {
        return "fdf"
        // return this.authService.verifyToken(body.accessToken)
    }

    @Put()
    changePassword(@Body() body: changePasswordDto): Promise<Object> {
        return this.authService.changePassword(body)
    }
}