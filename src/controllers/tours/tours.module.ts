import { Module } from '@nestjs/common';
import { ToursController } from './tours/tours.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport/dist';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../static/private/constants';
import { ToursService } from '../../services/tours/tours.service';
import { JwtStrategyService } from '../../services/Authentication/jwt-strategy/jwt-strategy.service';
import { Tour, TourSchema } from 'src/shemas/tours';

@Module({
  controllers: [ToursController],
  imports: [
    MongooseModule.forFeature(
      [{name: Tour.name, schema: TourSchema}]
    ),
    PassportModule,
    JwtModule.register(
      {secret: jwtConstants.secret}
    )
  ],
  providers: [
    ToursService,
    JwtStrategyService
  ]

})
export class ToursModule {}
