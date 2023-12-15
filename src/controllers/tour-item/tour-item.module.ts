import { Module } from '@nestjs/common';
import { TourItemController } from './tour-item/tour-item.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tour, TourSchema } from 'src/shemas/tours';
import { ToursService } from '../../services/tours/tours.service';


@Module({
  controllers: [TourItemController],
  imports: [
    MongooseModule.forFeature(
      [{name: Tour.name, schema: TourSchema}]
    )
  ],
  providers: [
    ToursService
  ]
})
export class TourItemModule {}
