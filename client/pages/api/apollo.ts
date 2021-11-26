import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/link-context";
import graphqlEndpoint from "./graphql/index";

const httpLink = createHttpLink({
  uri: graphqlEndpoint,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = process.env.NEXT_GRAPHQL_API_KEY;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "NO API KEY",
    },
  };
});

const apollo = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default apollo;
