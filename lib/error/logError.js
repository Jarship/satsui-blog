import { LOG_ERROR } from '../mutations';

export default (apolloClient, errorMessage) =>
  apolloClient
    .mutate({
      mutation: LOG_ERROR,
      variables: {
        message: errorMessage,
        location: "client",
        status: "ERROR"
      }
    })
    .then(({ data }) => {
      return { success: data };
    })
    .catch(() => {
      return { success: false };
    });