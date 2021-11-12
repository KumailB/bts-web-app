import { GraphQLFloat, GraphQLID, GraphQLString, valueFromAST } from "graphql";
import { QueryPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { Transaction } from "../../Entities/Transaction";
import { TransactionType } from "../TypeDefs/Transaction";
import moment from 'moment';

export const UPDATE_TRANSACTION = {
  type: TransactionType,
  args: {
    id: { type: GraphQLID },
    status: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { id, status } = args;
    await Transaction.update({ id: id }, { status: status });
    return args;
  },
};

export const CREATE_TRANSACTION = {
  type: TransactionType,
  args: {
    commission_payment_type: { type: GraphQLString },
    value: { type: GraphQLFloat },
    commission_paid: { type: GraphQLFloat },
    status: { type: GraphQLString },
    trader_id: { type: GraphQLID },
    client_id: { type: GraphQLID },
    order_type: { type: GraphQLString },
    conv_rate: { type: GraphQLFloat },
  },
  async resolve(parent: any, args: any) {
    args.date = (moment(Date.now()).format("yyyy-MM-DD HH:mm:ss"))
    args.status = "Pending";
    await Transaction.insert(args);
    return args;
  },
};
