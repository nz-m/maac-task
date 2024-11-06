import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  Req,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dtos/create-blog.dto';
import { UpdateBlogDto } from './dtos/update-blog.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Blog } from './models/blog.model';
import { Comment } from './models/comment.model';
import { Request } from 'express';
import { CreateCommentDto } from './dtos/create-comment.dto';

@ApiTags('Blogs')
@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new blog' })
  @ApiResponse({
    status: 201,
    description: 'The blog has been successfully created.',
    type: Blog,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request, validation failed.',
  })
  create(@Body() createBlogDto: CreateBlogDto, @Req() req: Request) {
    if (createBlogDto.tags) {
      createBlogDto.tags = createBlogDto.tags.join(',');
    }
    return this.blogService.create(createBlogDto, req.user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing blog' })
  @ApiParam({ name: 'id', description: 'The ID of the blog to update' })
  @ApiResponse({
    status: 200,
    description: 'The blog has been successfully updated.',
    type: Blog,
  })
  @ApiResponse({
    status: 404,
    description: 'Blog not found or unauthorized to update.',
  })
  update(
    @Param('id') id: number,
    @Body() updateBlogDto: UpdateBlogDto,
    @Req() req: Request,
  ) {
    if (updateBlogDto.tags) {
      updateBlogDto.tags = updateBlogDto.tags.join(',');
    }
    return this.blogService.update(id, updateBlogDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all blogs' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all blogs.',
    type: [Blog],
  })
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific blog by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the blog to retrieve' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the blog.',
    type: Blog,
  })
  @ApiResponse({
    status: 404,
    description: 'Blog not found.',
  })
  findOne(@Param('id') id: number) {
    return this.blogService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a blog' })
  @ApiParam({ name: 'id', description: 'The ID of the blog to delete' })
  @ApiResponse({
    status: 200,
    description: 'The blog has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Blog not found or unauthorized to delete.',
  })
  delete(@Param('id') id: number, @Req() req: Request) {
    return this.blogService.delete(id, req.user.id);
  }

  @Post(':blogId/comments')
  @ApiOperation({ summary: 'Add a comment to a blog' })
  @ApiParam({ name: 'blogId', description: 'The ID of the blog post' })
  @ApiResponse({
    status: 201,
    description: 'The comment has been successfully added.',
    type: Comment,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request, validation failed.',
  })
  async addComment(
    @Param('blogId') blogId: number,
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: Request,
  ) {
    createCommentDto.blogId = blogId;
    return this.blogService.addComment(createCommentDto, req.user.id);
  }

  @Get(':blogId/comments')
  @ApiOperation({ summary: 'Get all comments for a blog' })
  @ApiParam({ name: 'blogId', description: 'The ID of the blog post' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all comments for the blog.',
    type: [Comment],
  })
  async getComments(@Param('blogId') blogId: number) {
    return this.blogService.getCommentsForBlog(blogId);
  }

  @Delete('comments/:commentId')
  @ApiOperation({ summary: 'Delete a comment' })
  @ApiParam({
    name: 'commentId',
    description: 'The ID of the comment to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'The comment has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Comment not found or unauthorized to delete.',
  })
  async deleteComment(
    @Param('commentId') commentId: number,
    @Req() req: Request,
  ) {
    return this.blogService.deleteComment(commentId, req.user.id);
  }
}
