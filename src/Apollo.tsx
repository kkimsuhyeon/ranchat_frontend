import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
  HttpLink,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

function ApolloProvider({ children }: { children: React.ReactNode }) {
  const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });
  const wsLink = new WebSocketLink({
    uri: "ws://localhost:4000/graphql",
    options: { reconnect: true },
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });

  return <Provider client={client}>{children}</Provider>;
}

export default ApolloProvider;
