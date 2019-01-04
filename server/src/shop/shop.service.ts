import { Injectable } from '@nestjs/common';
import { Shop } from './shop.entity';
import { User } from './../user/user.entity';
import { Repository, getManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ShopService {
    constructor(
        @InjectRepository(Shop)
        private readonly beanRepository: Repository<Shop>,
    ) {}

    async create(bean: Shop, user: User): Promise<Shop> {
        const newBean = new Shop();
        newBean.user = user;
        const beanRepository = getManager().getRepository(Shop);
        beanRepository.merge(newBean, bean);
        return await this.beanRepository.save(newBean);
    }

    async findOne(id): Promise<Shop> {
        return await this.beanRepository.findOne(id, { relations: ['upload'] });
    }

    async save(bean: Shop): Promise<Shop>{
        return await this.beanRepository.save(bean);       
    }

    async get(latitude, longitude, distance): Promise<Shop[]> {
        return await this.beanRepository
            .createQueryBuilder("bean")
            .addSelect(
                "(6371 *"+
                "acos(cos(radians("+ latitude +")) * " +
                "cos(radians(latitude)) * " +
                "cos(radians(longitude) - " +
                "radians("+ longitude +")) +  " +
                "sin(radians("+ latitude +")) *  " +
                "sin(radians(latitude)))  " +
                ")", "bean_distance")
            .having("bean_distance < :distance", { distance: distance })
            .orderBy('bean_distance')
            .take(10)
            .skip(0)
            //.loadRelationIdAndMap('upload','upload')
            .getRawMany();

        return await this.beanRepository.find({
            skip: 0,
            take: 50,
            relations: ['upload'] 
        });
    }
}
