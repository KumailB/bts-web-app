import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";

export const ManagerType = new GraphQLObjectType({
  name: "Manager",
  fields: () => ({
    id: { type: GraphQLID },
  }),
});
