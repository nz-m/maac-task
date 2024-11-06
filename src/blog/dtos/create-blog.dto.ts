import { IsString, IsOptional, IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  @ApiProperty({
    description: 'The title of the blog post',
    type: String,
    example: 'My First Blog Post',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The content of the blog post',
    type: String,
    example: 'This is the content of the blog post.',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'List of tags associated with the blog post',
    type: [String],
    isArray: true,
    required: false,
    example: ['Technology', 'NestJS'],
  })
  @IsOptional()
  @IsArray()
  tags?: string[];
}
