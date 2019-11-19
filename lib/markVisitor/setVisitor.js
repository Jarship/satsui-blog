import { MARK_VISITOR } from '../mutations';

export default (apolloClient, ipAddress) => apolloClient
  .mutate({
    mutation: MARK_VISITOR,
    variables: {
      ipAddress,
    },
  })
  .then(({ data }) => ({ success: data }))
  .catch((e) => ({ success: false, error: e }));
