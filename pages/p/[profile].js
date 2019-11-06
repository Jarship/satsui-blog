import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { handleLoggedIn } from '../../lib/getUser';
import Layout from '../../components/layout';
import Image from '../../components/lib/image';
import Text from '../../components/lib/text';
import { UPLOAD_PROFILE_PICTURE } from '../../lib/mutations';
import FileUpload from '../../components/profileImageUpload';

let uploadUrl = "";

const Profile = () => {
  const [user, setUser] = useState(null); // Current User
  const [uploadFailure, setUploadFailure] =  useState(null); // Errors from uploading
  const [uploadProgress, setUploadProgress] = useState(0); // upload progress for picture
  const client = useApolloClient(); // Apollo State

  //This useEffect is used to get the current user for display
  useEffect(() => { 
    const fetchUser = async () => {
      const results = await handleLoggedIn(client);
      setUser(results.user);
    };

    fetchUser();
  }, []);

  // onCompleted is for the mutation that fetches the Upload URL
  const onCompleted = async data => {
    if (!data.uploadProfilePicture.error) {
      uploadUrl = data.uploadProfilePicture.url;
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
    file
  } = {}) => {
    if (!file) {
      return;
    }
    await uploadProfilePicture();
    setUploadProgress(25);
    const response = await fetch(
      uploadUrl, {
        method: 'PUT',
        body: file,
        credentials: 'include',
        headers: {
          'Content-Type': 'image/*'
        },
      },
    );
    setUploadProgress(50);

    if (response.status !== 200) {
      setUploadFailure("Error, image couldn't upload");
      console.log("Response is ", response);
    } else {
      setUploadProgress(100);
    }
  }

  const handleClick = e => {
    e.preventDefault();
    uploadProfilePicture();
  };

  return (
    <Layout>
      {user &&
        <FileUpload
          loading={uploadProgress}
          image={(<Image sx={{ borderRadius: "50% "}} source={user.photo} altText="Profile Picture" />)}
          onFileChange={handlePictureUpload}
        />
      }
      {uploadFailure && <Text type="error">{uploadFailure}</Text>}
    </Layout>
  );
};

export default Profile;