import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from '../../services/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from 'src/shemas/user';
import { AuthService } from '../../services/Authentication/auth/auth.service';
import { PassportModule } from '@nestjs/passport/dist';
import { jwtConstants } from '../../static/private/constants';
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategyService } from '../../services/Authentication/jwt-strategy/jwt-strategy.service';


@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    PassportModule,
    JwtModule.register({
        secret: jwtConstants.secret
      })
  ],
  controllers: [
    UsersController
  ],
  providers: [
    UsersService, 
    AuthService,
    JwtStrategyService
  ],
  exports: []
})
export class UsersModule {}
