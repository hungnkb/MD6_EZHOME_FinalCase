import { Injectable } from '@nestjs/common';
import { UserSchema } from 'src/user/user.entity';
import { DataSource } from 'typeorm';


export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '123456',
                database: 'md6_final_case',
                entities: [
                    UserSchema,
                ],
                synchronize: true,
            });
            
            return dataSource.initialize();
        },
    },
];