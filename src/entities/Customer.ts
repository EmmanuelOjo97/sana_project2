import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { BankAcc } from "./BankAccount";
import { Contacts } from "./Contacts";
import { Tag } from "./Tag";

@Entity("customer")
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_name: string;

  @Column()
  email: string;

  @Column()
  phoneNo: string;

  @OneToMany(() => Contacts, (contact) => contact.customer)
  contacts: Contacts[];

  @OneToMany(() => Tag, (tag) => tag.customer)
  tag: Tag[];

  @OneToOne(() => BankAcc, (bankacc) => bankacc.customer)
  @JoinColumn()
  bankacc: BankAcc;
}
