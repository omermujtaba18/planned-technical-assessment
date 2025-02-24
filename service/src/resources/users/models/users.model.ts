import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Unique,
  AllowNull,
  HasMany,
} from 'sequelize-typescript';
import { Memory } from '../../memories/models/memories.model';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Unique
  @Column({
    type: DataType.STRING,
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  password: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  fullName: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
  })
  profilePicture: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
  })
  memoryLaneDescription: string;

  @HasMany(() => Memory)
  memories: Memory[];
}
