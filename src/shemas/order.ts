import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IOrder } from 'src/interfaces/order';
import { SchemaFactory } from '@nestjs/mongoose';

export type OrderDocument = HydratedDocument<Order>

@Schema()
export class Order implements IOrder {
  
    @Prop() tourId: string

    @Prop() userId: string

}
export const OrderSchema = SchemaFactory.createForClass(Order);