import { Flex } from "rebass";
import { useState } from "react";
import Form from "../components/signIn";
import Layout from "../components/layout";
import Register from "../components/register";
import redirect from "../lib/redirect";
import checkLoggedIn from "../lib/checkLoggedIn";

const Login = () => {
  const [login, setLogin] = useState(true);
  return (
    <Layout>
      <Flex width={1} justifyContent="center" alignItems="center" flexDirection="column">
        {login ? <Form /> : <Register />}
        <button onClick={() => setLogin(!login)}>{login ? "Sign Up" : "Log in"}</button>
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