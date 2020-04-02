import {IsNotEmpty, IsNumber, IsPositive, validate} from 'class-validator';

export interface IProductModel{
    title: string;
    price: number;
}

export class ProductModel {
    @IsNotEmpty()
    title: string;
    @IsNumber()
    @IsPositive()
    price: number;

    constructor(t:string, p:number) {
        this.title = t;
        this.price = p;
    }

    getInformation():[string, string]{
        return [this.title, `$${this.price}`]
    }
}
