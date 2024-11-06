import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Blog } from './models/blog.model';
import { Comment } from './models/comment.model';
import { User } from '../users/models/user.model';
import { CreateBlogDto } from './dtos/create-blog.dto';
import { UpdateBlogDto } from './dtos/update-blog.dto';
import { CreateCommentDto } from './dtos/create-comment.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog) private blogModel: typeof Blog,
    @InjectModel(Comment) private commentModel: typeof Comment,
  ) {}

  async create(createBlogDto: CreateBlogDto, userId: number): Promise<Blog> {
    const blog = await this.blogModel.create({
      ...createBlogDto,
      userId,
    });
    return blog;
  }

  async update(id: number, updateBlogDto: UpdateBlogDto, userId: number) {
    const blog = await this.blogModel.findOne({
      where: { id, userId },
    });

    if (!blog) {
      throw new Error('Blog not found or user is not authorized to update it');
    }

    if (updateBlogDto.tags) {
      updateBlogDto.tags = updateBlogDto.tags.join(',');
    }

    return blog.update(updateBlogDto);
  }

  async findAll(): Promise<Blog[]> {
    return this.blogModel.findAll({
      include: [Comment],
    });
  }

  async findOne(id: number): Promise<Blog> {
    const blog = await this.blogModel.findOne({
      where: { id },
      include: [
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    return blog;
  }

  async delete(id: number, userId: number): Promise<void> {
    const blog = await this.blogModel.findOne({
      where: { id, userId },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found or you are not the author');
    }

    await blog.destroy();
  }

  async addComment(createCommentDto: CreateCommentDto, userId: number) {
    const { content, blogId } = createCommentDto;
    return this.commentModel.create({
      content,
      blogId,
      userId,
    });
  }

  async getCommentsForBlog(blogId: number) {
    return this.commentModel.findAll({ where: { blogId } });
  }

  async deleteComment(commentId: number, userId: number) {
    const comment = await this.commentModel.findOne({
      where: { id: commentId },
    });

    if (!comment) {
      throw new Error('Comment not found');
    }

    if (comment.userId !== userId) {
      throw new Error('You are not authorized to delete this comment');
    }

    return comment.destroy();
  }
}
