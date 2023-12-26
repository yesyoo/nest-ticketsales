export interface IUser {
    psw: string,
    cardNumber: string,
    login: string,
    email: string,
    _id?: string,
    role?: string,
}
export interface IInfoUser {
    userId: string,
    firstName: string,
    lastName?: string,
    age?: number,
    birthDay?: string,
    citizen?: string,
}
