import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "../../shemas/user";
import { UserDto } from 'src/dto/user-dto';
import { IUser } from 'src/interfaces/user';


@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
                private jwtService: JwtService) {
        console.log('userService run')
    }
 
    async getAllUsers(): Promise<User[]> {
        return this.userModel.find();
    };
 
    async getUserById(id): Promise<User> {
        console.log('user id', id)
        return this.userModel.findById(id);
    };
    
    async sendUser(data: IUser): Promise<User> {
        data.role = 'user'
        const userData = new this.userModel(data);
        return userData.save();
    };
 
    async updateUsers(id: string, body): Promise<User> {
        console.log('post user')
        return this.userModel.findByIdAndUpdate(id, body);
    };
 
    async deleteUsers(): Promise<any> {
        return this.userModel.deleteMany({})
    };
 
    async  deleteUserById(id: string): Promise<User> {
        return this.userModel.findByIdAndDelete(id)
    };
 
    async checkAuthUser(login: string, psw: string): Promise<User[]> {
        const userArr = await this.userModel.find({login: login, psw: psw});
        return userArr.length === 0 ? null : userArr
    };
 
    async checkRegUser(login: string): Promise<User[]> {
        return this.userModel.find({login: login});
    };

    async login(user: UserDto) {
        const payload = { login: user.login, psw: user.psw }
        const userDB = await this.userModel.find( {login: user.login})

        return { access_token: this.jwtService.sign(payload), id: userDB[0]._id }
    };
 
}
 
   
 
 
