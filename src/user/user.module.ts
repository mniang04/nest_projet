import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { JwtCustomStrategy } from './jwt-custom.strategy';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: 'TYUILKJHjkhgjklnkjhgfcghvbnkjhfghnbghfg',
      signOptions: {
        algorithm: 'HS512',
        expiresIn: '60s'
      }
    }),
    /*PassportModule.register({
      defaulStrategy: 'jwt'
    })*/
    passportModule
  ],
  providers: [UserService, JwtCustomStrategy],
  controllers: [UserController],
  exports: [passportModule, JwtCustomStrategy]
})
export class UserModule {}
