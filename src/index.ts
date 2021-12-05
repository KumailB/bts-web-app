import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { createConnection, getConnectionManager } from "typeorm";
import { schema } from "./Schema";
import dotenv from "dotenv";
import { Address } from "./Entities/Address";
import { Client } from "./Entities/Client";
import { Level } from "./Entities/Level";
import { Manager } from "./Entities/Manager";
import { Trader } from "./Entities/Trader";
import { Transaction } from "./Entities/Transaction";
import { User } from "./Entities/User";
import { Payment } from "./Entities/Payment";

dotenv.config();

const main = async () => {
  await createConnection({
    type: "mysql",
    database: "bts",
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    logging: false, // For displaying sql statements
    synchronize: false, // If true, creates tables for entities that don't exist
    entities: [Address, Client, Level, Manager, Trader, Transaction, Payment, User],
  });
  
  const authMiddleware = (req: any, res: any, next: () => void) => {
    if(process.env.API_KEY === req.headers.authorization){
      next();
    }else{
      return res.status(404).send("");
    }
  }

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(authMiddleware);
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: false,
    })
  );

  app.listen(process.env.SERVER_PORT, () => {
    console.log("\nready - started server on http://"+process.env.SERVER_HOST+":"+process.env.SERVER_PORT);
    console.log(
      "\x1b[35mgraphql\x1b[39m - now running on \x1b[34mhttp://"+process.env.SERVER_HOST+":"+process.env.SERVER_PORT+"/graphql\x1b[39m"
    );
  });
};

main().catch((err) => {
  console.log(err);
});
