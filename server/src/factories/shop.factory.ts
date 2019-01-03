import * as faker from 'faker';
import { Shop } from "./../shop/shop.entity";

export class ShopFactory{
    static newBean(){
        let bean = new Shop();
        bean.name = faker.company.companyName();
        bean.latitude = parseFloat(faker.address.latitude());
        bean.longitude = parseFloat(faker.address.longitude());
        bean.city = faker.address.city();
        bean.address = faker.address.streetAddress();
        bean.country = faker.address.country();
        return bean;
    }
}