import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Unique,
    Check,
    VersionColumn,
    BeforeInsert,
    BeforeUpdate,
} from 'typeorm';
import {IsEmail} from 'class-validator';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['email'])
@Check(`"age" > 18`)
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({nullable: false})
    @IsEmail()
    email: string;

    @Column({nullable: false})
    password: string;

    @Column()
    age: number;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: number;

    @VersionColumn()
    version: number;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPasswordBeforeInsert() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }
}
