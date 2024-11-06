import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'The email address of the user',
    type: String,
    example: 'user@test.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user, must be at least 6 characters long',
    type: String,
    example: 'passwordpassword',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
