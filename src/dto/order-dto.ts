import { IOrder } from "src/interfaces/order";

export class OrderDto implements IOrder {
    tourId: string
    userId: string

    constructor(tourId, userId) {
        this.tourId = tourId;
        this.userId = userId;
    }
}