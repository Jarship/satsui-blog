import { Flex } from "rebass";
import Form from "../components/signIn";
import Layout from "../components/layout";
import redirect from "../lib/redirect";
import checkLoggedIn from "../lib/checkLoggedIn";
import Link from "next/link";

const Login = () => {
  return (
    <Layout>
      <Flex width={1} justifyContent="center" alignItems="center" flexDirection="column">
        <Form />
        <Link href="/signup"><a>Looking for Sign Up?</a></Link>
      </Flex>
    </Layout>
  );
};

Login.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);
  if (loggedInUser.getUser) {
    redirect(context, '/');
  }
  return;
}

export default Login;