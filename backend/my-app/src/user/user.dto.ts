import { IsNotEmpty, IsAlphanumeric, IsStrongPassword, Length, IsEmail } from "class-validator";
import { UserRole } from "./user.entity";

export class CreateUserDto {
    @IsNotEmpty()
    @IsAlphanumeric()
    @Length(6, 20)
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsStrongPassword()
    @Length(6, 20)
    password: string;

    phone: string;
    fullName: string;
    address: string;
    googleEmail: string;
    role: UserRole;
}

export class UpdateUserDto {
    username: string;
    email: string;
    phone: string;
    fullName: string;
    address: string;
    googleEmail: string;
    role: UserRole;
}

export class changePasswordDto {
    @IsNotEmpty()
    @IsAlphanumeric()
    @Length(6, 20)
    username: string;

    @IsNotEmpty()
    @IsStrongPassword()
    @Length(6, 20)
    currentPassword: string;

    @IsNotEmpty()
    @IsStrongPassword()
    @Length(6, 20)
    newPassword: string;
}
