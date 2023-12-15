import { IOrder } from "src/interfaces/order";

export class OrderDto implements IOrder {
    firstName: string
    lastName: string
    citizen: string
    age: string
    birthDay: string
    cardNumber: string
    tourId: string
    userId: string

    constructor(firstName, lastName, citizen, age, birthDay, cardNumber, tourId, userId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.citizen = citizen
        this.age = age;
        this.birthDay = birthDay;
        this.cardNumber = cardNumber;
        this.tourId = tourId;
        this.userId = userId;
    }
}