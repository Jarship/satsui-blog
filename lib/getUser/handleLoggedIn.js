import checkLoggedIn from './checkLoggedIn';
import handleError from '../error';

 async function handleLoggedIn(apolloClient) {
  const { loggedInUser, error } = await checkLoggedIn(apolloClient);
  if (error) {
    await handleError(apolloClient, error);
    return {};
  } else if(loggedInUser.getUser.error) {
    return {};
  } else {
    const user = loggedInUser.getUser;
    return { user };
  }
};

export default handleLoggedIn;