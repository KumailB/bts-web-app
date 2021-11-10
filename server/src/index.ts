import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { createConnection, getConnectionManager } from "typeorm";
import { schema } from "./Schema";
import dotenv from "dotenv";
import { User } from "./Entities/User";

dotenv.config();

const main = async () => {
  await createConnection({
    type: "mysql",
    database: "bts",
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    logging: true, // For displaying sql statements
    synchronize: false, // If true, creates tables for entities that don't exist
    entities: [User],
  });

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  app.listen(3001, () => {
    console.log("\nready - started server on http://localhost:3001");
    console.log(
      "\x1b[35mgraphql\x1b[39m - now running on \x1b[34mhttp://localhost:3001/graphql\x1b[39m"
    );
  });
};

main().catch((err) => {
  console.log(err);
});
