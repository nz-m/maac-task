import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Blog } from './blog.model'; // Import the Blog model

@Table({
  tableName: 'comments',
  timestamps: true,
})
export class Comment extends Model<Comment> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Blog)
  @Column({
    type: DataType.INTEGER,
  })
  blogId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content: string;

  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @BelongsTo(() => Blog)
  blog: Blog;
}
