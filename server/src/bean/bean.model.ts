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
    JoinTable,
} from 'typeorm';
import { User } from './../user/user.entity';
import { Upload } from 'src/upload/upload.entity';

@Entity()
export class Bean {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ type: 'float', precision: 10, scale: 8 })
    latitude: number;

    @Column({ type: 'float', precision: 11, scale: 8 })
    longitude: number;

    @Column()
    city: string;

    @Column()
    country: string;

    @Column()
    address: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: number;

    @VersionColumn()
    version: number;

    @ManyToOne(type => User, user => user.id, { nullable : false})
    @JoinColumn()
    user: User;

    @ManyToMany(type => Upload, upload => upload.id)
    @JoinTable()
    upload: Upload[];
}
