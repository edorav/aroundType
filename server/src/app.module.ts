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
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Upload } from './upload/upload.entity';

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
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: config.SECRET_KEY,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.host,
      port: parseInt(config.port) || 3306,
      username: config.username,
      password: config.password,
      database: config.database,
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
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
