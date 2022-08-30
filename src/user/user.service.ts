import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity, UserStatus } from './entities/user.entity';
import * as bcrypt from 'bcryptjs'
import { LoginUserDTO } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    
    password: string;
    
    constructor(@InjectRepository(UserEntity) 
        private repo: Repository<UserEntity>,
        private jwt: JwtService
    ) {}


    async createUser(createUserDTO: CreateUserDTO) {
        const {
            nom_user, 
            prenom_user, 
            entreprise_user, 
            poste_user, 
            mail_user, 
            tel_user, 
            username, 
            password,
        } =  createUserDTO

        const hashed = await bcrypt.hash(password, 8)
        const salt = bcrypt.getSalt(hashed)

        const user = new UserEntity();
         user.nom_user = nom_user;
        user.prenom_user = prenom_user;
        user.entreprise_user = entreprise_user
        user.poste_user = poste_user
        user.mail_user = mail_user
        user.tel_user = tel_user
        user.username = username
        user.password = salt
        user.status = UserStatus.ACTIVE        

        this.repo.create(user)

        try {
            return await this.repo.save(user)
        } catch (err) {
            throw new InternalServerErrorException('Tous les champs sont obligatoire')
        }

    }  

    async loginUser(loginUserDTO: LoginUserDTO) {
        const { username, password } = loginUserDTO;
        const user = this.repo.findOne({
            where: {username}
        });

        if (!user) {
            throw new UnauthorizedException('Invalid username')
        }

        //const isPasswordMatch = bcrypt.compare(password, this.password)

        const isPasswordMatch =  (await user).verifyPassword(password)

        if (isPasswordMatch) {
            const jwtPayload = {username}
            const jwtToken = await this.jwt.signAsync(jwtPayload, { expiresIn: '1h', algorithm: 'HS512'});
            
            return {token: jwtToken}
             
        } else {
            throw new UnauthorizedException('Re-try')
        }
    }

    async getAllUsers() {
        return await this.repo.find()
    }

    










    /*
        findALL(name?: string): UserEntity[] {

            if (name) {
                return this.users.filter((user: any) => user.name === name);
            }
            return this.users;
        }

        findById(userId: number): UserEntity {
            return this.users.find((user: any) => user.id === userId);
        }
    */

} 
