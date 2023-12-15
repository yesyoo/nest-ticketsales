import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../../users/users.service';

@Injectable()
export class AuthService extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService ) {
        super( {usernameField: 'login', passwordField: 'psw'} );
        // переопределяем 2 обязательные поля авторизации юзер | пароль на те, 
        // которые указали на клиенте на странице авторизации?
    };

    async validate(login: string, password: string): Promise<any> {
        const user = await this.usersService.checkAuthUser(login, password);
        console.log('user', user)
        if(!user) {
            throw new HttpException( 
                {
                    status: HttpStatus.CONFLICT,
                    errorText: 'Ошибка usersService.checkAuthUser(login, password)'
                }, 
                HttpStatus.CONFLICT)
        }
        return true
    }
}
