import { MARK_VISITOR } from '../mutations';

export default (apolloClient, ipAddress) =>
  apolloClient
    .mutate({
      mutation: MARK_VISITOR,
      variables: {
        ipAddress
      }
    })
    .then (({ data }) => {
      return { success: data };
    })
    .catch(e => {
      return { success: false, error: e };
    });