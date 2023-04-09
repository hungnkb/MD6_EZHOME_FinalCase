import { Post, Body, Controller, Options } from '@nestjs/common';
import { AuthService } from './auth.service'

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post()
    login(@Body() body: any): Promise<any> {
        return this.authService.login(body)
    }

    @Options()
    verifyToken(@Body() body: any): Promise<any> {
        return this.authService.verifyToken(body)
    }
}