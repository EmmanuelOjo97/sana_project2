import express from "express";
import { Customer } from "../entities/Customer";
import { Contacts } from "../entities/Contacts";
import { Tag } from "../entities/Tag";
import { BankAcc } from "../entities/BankAccount";
import { getRepository } from "typeorm";
import { getConnection } from "typeorm";

const router = express.Router();

router.post("/api/customer", async (req, res) => {
  const { user_name, email, phoneNo, accNo, sortCode } = req.body;

  // add user to DB
  const customer = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Customer)
    .values({ user_name, email, phoneNo })
    .execute();
  // add contact to db
  const contact = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Contacts)
    .values(req.body.contact)
    .execute();

  // insert relation between contact and customer
  const contactRelation = getConnection()
    .createQueryBuilder()
    .relation(Customer, "contacts")
    .of(customer)
    .add(contact);

  // add bankacc to db
  const bankacc = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(BankAcc)
    .values({ accNo, sortCode })
    .execute();

  //insert relation between bankacc and customer
  await getConnection()
    .createQueryBuilder()
    .relation(Customer, "bankacc")
    .of(customer)
    .set(bankacc);

  // insert tag to db
  const tag = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Tag)
    .values(req.body.tag)
    .execute();

  // insert relation between tag and customer
  await getConnection()
    .createQueryBuilder()
    .relation(Customer, "tag")
    .of(customer)
    .add(tag);

  // insert relation between tag and bankacc
  await getConnection()
    .createQueryBuilder()
    .relation(BankAcc, "tag")
    .of(bankacc)
    .add(tag);

  // insert relation between tag and contacts
  await getConnection()
    .createQueryBuilder()
    .relation(Contacts, "tag")
    .of(contact)
    .add(tag);

  return res.send("Customer details have been saved");
});

export { router as createCustomerRouter };
