import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put, UseGuards} from '@nestjs/common';
import { UsersService } from 'src/services/users/users.service';
import { User } from 'src/shemas/user';
import { UserDto } from 'src/dto/user-dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuardService } from '../../../services/Authentication/jwt-guard/jwt-guard.service';



@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}
 
    @Get()
    getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    };

    @Get(':id')
    getUserById(@Param('id') id): Promise<User> {
        return this.userService.getUserById(id);
    };
 

    @UseGuards(JwtGuardService)
    @Post()
    sendUser(@Body() dataDTO: UserDto): Promise<User> { 
        return this.userService.checkRegUser(dataDTO.login).then((queryRes) => {
            if (queryRes.length === 0) {
                return this.userService.sendUser(dataDTO);
            } else {
                throw new HttpException( {
                    status: HttpStatus.CONFLICT,
                    errorText: 'Пользователь уже зареган'
                }, HttpStatus.CONFLICT)
            }
        });
    };

    @UseGuards(AuthGuard('local'))
    @Post(':login')
    authUser(@Body() dataDTO: UserDto, @Param('login') login): Promise<any> {
            return this.userService.auth(dataDTO)
    };
 
    @Patch(':id')
    updateUserPassword(@Param('id') id, @Body() data): Promise<any> {
        return this.userService.updateUserPassword(data)
    }
 
    @Delete(':id')
    deleteUserById(@Param('id') id): Promise<User> {
        return this.userService.deleteUserById(id);
    };

    @Delete()
    deleteAllUsers(): Promise<User> {
        return this.userService.deleteUsers()
    };
 
}
 
 

 