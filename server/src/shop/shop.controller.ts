import { Controller, UseInterceptors, FileInterceptor, UploadedFile, Post, Res, Param, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './../user/user.service';
import { ShopService } from './shop.service';
import { UploadService } from './../upload/upload.service';
import { AuthGuard } from '@nestjs/passport';
import { Shop } from './shop.entity';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
const config = dotenv.parse(fs.readFileSync('.env'));

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

        if(req.body.thumbnail){
            bean.thumbnail = file.filename;
        } else {
            const upload = await this._uploadService.create(file, user);
            bean.upload.push(upload);
        }
        return this._shopService.save(bean);
    }

    @Get(':lat/:lng/:distance')
    async get(@Param('lat') lat, @Param('lng') lng, @Param('distance') distance): Promise<Shop[]> {
/*        SELECT * FROM tweets WHERE location <@ circle '((-34.603722, -58.381592), 2000)'
*/
        return this._shopService.get(lat, lng, distance);
    }

    @Get(':beanId')
    async findOne(@Param('beanId') beanId, @Req() req): Promise<Shop> {
        return this._shopService.findOne(beanId);
    }

    @Get('image/:thumbnail')
    getThumbnail(@Param('thumbnail') beanThumbnail, @Res() res) {
        const imgPath = '/uploads/' + beanThumbnail;
        return res.sendFile(imgPath, { root: config.PRODUCTION === 'true' ? 'public' : 'src/public' });
    }
}
