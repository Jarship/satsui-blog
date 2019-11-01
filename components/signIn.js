import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { Flex } from "rebass";
import { useState } from "react";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import redirect from "../lib/redirect";
import cookie from "cookie";
import Text from "./lib/text";
import Field from "./lib/field";

const SIGN_IN = gql`
  mutation Signin($email: String!, $password: String!) {
    signInUser(email: $email, password: $password ) {
      token
    }
  }
`;

const Container = styled(Flex)(
  () => css`
  `
);

const Form = () => {
  const client = useApolloClient();
  const onCompleted = data => {
    // Store the token in cookie
    document.cookie = cookie.serialize('token', data.signInUser.token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    });
    // Force a reload of all the current queries now that the user is
    // logged in
    client.cache.reset().then(() => {
      redirect({}, '/');
    });
  };

  const onError = error => {
    // ToDo: Add logging
    console.error(error);
  };

  const [signInUser, { error }] = useMutation(SIGN_IN, {
    onCompleted,
    onError
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        {error && <Text texts="error">No user found with that information.{error}</Text>}
      </Flex>
    </Container>

  );
}

export default Form;