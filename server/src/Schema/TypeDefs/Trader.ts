import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat } from 'graphql';

export const TraderType = new GraphQLObjectType({
    name: "Trader",
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        pw: { type: GraphQLString },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
    })
})