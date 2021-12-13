import { useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import { ResponseError } from "libs/class";
import { clearStoreage } from "libs/utils";

export interface useCustomQueryProps<P> {
  query: DocumentNode;
  variables?: P;
}

function useCustomQuery<P, R>({ query, variables }: useCustomQueryProps<P>) {
  const { loading, data, error, subscribeToMore } = useQuery<R, P>(query, {
    variables: variables,
  });

  if (error && new ResponseError(error).code === "499") {
    clearStoreage();
    window.location.href = "/login";
  }

  return { loading, data, error, subscribeToMore };
}

export default useCustomQuery;
