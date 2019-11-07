import { useQuery, useMutation } from '@apollo/react-hooks';
import { useState, useEffect } from 'react';
import { Flex } from 'rebass';
import { handleLoggedIn } from '../../lib/getUser';
import Layout from '../../components/layout';
import Image from '../../components/lib/image';
import Text from '../../components/lib/text';
import { UPLOAD_PROFILE_PICTURE } from '../../lib/mutations';
import FileUpload from '../../components/profileImageUpload';
import { PROFILE_QUERY } from '../../lib/queries';

const Profile = ({ userProfileUrl, current }) => {
  const [uploadFailure, setUploadFailure] =  useState(null); // Errors from uploading
  const [uploadProgress, setUploadProgress] = useState(0); // upload progress for picture

  // onCompleted is for the mutation that fetches the Upload URL
  const onCompleted = async data => {
    if (!data.uploadProfilePicture.error) {
    } else {
      setUploadFailure(data.uploadProfilePicture.error.message);
    }
  };

  // onError is for the mutation that fetches the Upload URL
  const onError = error => {
    console.log("error", error);
  };

  // The mutation that fetches the Upload URL
  const [uploadProfilePicture] = useMutation(UPLOAD_PROFILE_PICTURE, {
    onCompleted,
    onError,
  });

  // handle Uploading the user profile photo
  const handlePictureUpload = async ({
    file,
    local
  } = {}) => {
    setUploadProgress(25);
    if (!file) {
      return;
    }
    setUploadProgress(50);
    uploadProfilePicture({ variables: { file: local } });
    setUploadProgress(100);
  };

  const { loading, error, data } = useQuery(PROFILE_QUERY, {
    variables: { url: userProfileUrl },
    ssr: true
  });

  if (error) return <Layout><p>Error loading profile.</p></Layout>;
  if (loading) return <div>Loading...</div>

  const { profile: user } = data;
  const ProfileImage = <Image variant="profile" source={user.photo} altText="Profile Picture" />;

  return (
    <Layout>
      <Flex flexDirection="column" alignItems="center">
        <Text type="h2">{user.name}</Text>
        <Flex alignSelf="flex-start" ml={4}>
          {userProfileUrl === current.url ?
            <FileUpload
              loading={uploadProgress}
              image={ProfileImage}
              onFileChange={handlePictureUpload}
            />
            :
            ProfileImage
          }
        </Flex>
        {uploadFailure && <Text type="error">{uploadFailure}</Text>}
      </Flex>
    </Layout>
  );
};

Profile.getInitialProps = async context => {
  const currentUser = await handleLoggedIn(context.apolloClient);
  const url = context.query.profile;
  return { userProfileUrl: url, current: currentUser.user };
};

export default Profile;