import { Controller, Post } from '@nestjs/common';
import { UserService } from './../user/user.service';
import { UserFactory } from './../factories/user.factory';
import { ShopService } from './../shop/shop.service';
import { ShopFactory } from './../factories/shop.factory';
import { HotelService } from './../hotel/hotel.service';
import { RestaurantService } from './../restaurant/restaurant.service';
import { MechanicService } from './../mechanic/mechanic.service';
import { HotelFactory } from './../factories/hotel.factory';
import { RestaurantFactory } from './../factories/restaurant.factory';
import { MechanicFactory } from './../factories/mechanic.factory';
import { BrandService } from './../brand/brand.service';
import { BrandFactory } from './../factories/brand.factory';

@Controller('private/seed')
export class SeedController {
    constructor(
        private readonly _userService: UserService,
        private readonly _shopService: ShopService,
        private readonly _hotelService: HotelService,
        private readonly _restaurantService: RestaurantService,
        private readonly _mechanicService: MechanicService,
        private readonly _brandService: BrandService,
    ) {}

    @Post()
    //@UseGuards(AuthGuard())
    async create() {
        let status = 'ok';        
        const records = 500;

        const users = [];

        for(let i=0; i< records ; i++){    
            try{
                users.push(await this._userService.create(UserFactory.newBean()));
            } catch( exc ){
                status = 'fail';
            }
        }

        for(let i=0; i< records ; i++){            
            try{
                await this._shopService.create(ShopFactory.newBean(), users[Math.floor(Math.random() * records)]);
                await this._hotelService.create(HotelFactory.newBean(), users[Math.floor(Math.random() * records)]);
                await this._restaurantService.create(RestaurantFactory.newBean(), users[Math.floor(Math.random() * records)]);
                await this._mechanicService.create(MechanicFactory.newBean(), users[Math.floor(Math.random() * records)]);
                await this._brandService.create(BrandFactory.newBean());
            } catch( exc ){
                status = 'fail';
            }
        }
        return [{
            'status' : status
        }];
        
    }
}
