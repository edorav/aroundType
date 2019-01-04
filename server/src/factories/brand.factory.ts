import * as faker from 'faker/locale/it';
import { Brand } from './../brand/brand.entity';

export class BrandFactory{
    static newBean(){
        let bean = new Brand();
        bean.brand = faker.commerce.productName();
        return bean;
    }
}