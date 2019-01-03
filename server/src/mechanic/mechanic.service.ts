import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mechanic } from './mechanic.entity';
import { Repository, getManager } from 'typeorm';
import { User } from './../user/user.entity';

@Injectable()
export class MechanicService {
    constructor(
        @InjectRepository(Mechanic)
        private readonly beanRepository: Repository<Mechanic>,
    ) {}

    async create(bean: Mechanic, user: User): Promise<Mechanic> {
        const newBean = new Mechanic();
        newBean.user = user;
        const beanRepository = getManager().getRepository(Mechanic);
        beanRepository.merge(newBean, bean);
        return await this.beanRepository.save(newBean);
    }
}
