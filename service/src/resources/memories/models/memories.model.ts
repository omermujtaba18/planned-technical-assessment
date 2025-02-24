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
import { MemoriesMedia } from '../../memories-media/models/memories-media.model';

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
    type: DataType.STRING(50),
  })
  title: string;

  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
  timestamp: Date;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(500),
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
