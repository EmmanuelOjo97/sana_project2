import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Contacts } from "./Contacts";
import { Customer } from "./Customer";
import { BankAcc } from "./BankAccount";

@Entity("tag")
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tagName: string;

  @Column()
  tagCode: string;

  @ManyToOne(() => Customer, (customer) => customer.tag)
  @JoinColumn()
  customer: Customer;

  @ManyToOne(() => Contacts, (contact) => contact.tag)
  @JoinColumn()
  contact: Contacts;

  @ManyToOne(() => BankAcc, (bankacc) => bankacc.tag)
  @JoinColumn()
  bankacc: BankAcc;
}
//   @ManyToOne(()=> Contacts,(contact)=> contact.tag)
