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
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    phone_num: { type: GraphQLString },
    cell_phone_num: { type: GraphQLString },
    usd: { type: GraphQLFloat },
    bitcoin: { type: GraphQLFloat },
    last_update: { type: GraphQLString },
    trader_id: { type: GraphQLID },
  }),
});
