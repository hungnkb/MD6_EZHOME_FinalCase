import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IUser } from "./user.interface";

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}

@Entity({ name: 'users' })
export class UserSchema {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    username: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: true, unique: true })
    phone: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: true })
    fullName: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true, unique: true })
    googleEmail: string;

    @Column({nullable: true})
    image: string;

    @Column(
        {
            type: 'enum',
            enum: UserRole,
            default: UserRole.USER,
        }
    )
    role: UserRole;
}