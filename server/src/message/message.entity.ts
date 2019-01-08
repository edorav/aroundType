import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    VersionColumn,
    UpdateDateColumn,
    CreateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity()
export class Message {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        length: 250,
        nullable: false,
    })
    text: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: number;

    @VersionColumn()
    version: number;

    @ManyToOne(type => User, user => user.id, { nullable : false})
    @JoinColumn()
    sender: User;

    @ManyToOne(type => User, user => user.id, { nullable : false})
    @JoinColumn()
    receiver: User;
}
