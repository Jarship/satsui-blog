import { useState, useEffect } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import cookie from "cookie";
import { Flex } from 'rebass';
import { CREATE_USER } from '../lib/mutations';
import Text from './lib/text';
import Field from './lib/field';
import redirect from '../lib/redirect';
import { handleLoggedIn} from '../lib/getUser';
import FormField from './lib/formField';

const RegisterBox = ({ ...otherProps }) => {
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
    if (!data.createUser.error) {
      document.cookie = cookie.serialize('token', data.createUser.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      });

      // Force a reload of all the current queries now that the user
      // is logged in

      client.cache.reset();
      setUser(data.createUser.user);

    } else {
      console.error("Error", error);
    }
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
  const isValid = () => {
    return password === confirmPass
      && name
      && password
      && email;
  };
  return (
    <Flex
      as="form"
      justifyContent="center"
      alignItems="center"
      width={[3 / 4, 3 / 4, 1 / 2, 1 / 4]}
      height="500px"
      onSubmit={e => {
        e.preventDefault();
        create({
          variables: {
            name: name,
            email: email.toLowerCase(),
            password: password
          }
        });
      }} 
      flexDirection="column"
      bg="oldRose"
      {...otherProps}
    >
      <Text my={6} type="h2">Sign Up</Text>
      <FormField
        value={name}
        onChange={setName}
        placeholder="My name is..."
        label="I'd like to know your name"
        flexDirection="column"
      />
      <FormField
        value={email}
        onChange={setEmail}
        placeholder="My email is ..."
        label="Email, for loggin in"
        flexDirection="column"
      />
      <FormField
        value={password}
        onChange={setPassword}
        placeholder="Make it weird, like #9a5bca3"
        label="Password time!!!!"
        flexDirection="column"
      />
      <FormField
        value={confirmPass}
        onChange={setConfirmPass}
        placeholder="Whatever you typed above"
        label="Password Confirmation"
        flexDirection="column"
      />
      <Flex>
        <Field
          my={4}
          type="submit"
          value="submit"
          disabled={!isValid()}
        />
      </Flex>
  {error && <Text type="label">Issue occured while registering:({error})</Text>}
    </Flex>
  );
};

export default RegisterBox;