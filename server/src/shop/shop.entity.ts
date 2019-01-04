import {
    Entity,
    Column,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Bean } from './../bean/bean.model';
import { Brand } from './../brand/brand.entity';

@Entity()
export class Shop extends Bean {

    @Column({
        length: 100,
        nullable: false,
    })
    name: string;

    @ManyToMany(type => Brand, brand => brand.id)
    @JoinTable()
    brand: Brand[];
}
