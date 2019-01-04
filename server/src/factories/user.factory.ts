import { User } from './../user/user.entity';
import * as faker from 'faker/locale/it';

export class UserFactory {
    static newBean() {
        const user = new User();
        user.firstName = faker.name.firstName();
        user.lastName = faker.name.lastName();
        user.email = faker.internet.email();
        user.password = 'secret';
        user.age = 30;
        user.phone = faker.phone.phoneNumber();
        return user;
    }
}