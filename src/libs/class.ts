import { ApolloError } from "@apollo/client";

export class ResponseError {
  readonly message: string;
  readonly code: string;

  constructor(error: ApolloError) {
    const temp = error.graphQLErrors.map(
      (error) => error.extensions.code
    ) as Array<string>;

    this.message = error.message;
    this.code = temp[0];
  }
}
