import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
} from "graphql";

export const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    phone_num: { type: GraphQLString },
    cell_phone_num: { type: GraphQLString },
    usd: { type: GraphQLFloat },
    btc: { type: GraphQLFloat },
    level: { type: GraphQLID },
    last_update: { type: GraphQLString },
    trader_id: { type: GraphQLID },
  }),
});
