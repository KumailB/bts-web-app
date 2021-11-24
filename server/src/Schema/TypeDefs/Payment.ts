import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
} from "graphql";

export const PaymentType = new GraphQLObjectType({
  name: "Transaction",
  fields: () => ({
    id: { type: GraphQLID },
    status: { type: GraphQLString },
    client_id: { type: GraphQLID },
    trader_id: { type: GraphQLID },
    value: { type: GraphQLFloat },
    date: { type: GraphQLString },
  }),
});
