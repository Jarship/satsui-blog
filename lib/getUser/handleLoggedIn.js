import checkLoggedIn from './checkLoggedIn';
import handleError from '../error';

 async function handleLoggedIn(apolloClient) {
  const { loggedInUser, error } = await checkLoggedIn(apolloClient);
  if (error) {
    await handleError(apolloClient, error);
    return {};
  } else if(loggedInUser.error) {
    return {};
  } else {
    return { loggedInUser };
  }
};

export default handleLoggedIn;