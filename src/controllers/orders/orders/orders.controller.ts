import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { OrdersService } from '../../../services/orders/orders.service';
import { OrderDto } from '../../../dto/order-dto';
import { IOrder } from 'src/interfaces/order';
import { UsersService } from '../../../services/users/users.service';


@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}
    
    @Post()
    sendOrder(@Body() data: OrderDto): void {
        const orderData = new OrderDto(data.firstName, data.lastName, data.citizen, data.age, data.birthDay, data.cardNumber, data.tourId, data.userId);
        this.ordersService.sendOrder(orderData);
        // this.usersService.setOrder(data.userId, orderData.)
        // post: мы отправляем заказ и patch: мы отправляем юзера
        // 
    };
    
    @Get(':userId')
    getOrdersByUserId(@Param('userId') userId): Promise<IOrder> {
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
