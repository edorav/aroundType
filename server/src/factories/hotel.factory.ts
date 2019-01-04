import * as faker from 'faker/locale/it';
import { Hotel } from './../hotel/hotel.entity';

export class HotelFactory{
    static newBean(){
        let bean = new Hotel();
        bean.name = faker.company.companyName();
        bean.latitude = parseFloat(faker.address.latitude());
        bean.longitude = parseFloat(faker.address.longitude());
        bean.city = faker.address.city();
        bean.address = faker.address.streetAddress();
        bean.country = faker.address.country();
        return bean;
    }
}