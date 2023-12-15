import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from 'src/shemas/order';
import { Model } from 'mongoose';
import { OrderDto } from '../../dto/order-dto';


@Injectable()
export class OrdersService {
    constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

    async sendOrder(data: OrderDto): Promise<Order> {
        const orderData = new this.orderModel(data);
        return orderData.save();
    };

    async getOrders(): Promise<any> {
        return this.orderModel.find()
    };

    async getOrdersByUserId(userId: string): Promise<any> {
        return this.orderModel.find({"userId": userId})
    };

    async deleteAll(): Promise<any> {
        return this.orderModel.deleteMany()
    };

    async deleteById(id: string): Promise<any> {
        return this.orderModel.deleteOne({'_id': id})
    };
}
