import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    first_name: {type: GraphQLString},
    last_name: {type: GraphQLString},
    user_type: {type: GraphQLString},
    pw: { type: GraphQLString },
  }),
});
