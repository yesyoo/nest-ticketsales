import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../../users/users.service';
import { BcryptService } from '../bcrypt/bcrypt.service';

@Injectable()
export class AuthService extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService,
                private bcryptService: BcryptService ) {
        super( {usernameField: 'login', passwordField: 'psw'} );
        // переопределяем 2 обязательные поля авторизации юзер | пароль на те, 
        // которые указали на клиенте на странице авторизации?
    };

    async validate(login: string, password: string): Promise<any> {

        let result: boolean
        const hash = await this.usersService.getHash(login)
        const user = await this.usersService.checkAuthUser(login, hash);

        if(user) {
            result = await this.bcryptService.compare(password, hash)
            if(!result) {
                throw new HttpException( 
                    {
                        status: HttpStatus.CONFLICT,
                        errorText: 'Неверный пароль'
                    }, 
                    HttpStatus.CONFLICT)
            } else {
                return true
            }
        } 
    };
}
