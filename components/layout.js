import Head from 'next/head';
import { useApolloClient } from "@apollo/react-hooks";
import cookie from 'cookie';
import Wrapper from './wrapper';
import Nav from './nav';
import Footer from './footer';
import { useContext } from "react";
import { UserContext } from './userContextWrapper';

const Layout = ({ children }) => {
  const { user, setUser } = useContext(UserContext);
  const client = useApolloClient();
  const logout = () => {
    document.cookie = cookie.serialize('token', '', {
      maxAge: -1
    });
    client.cache.reset()
      .then(() => client.resetStore())
      .then(() => setUser());
  };

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
      <Footer>
      </Footer>
    </Wrapper>
  );
};

export default Layout;
