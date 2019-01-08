import { Module, MulterModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { JwtStrategy } from './user/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { User } from './user/user.entity';
import { HotelController } from './hotel/hotel.controller';
import { HotelService } from './hotel/hotel.service';
import { Hotel } from './hotel/hotel.entity';
import { MechanicService } from './mechanic/mechanic.service';
import { MechanicController } from './mechanic/mechanic.controller';
import { ShopController } from './shop/shop.controller';
import { ShopService } from './shop/shop.service';
import { Shop } from './shop/shop.entity';
import { Mechanic } from './mechanic/mechanic.entity';
import { RestaurantController } from './restaurant/restaurant.controller';
import { RestaurantService } from './restaurant/restaurant.service';
import { Restaurant } from './restaurant/restaurant.entity';
import { SeedController } from './seed/seed.controller';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadController } from './upload/upload.controller';
import { UploadService } from './upload/upload.service';
import { Upload } from './upload/upload.entity';
import { BrandService } from './brand/brand.service';
import { Brand } from './brand/brand.entity';
import { MailerModule } from '@nest-modules/mailer';
import { StatusMonitorModule } from 'nest-status-monitor';
import { statusMonitorConfig } from './statusMonitorConfig';
import { MessageController } from './message/message.controller';
import { MessageService } from './message/message.service';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Message } from './message/message.entity';

const config = dotenv.parse(fs.readFileSync('.env'));
@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Hotel,
      Shop,
      Mechanic,
      Restaurant,
      Upload,
      Brand,
      Message,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: config.SECRET_KEY,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    MailerModule.forRoot({
      transport: `smtps://${config.SMTP_USER}:${config.SMTP_PASS}@${config.SMTP_DOMAIN}`,
      defaults: {
        from: config.EMAIL_FROM,
      },
      templateDir: './src/common/email-templates',
      templateOptions: {
        engine: 'handlebars',
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.DB_HOST,
      port: parseInt(config.DB_PORT, 1),
      username: config.DB_USERNAME,
      password: config.DB_PASSWORD,
      database: config.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: __dirname + '/public/uploads'
        , filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
    StatusMonitorModule.setUp(statusMonitorConfig),
  ],
  controllers: [
    AppController,
    UserController,
    HotelController,
    MechanicController,
    ShopController,
    RestaurantController,
    SeedController,
    UploadController,
    MessageController,
  ],
  providers: [
    AppService,
    UserService,
    JwtStrategy,
    HotelService,
    MechanicService,
    ShopService,
    RestaurantService,
    UploadService,
    BrandService,
    MessageService,
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
