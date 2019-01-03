import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './hotel.entity';
import { getManager, Repository } from 'typeorm';
import { User } from './../user/user.entity';

@Injectable()
export class HotelService {
    constructor(
        @InjectRepository(Hotel)
        private readonly beanRepository: Repository<Hotel>,
    ) {}

    async create(bean: Hotel, user: User): Promise<Hotel> {
        const newBean = new Hotel();
        newBean.user = user;
        const beanRepository = getManager().getRepository(Hotel);
        beanRepository.merge(newBean, bean);
        return await this.beanRepository.save(newBean);
    }

    async get(): Promise<Hotel[]> {
        return await this.beanRepository.find();
    }

    async findOne(id): Promise<Hotel> {
        return await this.beanRepository.findOne(id);
    }
}
