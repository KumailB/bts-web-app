import { GraphQLObjectType, GraphQLID } from "graphql";

export const ManagerType = new GraphQLObjectType({
  name: "Manager",
  fields: () => ({
    id: { type: GraphQLID },
  }),
});
