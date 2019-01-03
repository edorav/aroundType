import {
    Entity,
    Column,
} from 'typeorm';
import { Bean } from './../bean/bean.model';

@Entity()
export class Mechanic extends Bean {

    @Column({
        length: 100,
        nullable: false,
    })
    name: string;
}
