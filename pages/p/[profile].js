import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { handleLoggedIn } from '../../lib/getUser';
import Layout from '../../components/layout';
import Image from '../../components/lib/image';
import Text from '../../components/lib/text';
import { UPLOAD_PROFILE_PICTURE } from '../../lib/mutations';
import FileUpload from '../../components/profileImageUpload';

const Profile = () => {
  const [user, setUser] = useState(null); // Current User
  const [uploadFailure, setUploadFailure] =  useState(null); // Errors from uploading
  const [uploadProgress, setUploadProgress] = useState(0); // upload progress for picture
  const client = useApolloClient(); // Apollo State

  const fetchUser = async () => {
    const results = await handleLoggedIn(client);
    setUser(results.user);
  };

  //This useEffect is used to get the current user for display
  useEffect(() => {
    fetchUser();
  }, []);

  // onCompleted is for the mutation that fetches the Upload URL
  const onCompleted = async data => {
    if (!data.uploadProfilePicture.error) {
      fetchUser();
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
  }

  return (
    <Layout>
      {user &&
        <FileUpload
          loading={uploadProgress}
          image={(<Image variant="profile" source={user.photo} altText="Profile Picture" />)}
          onFileChange={handlePictureUpload}
        />
      }
      {uploadFailure && <Text type="error">{uploadFailure}</Text>}
    </Layout>
  );
};

export default Profile;