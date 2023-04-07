import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IUser } from "./user.interface";

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}

@Entity()
export class UserSchema {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    username: string;

    @Column({nullable: false})
    email: string;

    @Column()
    phone: string;

    @Column({nullable: false})
    password!: string;

    @Column()
    googleEmail: string;

    @Column(
        {
            type: 'enum',
            enum: UserRole,
            default: UserRole.USER,
        }
    )
    role!: UserRole;
}