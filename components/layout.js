import Head from 'next/head';
import Wrapper from './wrapper';
import Nav from './nav';
import Footer from './footer';

export default ({ children, title='Sat Sui'}) => (
  <Wrapper>
    <Head>
      <title>{ title }</title>
    </Head>
    <header>
      <Nav />
    </header>
    <main>
      { children }
    </main>
    <Footer>
      Footer
    </Footer>
  </Wrapper>
);
