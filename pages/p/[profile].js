import { useQuery } from '@apollo/react-hooks';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { handleLoggedIn } from '../../lib/getUser';
import Layout from '../../components/layout';
import Image from '../../components/lib/image';
import Text from '../../components/lib/text';
import { UploadHandler } from '../../components/userPhoto';
import ProfileTop from '../../components/lib/profileTop';
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

  const Description = () => <Text>Content Coming</Text>;

  const sameUsers = current && userProfileUrl === current.url;

  const photo = <Image variant="profile" source={user.photo} altText="ProfilePicture" />;

  const upload = <UploadHandler photo={user.photo} setUploadFailure={setUploadFailure} />;


  return (
    <Layout>
      <ProfileTop
        name={user.name}
        photoComponent={sameUsers ? upload : photo}
        descriptionComponent={<Description />}
      />
      {uploadFailure && (
      <Text>
        Upload Failure:
        {uploadFailure}
      </Text>
      )}
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
