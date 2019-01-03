import * as faker from 'faker';
import { Restaurant } from './../restaurant/restaurant.entity';

export class RestaurantFactory{
    static newBean(){
        let bean = new Restaurant();
        bean.name = faker.company.companyName();
        bean.latitude = parseFloat(faker.address.latitude());
        bean.longitude = parseFloat(faker.address.longitude());
        bean.city = faker.address.city();
        bean.address = faker.address.streetAddress();
        bean.country = faker.address.country();
        return bean;
    }
}