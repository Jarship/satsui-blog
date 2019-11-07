import { Flex } from "rebass";
import Form from "../components/signIn";
import Layout from "../components/layout";
import Link from '../components/lib/link';

const Login = () => {
  return (
    <Layout>
      <Flex width={1} justifyContent="center" alignItems="center" flexDirection="column">
        <Form bg="oldRose" width={[1, 1, 1 / 2, 1 / 3]} />
        <Link href="/signup">Looking for Sign Up?</Link>
      </Flex>
    </Layout>
  );
};

export default Login;