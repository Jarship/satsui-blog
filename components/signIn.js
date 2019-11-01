import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { Flex } from "rebass";
import { useState, useContext } from "react";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import redirect from "../lib/redirect";
import { SIGN_IN } from "../lib/mutations";
import cookie from "cookie";
import Text from "./lib/text";
import Field from "./lib/field";
import { UserContext } from './userContextWrapper';

const Container = styled(Flex)(
  () => css`
  `
);

const Form = () => {
  const client = useApolloClient();
  const { user, setUser } = useContext(UserContext);
  if (user) {
    redirect({}, '/');
  }
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
      setUser(data.signInUser.user);
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
      bg="oldRose"
      width={[3 / 4, 3 / 4, 1 / 2, 1 / 4]}
      height="500px"
      onSubmit={e => {
        e.preventDefault();
        signInUser({
          variables: {
            email: email,
            password: password
          }
        });
      }}
    >
      <Text type="h2">Log In</Text>
      <br />
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Flex flexDirection="column">
          <Text type="label">Email</Text>
          <Field value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        </Flex>
        <Flex flexDirection="column">
          <Text type="label">Password</Text>
          <Field type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        </Flex>
        <br />
        <Field type="submit" value="Sign In" disabled={!email && !password} />
        {signInError && <Text texts="error">{signInError}</Text>}
      </Flex>
    </Container>

  );
}

export default Form;