import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { Brand } from './brand.entity';

@Injectable()
export class BrandService {
    constructor(
        @InjectRepository(Brand)
        private readonly beanRepository: Repository<Brand>,
    ) {}
    
    async create(bean: Brand): Promise<Brand> {
        const newBean = new Brand();
        const beanRepository = getManager().getRepository(Brand);
        beanRepository.merge(newBean, bean);
        return await this.beanRepository.save(newBean);
    }
}
