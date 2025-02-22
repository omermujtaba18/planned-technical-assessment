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
} from 'sequelize-typescript';
import { Memory } from '../../memories/models/memories.model';

@Table({
  tableName: 'memories_media',
  timestamps: true,
})
export class MemoriesMedia extends Model<MemoriesMedia> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  url: string;

  @ForeignKey(() => Memory)
  @AllowNull(false)
  @Column
  memoryId: number;

  @BelongsTo(() => Memory)
  memory: Memory;
}
