import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
} from "graphql";

export const LevelType = new GraphQLObjectType({
  name: "Level",
  fields: () => ({
    classification: { type: GraphQLInt },
    commission_rate: { type: GraphQLFloat },
  }),
});
