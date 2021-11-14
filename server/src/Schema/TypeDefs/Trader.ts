import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
} from "graphql";

export const TraderType = new GraphQLObjectType({
  name: "Trader",
  fields: () => ({
    id: { type: GraphQLID },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
  }),
});
