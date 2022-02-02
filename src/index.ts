import express from "express";
import { createConnection } from "typeorm";
import { BankAcc } from "./entities/BankAccount";
import { Customer } from "./entities/Customer";
import { Contacts } from "./entities/Contacts";
import { Tag } from "./entities/Tag";
import { createCustomerRouter } from "./routes/create_customer";

const app = express();
app.use(express.json());
app.use(createCustomerRouter);

const main = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "endman1019",
      database: "users",
      entities: [Customer, BankAcc, Contacts, Tag],
      synchronize: true,
    });
    console.log("Connected to Postgres");
  } catch (error) {
    console.log(error);
    console.log("Unable to connect");
  }
};

main();

app.listen(3000, () => console.log("Server running"));
