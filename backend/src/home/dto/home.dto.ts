import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateHomeDto {
    @IsNotEmpty()
    title: string;

    @IsNumber()
    price: number;

    @IsString()
    address: string;

    @IsNumber()
    bathrooms: number;

    @IsNumber()
    bedrooms: number;

    description: string;
    idUser: string;
    idCategory: string;
}

export class UpdateHomeDto {
    tittle: string;
    price: number;
    bathrooms: number;
    bedrooms: number;
    description: string;
    idUser: string;
    idCategory: string;
}