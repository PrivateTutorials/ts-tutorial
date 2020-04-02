// in package.json
//     "class-transformer": "^0.2.3",
//     "reflect-metadata": "^0.1.13"

import 'reflect-metadata';
import {plainToClass} from 'class-transformer';
import {validate as classValidate} from "class-validator";

import {IProductModel, ProductModel} from './product.model';

const product = new ProductModel('book', 21.05);
console.log(product.getInformation());

const products = [{title: 'carpet', price: 33}, {title: 'car', price: -100}];
const a = {title: 'carpet', price: 33} as IProductModel;

const convertedToProductObjects = plainToClass(ProductModel, products); // same as iterate constructors: products.map(pr => new ProductModel(title, price));

for (let product of convertedToProductObjects) {
    classValidate(product).then((errors) => {
        if (errors.length > 0) {
            console.log('THERE WERE VALIDATION ERRORS');
            console.log(errors);
        } else {
            console.log(product.getInformation());
        }
    });
}

