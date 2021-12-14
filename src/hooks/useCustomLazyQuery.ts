import { useLazyQuery } from "@apollo/client";
import { DocumentNode } from "graphql";

import { ResponseError } from "libs/class";
import { clearStoreage } from "libs/utils";

export interface useCustomQueryProps<P> {
  query: DocumentNode;
  variables?: P;
}

function useCustomLazyQuery<P, R>({
  query,
  variables,
}: useCustomQueryProps<P>) {
  const [request, { loading, data, error, subscribeToMore }] = useLazyQuery<
    R,
    P
  >(query, {
    variables: variables,
  });

  if (error && new ResponseError(error).code === "499") {
    clearStoreage();
    window.location.href = "/login";
  }

  return { request, data, loading, error, subscribeToMore };
}

export default useCustomLazyQuery;
