import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @Transform(({ value }) => String(value).trim().toLowerCase())
  email!: string;

  @IsString()
  @MinLength(8, { message: 'Mot de passe trop court (min 8).' })
  // Au moins 1 majuscule, 1 minuscule, 1 chiffre (tu peux aussi ajouter un symbole)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message: 'Le mot de passe doit contenir majuscule, minuscule et chiffre.',
  })
  password!: string;

  @IsString()
  @Transform(({ value }) => String(value).trim())
  name!: string;
}
