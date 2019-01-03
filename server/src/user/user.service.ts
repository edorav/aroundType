import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { User } from './user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { JwtResponse } from './interfaces/jwt-response.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOneByEmail(foundEmail: string): Promise<User> {
        return await this.userRepository.findOne({
            email: foundEmail,
        });
    }

    async create(user: User): Promise<User> {
        const newUser = new User();
        const userRepository = getManager().getRepository(User);
        userRepository.merge(newUser, user);
        return await this.userRepository.save(newUser);
    }

    async createToken(userLogged: User): Promise<JwtResponse> {

        const payload: JwtPayload = {
            id: userLogged.id,
            email : userLogged.email
        };
        return {
            jwt: this.jwtService.sign(payload),
        };
    }

    async validateUser(payload: JwtPayload): Promise<string> {
        return await payload.email;
    }
}
