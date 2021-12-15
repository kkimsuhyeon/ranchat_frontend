/* eslint-disable react-hooks/rules-of-hooks */
import {
  ApolloError,
  LazyQueryResult,
  QueryLazyOptions,
  SubscribeToMoreOptions,
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client";
import { DocumentNode } from "graphql";

import { ResponseError } from "libs/class";
import { clearStoreage } from "libs/utils";

export const LAZY = "lazy";
export const QUERY = "query";
export const MUTATION = "mutation";

type QueryType = typeof LAZY | typeof QUERY | typeof MUTATION;

type CustomQueryParamsType<T extends QueryType, P> = {
  type: T;
  query: DocumentNode;
  variables?: P;
};

type QueryRetrunType<P, R> = {
  loading: boolean;
  data: R;
  error: ApolloError | undefined;
  subscribeToMore: <TSubscriptionData = R, TSubscriptionVariables = P>(
    options: SubscribeToMoreOptions<
      R,
      TSubscriptionVariables,
      TSubscriptionData
    >
  ) => () => void;
};

type LazyReturnType<P, R> = {
  request: (options?: QueryLazyOptions<P>) => Promise<LazyQueryResult<R, P>>;
  loading: boolean;
  data: R;
  error: ApolloError | undefined;
  subscribeToMore: <TSubscriptionData = R, TSubscriptionVariables = P>(
    options: SubscribeToMoreOptions<
      R,
      TSubscriptionVariables,
      TSubscriptionData
    >
  ) => () => void;
};

type MutationReturnType<P, R> = {
  request: (options?: QueryLazyOptions<P>) => Promise<LazyQueryResult<R, P>>;
  loading: boolean;
};

type ReturnType<T extends QueryType, P, R> = T extends typeof LAZY
  ? LazyReturnType<P, R>
  : T extends typeof QUERY
  ? QueryRetrunType<P, R>
  : T extends typeof MUTATION
  ? MutationReturnType<P, R>
  : undefined;

function useCustomQuery<P, R, T extends QueryType = typeof LAZY>({
  type,
  query,
  variables,
}: CustomQueryParamsType<T, P>): ReturnType<T, P, R> {
  if (type === LAZY) {
    const [request, { data, loading, error, subscribeToMore }] = useLazyQuery<
      R,
      P
    >(query, {
      variables,
    });

    if (error && new ResponseError(error).code === "499") {
      clearStoreage();
      window.location.href = "/login";
    }

    return { request, data, error, loading, subscribeToMore } as ReturnType<
      T,
      P,
      R
    >;
  }

  if (type === QUERY) {
    const { data, error, loading, subscribeToMore } = useQuery<R, P>(query, {
      variables,
    });

    if (error && new ResponseError(error).code === "499") {
      clearStoreage();
      window.location.href = "/login";
    }

    return { data, error, loading, subscribeToMore } as ReturnType<T, P, R>;
  }

  if (type === MUTATION) {
    const [request, { loading, error }] = useMutation<R, P>(query, {
      variables,
    });

    if (error && new ResponseError(error).code === "499") {
      clearStoreage();
      window.location.href = "/login";
    }

    return { request, loading } as ReturnType<T, P, R>;
  }

  return undefined as ReturnType<T, P, R>;
}

export default useCustomQuery;
