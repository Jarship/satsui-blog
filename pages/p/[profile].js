import { useQuery, useMutation } from '@apollo/react-hooks';
import { useState } from 'react';
import { Flex } from 'rebass';
import PropTypes from 'prop-types';
import { handleLoggedIn } from '../../lib/getUser';
import Layout from '../../components/layout';
import Image from '../../components/lib/image';
import Text from '../../components/lib/text';
import { UPLOAD_PROFILE_PICTURE } from '../../lib/mutations';
import FileUpload from '../../components/profileImageUpload';
import { PROFILE_QUERY } from '../../lib/queries';

const Profile = ({ userProfileUrl, current }) => {
  const [uploadFailure, setUploadFailure] = useState(null); // Errors from uploading
  const [uploadProgress, setUploadProgress] = useState(0); // upload progress for picture

  const { loading, error, data } = useQuery(PROFILE_QUERY, {
    variables: { url: userProfileUrl },
    ssr: true,
  });

  if (error) return <Layout><p>Error loading profile.</p></Layout>;
  if (loading) return <div>Loading...</div>;

  const { profile: user } = data;
  const [profilePicture, setProfilePicture] = useState(<Image variant="profile" source={user.photo} altText="Profile Picture" />);

  // onCompleted is for the mutation that fetches the Upload URL
  const onCompleted = async (response) => {
    if (!response.uploadProfilePicture.error) {
      setUploadProgress(0);
      setProfilePicture(<Image variant="profile" source={response.uploadProfilePicture.photoUrl} altText="Profile Picture" />);
    } else {
      setUploadFailure(response.uploadProfilePicture.error.message);
    }
  };

  // onError is for the mutation that fetches the Upload URL
  const onError = (mutationError) => {
    console.log('error', mutationError);
  };

  // The mutation that fetches the Upload URL
  const [uploadProfilePicture] = useMutation(UPLOAD_PROFILE_PICTURE, {
    onCompleted,
    onError,
  });

  // handle Uploading the user profile photo
  const handlePictureUpload = async ({
    file,
  } = {}) => {
    setUploadProgress(25);
    if (!file) {
      return;
    }
    setUploadProgress(50);
    uploadProfilePicture({ variables: { picture: file } });
    setUploadProgress(100);
  };

  return (
    <Layout>
      <Flex flexDirection="column" alignItems="center">
        <Text type="h2">{user.name}</Text>
        <Flex alignSelf="flex-start" ml={4}>
          {current && userProfileUrl === current.url
            ? (
              <>
                <FileUpload
                  loading={uploadProgress}
                  image={profilePicture}
                  onFileChange={handlePictureUpload}
                />
              </>
            )
            : profilePicture}
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
