import { User } from "./../user/user.entity";
import * as faker from 'faker';

export class UserFactory{
    static newBean(){
        let user = new User();
        user.firstName = faker.name.firstName();
        user.lastName = faker.name.lastName();
        user.email = faker.internet.email();
        user.password = 'secret';
        return user;
    }
}