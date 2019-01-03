import { Controller, UseInterceptors, FileInterceptor, UploadedFile, Post, Res, Param, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ShopService } from './shop.service';
import { UploadService } from './../upload/upload.service';
import { AuthGuard } from '@nestjs/passport';
import { Shop } from './shop.entity';

@Controller('shop')
export class ShopController {
    constructor(
        private readonly _shopService: ShopService,
        private readonly _userService: UserService,
        private readonly _uploadService: UploadService,
    ) {}
    
    @Post('upload')
    @UseGuards(AuthGuard())
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file, @Req() req) {
        const bean = await this._shopService.findOne(req.body.id);
        const user = await this._userService.findOneByEmail(req.user);
        const upload = await this._uploadService.create(file, user);

        bean.upload.push(upload);
        
        return this._shopService.save(bean);
    }

    @Get()
    async get(@Req() req): Promise<Shop[]> {
/*        SELECT * FROM tweets WHERE location <@ circle '((-34.603722, -58.381592), 2000)'
*/
        return this._shopService.get();
    }

    @Get(':beanId')
    async findOne(@Param('beanId') beanId, @Req() req): Promise<Shop> {
        return this._shopService.findOne(beanId);
    }

    @Get('track/:imgId')
    test(@Param('imgId') imgId, @Res() res) {
        const imgPath = '/uploads/c4d1038eec2a3adf2ca488bfb82ce25fb.png';
        return res.sendFile(imgPath, { root: 'src/public' });
    }
}
