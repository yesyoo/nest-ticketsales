import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from "@nestjs/mongoose";
import { Model, StringExpression } from "mongoose";
import { User, UserDocument } from "../../shemas/user";
import { UserDto } from 'src/dto/user-dto';
import { IUser } from 'src/interfaces/user';
import { BcryptService } from '../Authentication/bcrypt/bcrypt.service';


@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
                private jwtService: JwtService,
                private bcryptService: BcryptService) {}
 
    async getAllUsers(): Promise<User[]> {
        return this.userModel.find();
    };
 
    async getUserById(id): Promise<User> {
        return this.userModel.findById(id);
    };
    
    async sendUser(data: IUser): Promise<User> {
        data.role = 'user'
        const hash = await this.bcryptService.encode(data.psw)
        data.psw = hash
        const userData = new this.userModel(data);
        return userData.save();
    };
  
    async deleteUsers(): Promise<any> {
        return this.userModel.deleteMany({})
    };
 
    async  deleteUserById(id: string): Promise<User> {
        return this.userModel.findByIdAndDelete(id)
    };
 
    async checkAuthUser(login: string, hash: string): Promise<User[]> {
        const userArr = await this.userModel.find({login: login, psw: hash});
        return userArr.length === 0 ? null : userArr
    };
 
    async checkRegUser(login: string): Promise<User[]> {
        return this.userModel.find({login: login});
    };

    async login(user: UserDto): Promise<any> {
        const payload = { login: user.login, psw: user.psw }
        const userDB = await this.userModel.findOne( {login: user.login})
        return { access_token: this.jwtService.sign(payload), id: userDB._id, role: userDB.role }
    };

    async getHash(login: string): Promise<any> {
        const user = await this.userModel.findOne({login: login})
        if(user) {
            return user.psw
        } 
    };

    async updateUserPassword(data: {user: IUser, passwords: {old: string, new: string}}): Promise<any> {
        let result: boolean;
        let hash = await this.getHash(data.user.login) 
        await this.bcryptService.compare(data.passwords.old, hash).then(data => result = data)

        if(result) {
            const newPassword = await this.bcryptService.encode(data.passwords.new)
            return this.userModel.findOneAndUpdate({login: data.user.login}, {psw: newPassword})
        } else {
            throw new HttpException( 
                {
                    status: HttpStatus.CONFLICT,
                    errorText: 'Неверный пароль'
                }, 
                HttpStatus.CONFLICT)
        };
    };
    
    async auth(data: UserDto): Promise<Object> {
        let user: UserDto = data;
        let access_token: Object;
        
        const res = await this.getHash(data.login).then(hash => user.psw = hash)
            .then(res => this.login(user).then(data => {access_token = data}))
        if(access_token) {
            return access_token
        };
    };

}
 
   
 
 
