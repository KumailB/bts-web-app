import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { createConnection } from "typeorm";

const main = async () => {
    
    const app = express();
    app.use(cors());
    app.use(express.json());
    // app.use("/graphql", graphqlHTTP({
    //     schema,
    //     graphiql: true,
    // }))

    app.listen(3001, () => {
        console.log("SERVER RUNNING ON PORT 3001");
    });

}

main().catch((err) => {
    console.log(err);
});