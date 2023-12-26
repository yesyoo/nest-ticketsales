import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from 'src/shemas/order';
import { User, UserDocument } from 'src/shemas/user';
import { Tour, TourDocument } from 'src/shemas/tours';
import { Model } from 'mongoose';
import { OrderDto } from '../../dto/order-dto';
import { InfoUser } from 'src/shemas/infouser';
import { InfoUserDocument } from 'src/shemas/infouser';
import { InfoUserDto } from '../../dto/infouser-dto';



@Injectable()
export class OrdersService {
    constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>,
                @InjectModel(User.name) private userModel: Model<UserDocument>,
                @InjectModel(Tour.name) private tourModel: Model<TourDocument>,
                @InjectModel(InfoUser.name) private infoUserModel: Model<InfoUserDocument>) {}

    async saveOrder(data: OrderDto): Promise<Order> {
        const orderData = new this.orderModel(data);
        return orderData.save()
    };

    async saveUserInfo(data: InfoUserDto): Promise<InfoUser> {
        const userId: string = data.userId
        const user = await this.infoUserModel.findOne({userId: userId})
        if(!user) {
            const userInfo = new this.infoUserModel(data)
            return userInfo.save()
        }
    };

    async getOrders(): Promise<any> {
        return await this.orderModel.find()
    };
 
    async getOrdersByUserId(userId: string): Promise<any> { 
        const tourModel = this.tourModel;
        const orderModel = this.orderModel;
        const infoUserModel = this.infoUserModel;

        let userData = { user: null, ordersArr: [] }
  
        async function getData(): Promise<any> {
            return new Promise(async res => {
                await infoUserModel.findOne({userId: userId}).then(user => userData.user = user);
                await orderModel.find({userId: userId}).then(orders => {
                    let i = 0;
                    (async function foo(i): Promise<any> {
                        await tourModel.findOne({_id: orders[i].tourId}).then(tour => {
                            userData.ordersArr.push({order: orders[i], tour: tour})
                                if(i < orders.length - 1) {
                                    foo(i + 1)
                                } else { 
                                    res(userData)
                                }
                            })
                        })(i)
                    })
                })
        }
        return getData()
    };
    

    async deleteAll(): Promise<any> {
        return this.orderModel.deleteMany()
    };

    async deleteById(id: string): Promise<any> {
        return this.orderModel.deleteOne({_id: id})
    };
}
