import { GET_USER } from '../queries';

export default apolloClient =>
  apolloClient
    .query({
      query: GET_USER
    })
    .then(({ data }) => {
      return { loggedInUser: data, error: null };
    })
    .catch(e => {
      // Fail gracefully
      return { loggedInUser: null, error: e };
    });