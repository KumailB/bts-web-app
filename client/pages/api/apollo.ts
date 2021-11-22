import { ApolloClient, InMemoryCache } from "@apollo/client";
import graphqlEndpoint from "./graphql/index";

const apollo = new ApolloClient({
    uri: graphqlEndpoint,
    cache: new InMemoryCache(),
});

export default apollo;