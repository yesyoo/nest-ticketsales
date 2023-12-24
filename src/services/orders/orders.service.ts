import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from 'src/shemas/order';
import { User, UserDocument } from 'src/shemas/user';
import { Tour, TourDocument } from 'src/shemas/tours';
import { Model } from 'mongoose';
import { OrderDto } from '../../dto/order-dto';
import { UsersService } from '../users/users.service';
import { IOrder } from 'src/interfaces/order';


@Injectable()
export class OrdersService {
    constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>,
                @InjectModel(User.name) private userModel: Model<UserDocument>,
                @InjectModel(Tour.name) private tourModel: Model<TourDocument>
                ) {}

    async sendOrder(data: OrderDto): Promise<Order> {
        let info;

        await this.saveOrder(data).then(order => { info = order })
        console.log('info:', info)
        this.userModel.findOneAndUpdate({_id: info.userId}, { ordersId: info._id})
        
        return 

    };

    async saveOrder(data: OrderDto): Promise<Order> {
        const orderData = new this.orderModel(data);
        return orderData.save();
    }

    async getOrders(): Promise<any> {
        return this.orderModel.find()
    };
 
     transformOrders(orders: any[]) {
            const newArr = orders.map( async(el) => {
                const tourId = el.tourId;
                const tourInfo = await this.tourModel.find({_id: tourId})
                console.log('*****', tourInfo);
                
                el.tourInfo = tourInfo
                console.log('order', el);
                return el;
            }) 

            console.log('newArr', newArr)
    } 

    async getOrdersByUserId(userId: string): Promise<any> {

        const responce = {
            user: await this.userModel.find({_id: userId}),
            orders: await this.orderModel.find({"userId": userId})
        }
        // console.log('orders', responce.orders);
        
        //  this.transformOrders(responce.orders).then(data => {

        // })

        this.transformOrders(responce.orders)
        return responce

    
         // [order, ..]
    };

    async deleteAll(): Promise<any> {
        return this.orderModel.deleteMany()
    };

    async deleteById(id: string): Promise<any> {
        return this.orderModel.deleteOne({'_id': id})
    };
}
