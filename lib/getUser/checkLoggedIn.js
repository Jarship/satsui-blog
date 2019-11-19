import { GET_USER } from '../queries';

export default (apolloClient) => apolloClient
  .query({
    query: GET_USER,
  })
  .then(({ data }) => ({ loggedInUser: data, error: null }))
  .catch((e) => ({ loggedInUser: null, error: e })); // Fail gracefully
