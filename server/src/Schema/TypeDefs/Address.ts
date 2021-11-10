import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
} from "graphql";

export const AddressType = new GraphQLObjectType({
  name: "Address",
  fields: () => ({
    client_id: { type: GraphQLID },
    street_address: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    zip: { type: GraphQLString },
  }),
});
