import { Controller, Get, Req, Post, UseGuards } from '@nestjs/common';
import { UserService } from './../user/user.service';
import { Hotel } from './hotel.entity';
import { HotelService } from './hotel.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('hotel')
export class HotelController {
    constructor(
        private readonly _hotelService: HotelService,
        private readonly _userService: UserService,
    ) {}

    
    @Get()
    async get(@Req() req): Promise<Hotel[]> {
        return this._hotelService.get();
    }

    @Post()
    @UseGuards(AuthGuard())
    async create(@Req() req): Promise<Hotel> {
        const user = await this._userService.findOneByEmail(req.user);
        return this._hotelService.create(req.body, user);
    }
}
