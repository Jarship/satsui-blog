import { useMutation } from '@apollo/react-hooks';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Image from '../lib/image';
import { UPLOAD_PROFILE_PICTURE } from '../../lib/mutations';
import FileUpload from './profileImageUpload';

const UploadHandler = ({ photo, setUploadFailure }) => {
  const [uploadProgress, setUploadProgress] = useState(0); // upload progress for picture
  const [profilePicture, setProfilePicture] = useState(<Image variant="profile" source={photo} altText="Profile Picture" />);

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
    <>
      <FileUpload
        loading={uploadProgress}
        image={profilePicture}
        onFileChange={handlePictureUpload}
      />
    </>
  );
};

UploadHandler.propTypes = {
  photo: PropTypes.string.isRequired,
  setUploadFailure: PropTypes.func.isRequired,
};

export default UploadHandler;
