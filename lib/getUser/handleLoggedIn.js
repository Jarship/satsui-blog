import checkLoggedIn from './checkLoggedIn';
import { handleError } from '../error';

async function handleLoggedIn(apolloClient) {
  const { loggedInUser, error } = await checkLoggedIn(apolloClient);
  if (error) {
    await handleError(apolloClient, error);
    return {};
  } else {
    const user = loggedInUser.getUser;
    if(user.error) {
      return {};
    } else {
      return { user };
    }
  }
};

module.exports = {
  handleLoggedIn,
};