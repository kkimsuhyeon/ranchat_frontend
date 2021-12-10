import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
  HttpLink,
  split,
  ApolloLink,
  from,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { SubscriptionClient } from "subscriptions-transport-ws";

const GRAPHQL_URI = "http://localhost:4000/graphql";
const SOCKET_URI = "ws://localhost:4000/graphql";

function ApolloProvider({ children }: { children: React.ReactNode }) {
  const httpLink = new HttpLink({ uri: GRAPHQL_URI });

  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: localStorage.getItem("token") ?? "",
      },
    }));

    return forward(operation);
  });

  const wsLink = new WebSocketLink(
    new SubscriptionClient(SOCKET_URI, {
      reconnect: true,
      timeout: 30000,
      lazy: true,
      connectionParams: () => {
        return { authorization: localStorage.getItem("token") ?? "" };
      },
    })
  );

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
    link: from([authMiddleware, splitLink]),
    cache: new InMemoryCache(),
  });

  return <Provider client={client}>{children}</Provider>;
}

export default ApolloProvider;
