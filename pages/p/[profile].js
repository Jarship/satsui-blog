import { useQuery } from '@apollo/react-hooks';
import { useState } from 'react';
import { Flex } from 'rebass';
import PropTypes from 'prop-types';
import { handleLoggedIn } from '../../lib/getUser';
import Layout from '../../components/layout';
import Image from '../../components/lib/image';
import Text from '../../components/lib/text';
import { UploadHandler } from '../../components/userPhoto';
import { PROFILE_QUERY } from '../../lib/queries';

const Profile = ({ userProfileUrl, current }) => {
  const [uploadFailure, setUploadFailure] = useState(null); // Errors from uploading

  const { loading, error, data } = useQuery(PROFILE_QUERY, {
    variables: { url: userProfileUrl },
    ssr: true,
  });

  if (error) return <Layout><p>Error loading profile.</p></Layout>;
  if (loading) return <div>Loading...</div>;

  const { profile: user } = data;

  return (
    <Layout>
      <Flex flexDirection="column" alignItems="center">
        <Text type="h2">{user.name}</Text>
        <Flex alignSelf="flex-start" ml={4}>
          {current && userProfileUrl === current.url
            ? (
              <>
                <UploadHandler
                  photo={user.photo}
                  setUploadFailure={setUploadFailure}
                />
              </>
            )
            : <Image variant="profile" source={user.photo} altText="Profile Picture" />}
        </Flex>
        {uploadFailure && <Text type="error">{uploadFailure}</Text>}
      </Flex>
    </Layout>
  );
};

Profile.defaultProps = {
  current: null,
};

Profile.propTypes = {
  userProfileUrl: PropTypes.string.isRequired,
  current: PropTypes.shape({
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    error: PropTypes.shape({
      name: PropTypes.string,
      message: PropTypes.string,
    }),
  }),
};

Profile.getInitialProps = async (context) => {
  const currentUser = await handleLoggedIn(context.apolloClient);
  const url = context.query.profile;
  return { userProfileUrl: url, current: currentUser.user };
};

export default Profile;
