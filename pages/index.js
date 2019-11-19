import { Flex } from 'rebass';
import Layout from '../components/layout';
// import Feed from '../components/feed';
import { handleVisitor } from '../lib/markVisitor';
import Text from '../components/lib/text';

const IndexPage = () => (
  <Layout>
    {/* <Feed /> */}
    <Flex flexDirection="column" alignItems="center">
      <Text type="h2">Sat Sui is currently under development</Text>
      <Text>To check on the progress, please check out the About Page</Text>
    </Flex>
  </Layout>
);

IndexPage.getInitialProps = async (context) => {
  await handleVisitor(context);
};

export default IndexPage;
