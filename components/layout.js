import Head from 'next/head';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Wrapper from './wrapper';
import Nav from './nav';
import Footer from './footer';
import cookie from 'cookie';

const GET_USER = gql`
  query {
    getUser {
      id
      name
    }
  }
`;

const BasicLayout = ({ children, title, user}) => {
  const client = useApolloClient();
  const logout = () => {
    document.cookie = cookie.serialize('token', '', {
      maxAge: -1
    });
    client.cache.reset()
      .then(() => client.resetStore());
  };

  return (
    <Wrapper>
        <Head>
          <title>{ title }</title>
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

const Layout = ({ children, title = 'Sat Sui' }) => {
  const { loading, error, data} = useQuery(GET_USER, { ssr: true });

  if (loading) return <div>Loading ...</div>;
  if (error) return <BasicLayout children={children} user={null} title={title} />
  const { getUser: user } = data;
  return (
    <BasicLayout children={children} user={user} title={title} />
  );
};

export default Layout;
