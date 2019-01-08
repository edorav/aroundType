import { Controller, UseInterceptors, FileInterceptor, UploadedFile, Post, Res, Param, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './../user/user.service';
import { ShopService } from './shop.service';
import { UploadService } from './../upload/upload.service';
import { AuthGuard } from '@nestjs/passport';
import { Shop } from './shop.entity';
import { MailerProvider } from '@nest-modules/mailer';

@Controller('shop')
export class ShopController {
    constructor(
        private readonly shopService: ShopService,
        private readonly userService: UserService,
        private readonly uploadService: UploadService,
        private readonly mailerProvider: MailerProvider,
    ) { }

    @Post('upload')
    @UseGuards(AuthGuard())
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file, @Req() req) {
        const bean = await this.shopService.findOne(req.body.id);
        const user = await this.userService.findOneByEmail(req.user);

        if (req.body.thumbnail) {
            bean.thumbnail = file.filename;
        } else {
            const upload = await this.uploadService.create(file, user);
            bean.upload.push(upload);
        }
        return this.shopService.save(bean);
    }

    @Get(':lat/:lng/:distance')
    async get(@Param('lat') lat, @Param('lng') lng, @Param('distance') distance): Promise<Shop[]> {
        /*        SELECT * FROM tweets WHERE location <@ circle '((-34.603722, -58.381592), 2000)'
        */
        return this.shopService.get(lat, lng, distance);
    }

    @Get(':beanId')
    async findOne(@Param('beanId') beanId, @Req() req): Promise<Shop> {
        return this.shopService.findOne(beanId);
    }

    @Get('image/:thumbnail')
    getThumbnail(@Param('thumbnail') beanThumbnail, @Res() res) {
        const imgPath = '/uploads/' + beanThumbnail;
        return res.sendFile(imgPath, { root: 'src/public' });
    }

    @Get('testmail/test')
    sendMail() {
        this.mailerProvider.sendMail({
            to: 'test@nestjs.com',
            from: 'noreply@nestjs.com',
            subject: 'Testing Nest Mailermodule with template ✔',
            template: 'welcome', // The `.pug` or `.hbs` extension is appended automatically.
            context: {  // Data to be sent to template engine.
              username: 'john doe',
              code: 'cf1a3f828287',
            },
        });
    }
}
