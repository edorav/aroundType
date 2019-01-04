import * as faker from 'faker/locale/it';
import { Mechanic } from './../mechanic/mechanic.entity';

export class MechanicFactory{
    static newBean(){
        let bean = new Mechanic();
        bean.name = faker.company.companyName();
        bean.latitude = parseFloat(faker.address.latitude());
        bean.longitude = parseFloat(faker.address.longitude());
        bean.city = faker.address.city();
        bean.address = faker.address.streetAddress();
        bean.country = faker.address.country();
        return bean;
    }
}