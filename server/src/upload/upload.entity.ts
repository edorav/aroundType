import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    VersionColumn,
    JoinColumn,
    ManyToOne,
    ManyToMany,
} from 'typeorm';
import { User } from './../user/user.entity';

@Entity()
export class Upload {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: number;

    @VersionColumn()
    version: number;

    @ManyToOne(type => User, user => user.id, { nullable : false})
    @JoinColumn()
    user: User;

    @Column()
    image: string;

}
