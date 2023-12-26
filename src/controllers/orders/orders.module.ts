import { Module } from '@nestjs/common';
import { OrdersController } from './orders/orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/shemas/order';
import { User, UserSchema } from 'src/shemas/user';
import { OrdersService } from '../../services/orders/orders.service';
import { Tour, TourSchema } from 'src/shemas/tours';
import { InfoUser} from '../../shemas/infouser';
import { InfoUserSchema } from '../../shemas/infouser';



@Module({
  imports: [
    MongooseModule.forFeature([{name: Order.name, schema: OrderSchema}]),
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    MongooseModule.forFeature([{name: Tour.name, schema: TourSchema}]),
    MongooseModule.forFeature([{name: InfoUser.name, schema: InfoUserSchema}]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
