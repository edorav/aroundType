import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { Upload } from './upload.entity';
import { User } from './../user/user.entity';

@Injectable()
export class UploadService {
    constructor(
        @InjectRepository(Upload)
        private readonly beanRepository: Repository<Upload>,
    ) {}
    
    async create(bean: Upload, user: User): Promise<Upload> {
        const newBean = new Upload();
        newBean.user = user;
        const beanRepository = getManager().getRepository(Upload);
        beanRepository.merge(newBean, bean);
        return await this.beanRepository.save(newBean);
    }
}
