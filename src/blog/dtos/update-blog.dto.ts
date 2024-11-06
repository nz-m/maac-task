import { IsString, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBlogDto {
  @ApiProperty({
    description: 'The title of the blog post (optional)',
    type: String,
    example: 'Updated Blog Title',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'The content of the blog post (optional)',
    type: String,
    example: 'This is the updated content of the blog post.',
    required: false,
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({
    description: 'List of tags associated with the blog post (optional)',
    type: [String],
    isArray: true,
    example: ['Tag1', 'Tag2'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  tags?: string[];
}
