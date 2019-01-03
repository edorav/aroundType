import { Controller, Get, Post, Body, UseGuards, HttpException } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import { JwtResponse } from './interfaces/jwt-response.interface';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UseGuards(AuthGuard())
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard())
    async findOne(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Post()
    async create(@Body() body): Promise<User> {
        const userExist = await this.userService.findOneByEmail(body.email);
        if (userExist) {
            throw new HttpException('user_already_exists', 500);
        }
        return this.userService.create(body);
    }

    @Post('signin')
    async signin(@Body() body): Promise<JwtResponse> {
        const userExist = await this.userService.findOneByEmail(body.email);
        if (!userExist) {
            throw new HttpException('user_not_exists', 500);
        }

        if (!await bcrypt.compare(body.password, userExist.password)) {
            throw new HttpException('wrong_password', 500);
        }

        return this.userService.createToken(userExist);
    }
}
