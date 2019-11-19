import Head from 'next/head';
import { useApolloClient } from '@apollo/react-hooks';
import cookie from 'cookie';
import { useState, useEffect } from 'react';
import Wrapper from './wrapper';
import Nav from './nav';
import Footer from './footer';
import { handleLoggedIn } from '../lib/getUser';

const Layout = ({ children }) => {
  const [user, setUser] = useState(null);
  const client = useApolloClient();
  const logout = () => {
    document.cookie = cookie.serialize('token', '', {
      maxAge: -1,
    });
    client.cache.reset()
      .then(() => client.resetStore())
      .then(() => setUser());
  };

  useEffect(() => {
    const fetchUser = async () => {
      const results = await handleLoggedIn(client);
      setUser(results.user);
    };

    fetchUser();
  }, []);

  return (
    <Wrapper>
      <Head>
        <title>Sat Sui</title>
      </Head>
      <header>
        <Nav user={user} handleLogout={logout} />
      </header>
      <main>
        { children }
      </main>
      <Footer />
    </Wrapper>
  );
};

export default Layout;
