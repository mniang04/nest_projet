import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt"
import { Repository } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { UnauthorizedException } from '@nestjs/common';


export class JwtCustomStrategy extends PassportStrategy(Strategy) {

    constructor(@InjectRepository(UserEntity) private repo : Repository<UserEntity>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'TYUILKJHjkhgjklnkjhgfcghvbnkjhfghnbghfg'
        })
    }

    async validate(payload: {username: string}) {
        const { username } = payload;
        const user = await this.repo.findOne({where: {username}})

        if (!user) {
            throw new UnauthorizedException
        }
        return user
    }

}

