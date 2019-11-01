import { Flex } from "rebass";
import Link from "next/link";
import Layout from "../components/layout";
import Register from "../components/register";
import redirect from "../lib/redirect";
import checkLoggedIn from "../lib/checkLoggedIn";

const Signup = ({ inviteCode }) => {
  return (
    <Layout>
      <Flex width={1} justifyContent="center" alignItems="center" flexDirection="column">
        <Register inviteCode={inviteCode} />
        <Link href="/login"><a>Looking for Log In?</a></Link>
      </Flex>
    </Layout>
  );
};

Signup.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);
  if (loggedInUser.getUser) {
    redirect(context, '/');
  }
  const { inviteCode } = context.query;
  return { inviteCode };
}

export default Signup;