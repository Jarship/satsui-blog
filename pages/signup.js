import { Flex } from "rebass";
import Link from "../components/lib/link";
import Layout from "../components/layout";
import Register from "../components/register";

const Signup = () => {
  return (
    <Layout>
      <Flex width={1} justifyContent="center" alignItems="center" flexDirection="column">
        <Register bg="oldRose" width={[1, 1, 1 / 2, 1 / 3]} />
        <Link href="/login">Looking for Log In?</Link>
      </Flex>
    </Layout>
  );
};

export default Signup;