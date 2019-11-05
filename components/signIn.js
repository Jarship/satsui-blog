import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { Flex } from "rebass";
import { useState, useEffect } from "react";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import redirect from "../lib/redirect";
import { SIGN_IN } from "../lib/mutations";
import cookie from "cookie";
import Text from "./lib/text";
import Field from "./lib/field";
import { handleLoggedIn} from '../lib/getUser';
import FormField from './lib/formField';

const Container = styled(Flex)(
  () => css`
  `
);

const Form = ({ ...otherProps }) => {
  const client = useApolloClient();
  useEffect(() => {
    const fetchUser = async () => {
      const results = await handleLoggedIn(client);
      if(results.user) {
        redirect({}, '/');
      }
    };

    fetchUser();
  }, []);
  const onCompleted = data => {
    if (!data.signInUser.error) {
    // Store the token in cookie
      document.cookie = cookie.serialize('token', data.signInUser.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      });
      // Force a reload of all the current queries now that the user is
      // logged in
      client.cache.reset();
    } else {
      setSignInError(data.signInUser.error.message);
    }
  };

  const onError = error => {
    // ToDo: Add logging
    console.log("error ", error);
  };

  const [signInUser, { error }] = useMutation(SIGN_IN, {
    onCompleted,
    onError
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState("");

  if (error) console.log(error);

  return (
    <Container
      as="form"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      {...otherProps}
      height="500px"
      onSubmit={e => {
        e.preventDefault();
        signInUser({
          variables: {
            email: email.toLowerCase(),
            password: password
          }
        });
      }}
    >
      <Text my={6} type="h2">Log In</Text>
      <FormField
        value={email}
        onChange={setEmail}
        placeholder="Email"
        label="Email"
        flexDirection="column"
      />
      <FormField
        value={password}
        onChange={setPassword}
        placeholder="Password"
        label="Password"
        flexDirection="column"
      />
      <Flex>
        <Field my={4} type="submit" value="Sign In" disabled={!email && !password} />
      </Flex>
      {signInError && <Text texts="error">{signInError}</Text>}
    </Container>

  );
}

export default Form;