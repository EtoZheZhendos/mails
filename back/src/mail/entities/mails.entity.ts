import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'mails', createdAt: false, updatedAt: false })
export class MailEntity extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.TEXT })
  theme: string;

  @Column({ type: DataType.TEXT })
  from: string;

  @Column({ type: DataType.TEXT })
  text: string;

  @Column({ type: DataType.TEXT })
  type: string;

  @Column({ type: DataType.TEXT })
  to: string;

  @Column({ type: DataType.BOOLEAN })
  draft: boolean;
}
//
