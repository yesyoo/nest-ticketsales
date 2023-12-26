import { IInfoUser } from 'src/interfaces/user';

export class InfoUserDto implements IInfoUser {
    userId: string
    firstName: string
    lastName: string
    age: number
    birthDay: string
    citizen: string


    constructor(userId, firstName, lastName, age, birthDay, citizen) {
        this.userId = userId
        this.firstName = firstName
        this.lastName = lastName
        this.age = age
        this.birthDay = birthDay
        this.citizen = citizen
    }
}