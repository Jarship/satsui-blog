import { createContext, useState } from 'react';
import { handleLoggedIn } from '../lib/getUser';

export const UserContext = createContext();

const UserContextWrapper = ({ loggedInUser, children }) => {
  const [user, setUser] = useState(loggedInUser);
  return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>;
};

UserContextWrapper.getInitialProps = async context => {
  console.log('UserContextWrapper getInitialProps');
  return await handleLoggedIn(context.apolloClient);
};

export default UserContextWrapper;