import { GraphQLFloat, GraphQLID, GraphQLString } from "graphql";
import { Transaction } from "../../Entities/Transaction";
import { TransactionType } from "../TypeDefs/Transaction";
import moment from "moment";
import { PaymentType } from "../TypeDefs/Payment";
import { Payment } from "../../Entities/Payment";

export const UPDATE_PAYMENT = {
  type: PaymentType,
  args: {
    id: { type: GraphQLID },
    status: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { id, status } = args;
    await Payment.update({ id: id }, { status: status });
    return args;
  },
};

export const CREATE_PAYMENT = {
  type: PaymentType,
  args: {
    value: { type: GraphQLFloat },
    status: { type: GraphQLString },
    trader_id: { type: GraphQLID },
    client_id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    args.date = moment(Date.now()).format("yyyy-MM-DD HH:mm:ss");
    args.status = "Pending";
    await Payment.insert(args);
    return args;
  },
};
