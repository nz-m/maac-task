import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { Blog } from './models/blog.model';
import { Comment } from './models/comment.model';
import { User } from '../users/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Blog, Comment, User])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
