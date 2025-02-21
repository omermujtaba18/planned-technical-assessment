import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { User } from '../../users/models/users.model';
import { MemoriesMedia } from './memories-media.model';

@Table({
  tableName: 'memories',
  timestamps: true,
})
export class Memory extends Model<Memory> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  title: string;

  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
  timestamp: Date;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
  })
  description: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => MemoriesMedia)
  media: MemoriesMedia[];
}
