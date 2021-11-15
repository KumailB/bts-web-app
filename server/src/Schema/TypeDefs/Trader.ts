import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
} from "graphql";

export const TraderType = new GraphQLObjectType({
  name: "Trader",
  fields: () => ({
    id: { type: GraphQLID },
  }),
});
