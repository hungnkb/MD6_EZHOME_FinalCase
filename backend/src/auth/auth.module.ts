// @ts-ignore
import { Module } from "@nestjs/common/decorators";
import { DatabaseModule } from "src/database/database.module";
import { AuthController } from "./auh.controller";
import { AuthService } from "./auth.service";
import { databaseProviders } from "src/database/database.providers";
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";
import { UserProvider } from "src/user/user.provider";
// @ts-ignore
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from "./constants";
// import { TypeOrmModule } from "@nestjs/typeorm";
import { UserSchema } from "src/user/user.entity";

@Module({
    imports: [
        DatabaseModule,
        UserModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '604800s' },
        })],
    controllers: [AuthController],
    providers: [
        AuthService,
        UserService,
        ...databaseProviders,
        ...UserProvider,
    ]
})

export class AuthModule { }
