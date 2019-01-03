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

    async get(): Promise<Shop[]> {
  /*      SELECT 
id, 
(
   3959 *
   acos(cos(radians(37)) * 
   cos(radians(lat)) * 
   cos(radians(lng) - 
   radians(-122)) + 
   sin(radians(37)) * 
   sin(radians(lat )))
) AS distance 
FROM markers 
HAVING distance < 25 
ORDER BY distance LIMIT 0, 20;
*/
        return await this.beanRepository
            .createQueryBuilder("bean")
            .addSelect(
                "3959 *"+
                "acos(cos(radians(37)) * " + 
                "1"+ // remove
                ")", "bean_distance")
            .having("bean_distance < 2222225")
            .getRawMany();

        return await this.beanRepository.find({
            skip: 0,
            take: 50,
            relations: ['upload'] 
        });
    }
}
