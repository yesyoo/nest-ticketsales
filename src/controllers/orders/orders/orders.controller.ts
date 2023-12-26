import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { OrdersService } from '../../../services/orders/orders.service';
import { OrderDto } from '../../../dto/order-dto';
import { IOrder } from 'src/interfaces/order';
import { InfoUserDto } from 'src/dto/infouser-dto';


@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}
    
    @Post()
    sendOrder(@Body() data: {order: OrderDto, user: InfoUserDto}): Promise<IOrder> {
        const orderData = new OrderDto(data.order.tourId, data.order.userId);
        const userData = new InfoUserDto(data.user.userId, data.user.firstName, data.user.lastName, data.user.age, data.user.birthDay, data.user.citizen)
        this.ordersService.saveUserInfo(userData)
        return this.ordersService.saveOrder(orderData);
    };
    
    @Get(':userId')
    getOrdersByUserId(@Param('userId') userId): Promise<any> {
        return this.ordersService.getOrdersByUserId(userId)
    };

    @Get()
    getOrdersAll(): Promise<IOrder[]> {
        return this.ordersService.getOrders()
    };

    @Delete()
    deleteAll(): Promise<IOrder[]> {
        return this.ordersService.deleteAll()
    };

    @Delete(':tourId')
    //сомнительное
    deleteById(@Param('tourId') id): Promise<any> {
        return this.ordersService.deleteById(id)
    };
}
