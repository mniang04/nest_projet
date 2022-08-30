import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";


export class CreateUserDTO {
    @IsNotEmpty() 
    readonly username: string

    @IsNotEmpty()
    @MaxLength(24) @MinLength(8) 
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
        message: 'Choisi un mot de passe plus robiste et entre 8 et 24 caracteres'
    })
    @IsNotEmpty() password: string

    @IsNotEmpty() nom_user: string;

    @IsNotEmpty() prenom_user: string;
  
    @IsNotEmpty() 
    readonly entreprise_user : string

    @IsNotEmpty() poste_user: string;

    @IsEmail() 
    readonly mail_user: string;
    
    @IsNotEmpty() 
    readonly tel_user: string;

     
    
}