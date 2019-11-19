import checkLoggedIn from './checkLoggedIn';
import { handleError } from '../error';

async function handleLoggedIn(apolloClient) {
  const { loggedInUser, error } = await checkLoggedIn(apolloClient);
  if (error) {
    await handleError(apolloClient, error);
    return {};
  }
  const user = loggedInUser.getUser;
  if (user.error) {
    return {};
  }
  return { user };
}

export default handleLoggedIn;
