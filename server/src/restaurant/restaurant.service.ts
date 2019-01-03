import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { User } from './../user/user.entity';

@Injectable()
export class RestaurantService {
    constructor(
        @InjectRepository(Restaurant)
        private readonly beanRepository: Repository<Restaurant>,
    ) {}

    async create(bean: Restaurant, user: User): Promise<Restaurant> {
        const newBean = new Restaurant();
        newBean.user = user;
        const beanRepository = getManager().getRepository(Restaurant);
        beanRepository.merge(newBean, bean);
        return await this.beanRepository.save(newBean);
    }
}
