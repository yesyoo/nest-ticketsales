import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IOrder } from 'src/interfaces/order';
import { SchemaFactory } from '@nestjs/mongoose';


export type OrderDocument = HydratedDocument<Order>

@Schema()
export class Order implements IOrder {
    @Prop() age: string

    @Prop() birthDay: string

    @Prop() cardNumber: string

    @Prop() tourId: string

    @Prop() userId: string

    @Prop() lastName: string

    @Prop() firstName: string

    @Prop() citizen: string

}
export const OrderSchema = SchemaFactory.createForClass(Order);