import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { GET_USER } from "./Queries/User";
import { CREATE_USER } from "./Mutations/User";

/**
 * TODO:
 * Entities:
 * - User
 * - - Mutations:
 * - - - 
 * - - Queries:
 * - - - getUser(email): returns User - DONE
 * - Client
 * - - Mutations:
 * - - - updateClient(Client): returns None
 * - - Queries:
 * - - - getAllClients(): returns Client[]
 * - - - getTraderClients(trader_id): returns Client[]
 * - - - getClients(name, address): returns Client[]
 * - - - getClientFromId(id): returns Client
 *
 * - Transaction
 * - - Mutations:
 * - - - updateTransaction(Transaction): returns None
 * - - Queries:
 * - - - getTransactions(trader_id): returns Transaction[]
 * - - - getAllTransactions(): returns Transaction[]
 * 
 * - Trader
 * - - Mutations:
 * - - - 
 * - - Queries:
 * - - - getTrader(id): returns Trader
 * 
 * - Manager
 * - - Mutations:
 * - - - getManager(id): returns Manager
 * - - Queries:
 * - - - 
 * 
 * - Level
 * - - Mutations:
 * - - - 
 * - - Queries:
 * - - - getCommissionRate(classification): returns commission_rate
 * 
 * - Address
 * - - Mutations:
 * - - - 
 * - - Queries:
 * - - - getClientsFromAddresses(street_address, city, state, zip): returns client_id[]
 * 
 */

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        getUser: GET_USER,
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: CREATE_USER,
    }
})

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})