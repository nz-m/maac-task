import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The content of the comment',
    type: String,
    example: 'This is a great blog post!',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    description: 'The ID of the blog to which the comment is related',
    type: Number,
    example: 1,
  })
  @IsNotEmpty()
  blogId: number;
}
