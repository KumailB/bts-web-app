import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";



function MyApp({ Component, pageProps }: AppProps) {

  const client = new ApolloClient({
    uri: "http://localhost:3001/graphql",
    cache: new InMemoryCache(),
    })

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>

  );
}

export default MyApp;
