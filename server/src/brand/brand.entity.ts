import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm';

@Entity()
export class Brand {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: number;

    @VersionColumn()
    version: number;

    @Column()
    brand: string;

}
