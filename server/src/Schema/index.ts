import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { GET_USER, GET_USER_FROM_ID } from "./Queries/User";
import { CREATE_USER } from "./Mutations/User";
import {
  GET_ALL_CLIENTS,
  GET_CLIENT,
  GET_CLIENT_LOGIN,
  GET_SEARCH_CLIENTS,
  GET_TRADER_CLIENTS,
} from "./Queries/Client";
import { UPDATE_CLIENT } from "./Mutations/Client";
import {
  GET_ALL_TRANSACTION,
  GET_CLIENT_TRANSACTIONS,
  GET_MONTHLY_TRANSACTION_TOTAL,
  GET_PENDING_TRANSACTIONS,
  GET_REPORT_DURING,
  GET_TRANSACTIONS_DURING,
} from "./Queries/Transaction";
import { CREATE_TRANSACTION, UPDATE_TRANSACTION } from "./Mutations/Transaction";
import { GET_COMMISSION_RATE } from "./Queries/Level";
import { GET_ADDRESS } from "./Queries/Address";

/**
 * Possible issues with schema:
 *  - Mismatch between entities and type definitions
 *  - Entities don't have non null property
 */

/**
 * TODO:
 * Entities:
 * - User
 * - - Mutations:
 * - - -
 * - - Queries:
 * - - - getUser(email): returns User - DONE
 * - - - getUserName(id): returns first and last name - DONE
 * - Client
 * - - Mutations:
 * - - - updateClient(Client): returns None - DONE
 * - - Queries:
 * - - - getAllClients(): returns Client[] - DONE
 * - - - getTraderClients(trader_id): returns Client[] - DONE
 * - - - getSearchClients(first_name, last_name, street_address, city, state, zip): returns Client[] - DONE
 * - - - getClient(id): returns Client - DONE 
 * - - - getClientLogin(id): returns Client - DONE (Also runs monthly check)
 *
 * - Transaction
 * - - Mutations:
 * - - - updateTransaction(id, status): returns None - DONE
 * - - - createTransaction(commission_payment_type, value, date, commision_paid,
 *                        trader_id, client_id, order_type, conv_rate): returns None - DONE
 * - - Queries:
 * - - - getPendingTransactions(trader_id): returns Transaction[] - DONE
 * - - - (NOT NEEDED) getLastMonthTranasactionTotal(client_id): returns Transaction[]
 * - - - getClientTransactions(client_id): returns Transaction[] - DONE
 * - - - getTransactionsDuring(date_since, date_till): returns Transaction[] - DONE
 * - - - getAllTransactions(): returns Transaction[] - DONE
 *
 * - Trader
 * - - Mutations:
 * - - -
 * - - Queries:
 * - - - (NOT NEEDED) getTrader(id): returns Trader
 *
 * - Manager
 * - - Mutations:
 * - - -
 * - - Queries:
 * - - - (NOT NEEDED) getManager(id): returns Manager
 *
 * - Level
 * - - Mutations:
 * - - -
 * - - Queries:
 * - - - getCommissionRate(classification): returns commission_rate - DONE
 *
 * - Address
 * - - Mutations:
 * - - -
 * - - Queries:
 * - - - getAddress(id): returns Address
 * - - - (NOT NEEDED) getClientsFromAddresses(street_address, city, state, zip): returns client_id[]
 *
 */

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getUser: GET_USER,
    getClient: GET_CLIENT,
    getAddress: GET_ADDRESS,
    getAllClients: GET_ALL_CLIENTS,
    getUserFromId: GET_USER_FROM_ID,
    getClientLogin: GET_CLIENT_LOGIN,
    getReportDuring: GET_REPORT_DURING,
    getTraderClients: GET_TRADER_CLIENTS,
    getSearchClients: GET_SEARCH_CLIENTS,
    getAllTransactions: GET_ALL_TRANSACTION,
    getClientTransactions: GET_CLIENT_TRANSACTIONS,
    getTransactionsDuring: GET_TRANSACTIONS_DURING,
    getCommissionRate: GET_COMMISSION_RATE,
    getPendingTransactions: GET_PENDING_TRANSACTIONS,
    getMonthlyTransactionTotal: GET_MONTHLY_TRANSACTION_TOTAL,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: CREATE_USER,
    updateClient: UPDATE_CLIENT,
    updateTransaction: UPDATE_TRANSACTION,
    createTransaction: CREATE_TRANSACTION,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
