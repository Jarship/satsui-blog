import { useState } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Flex } from 'rebass';
import Text from './lib/text';
import Field from './lib/field';
import redirect from '../lib/redirect';
import cookie from "cookie";

const CREATE_USER = gql`
  mutation Create($name: String!, $email: String!, $password: String!) {
    createUser(
      name: $name,
      email: $email,
      password: $password
    ) {
      token
    }
  }
`;

const RegisterBox = ({ inviteCode = "" }) => {
  const client = useApolloClient();

  const onCompleted = data => {
    document.cookie = cookie.serialize('token', data.createUser.token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    });

    // Force a reload of all the current queries now that the user
    // is logged in

    client.cache.reset().then(() => {
      redirect({}, '/');
    });
  };

  const onError = error => {
    // ToDo: Error Logging
    console.error(error);
  };
  const [create, { error }] = useMutation(CREATE_USER, { onCompleted, onError});
  const [ name, setName ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ confirmPass, setConfirmPass ] = useState('');
  const [ invitation, setInvitation ] = useState(inviteCode);
  const isValid = () => {
    return password === confirmPass;
  };
  return (
    <Flex 
      as="form" 
      onSubmit={e => {
        e.preventDefault();
        create({
          variables: {
            name: name,
            email: email,
            password: password,
            invite: invitation
          }
        });
      }} 
      flexDirection="column"
      bg="oldRose"
    >
      <Text texts="h3">Sign Up</Text>
      <br />
      <Flex flexDirection="column">
        <Text texts="label">I'd like to know your name</Text>
        <Field 
          value={name} 
          onChange={e => setName(e.target.value)}
          placeholder="My name is ..."
        />
      </Flex>
      <Flex flexDirection="column">
        <Text texts="label">Can I get your invite code?</Text>
        <Field
          value={invitation}
          onChange={e => setInvitation(e.target.value)}
          placeholder="I was sent the code ..."
        />
      </Flex>
      <Flex flexDirection="column">
        <Text texts="label">I will need your email, for logging in</Text>
        <Field 
          value={email} 
          onChange={e => setEmail(e.target.value)}
          placeholder="My email is ..."
        />
      </Flex>
      <Flex flexDirection="column">
        <Text texts="label">We will also need a password</Text>
        <Field
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Make it weird, like #9a5bca3"
        />
      </Flex>
      <Flex flexDirection="column">
        <Text texts="label">Can I get that again? Just to verify</Text>
        <Field
          type="password"
          value={confirmPass}
          onChange={e => setConfirmPass(e.target.value)}
          placeholder="Whatever you typed above"
        />
      </Flex>
      <Field
        type="submit"
        value="submit"
        disabled={!isValid()}
      />
  {error && <Text texts="label">Issue occured while registering:({error})</Text>}
    </Flex>
  );
};

export default RegisterBox;