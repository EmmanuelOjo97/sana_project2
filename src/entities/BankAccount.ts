import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from "typeorm";
import { Customer } from "./Customer";
import { Tag } from "./Tag";

@Entity("bankacc")
export class BankAcc extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accNo: string;

  @Column()
  sortCode: string;

  @OneToOne(() => Customer)
  @JoinColumn()
  customer: Customer;

  @OneToMany(() => Tag, (tag) => tag.bankacc)
  tag: Tag[];
}
