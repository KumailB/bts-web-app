import {
  GraphQLID,
  GraphQLList,
} from "graphql";
import { PaymentType } from "../TypeDefs/Payment";
import { Payment } from "../../Entities/Payment";

export const GET_PENDING_PAYMENTS = {
  type: new GraphQLList(PaymentType),
  args: {
    trader_id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    args.status = "Pending";
    const payments = await Payment.find(args);
    return payments;
  },
};
