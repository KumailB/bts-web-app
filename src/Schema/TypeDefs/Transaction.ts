import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
} from "graphql";

export const TransactionType = new GraphQLObjectType({
  name: "Transaction",
  fields: () => ({
    id: { type: GraphQLID },
    commission_payment_type: { type: GraphQLString },
    status: { type: GraphQLString },
    first_name: { type: GraphQLString },
    client_id: { type: GraphQLID },
    trader_id: { type: GraphQLID },
    order_type: { type: GraphQLString },
    value: { type: GraphQLFloat },
    commission_paid: { type: GraphQLFloat },
    conv_rate: { type: GraphQLFloat },
    date: { type: GraphQLString },
  }),
});
