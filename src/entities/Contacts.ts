import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Customer } from "./Customer";
import { Tag } from "./Tag";

@Entity("contacts")
export class Contacts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contactName: string;

  @Column()
  email: string;

  @Column()
  phoneNo: string;

  @ManyToOne(() => Customer, (customer) => customer.contacts)
  customer: Customer;

  @OneToMany(() => Tag, (tag) => tag.contact)
  tag: Tag[];
}
