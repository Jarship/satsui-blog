import PropTypes from "prop-types";
import { Box } from 'rebass';
import styled from '@emotion/styled';
import Text from './lib/text';
import Progress from './lib/progress';
import Field from "./lib/field";

const FileWrapper = styled(Box)(
  ({
    theme: {
      profilePicture: {
        width, height
      }
    }
  }) => ({
    position: "relative",
    width,
    height
  }),
  {
    label: "ui--file-upload"
  }
);

const FileInput = styled(Field)(
  {
    label: "ui--file-input"
  },
  {
    position: "absolute",
    bottom: 0,
    left: "auto",
    width: "100%",
    height: "100%",
    cursor: "pointer",
    //display: "none"
  }
);

const FileUpload = ({ image, loading, onFileChange, ...other }) => {
  const handleChange = event => {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (!file) return;

    reader.addEventListener(
      "load",
      () =>
        onFileChange({
          event,
          file,
          local: reader.result
        }),
        false
    );

    reader.readAsDataURL(file);
  };

  return (
    <FileWrapper {...other}>
      <FileInput type="file" onChange={e => handleChange(e)} />
      {image}
      {loading ? (
        <>
          <Text 
            sx={{ 
              position: "absolute",
              bottom: "32px",
              left: "25%"
            }}
            bg="oldSilver"
            color="oldRose"
          >
            Uploading...
          </Text>
          <Progress amount={loading} />
        </>
      ) : (
        <>
          <Text 
            sx={{ 
              position: "absolute",
              bottom: "32px",
              left: "25%"
            }}
            bg="oldSilver"
            color="oldRose"
          >
            New Profile Picture
          </Text>
        </>
      )}
    </FileWrapper>
  );
};

FileUpload.propTypes = {
  image: PropTypes.object.isRequired,
  loading: PropTypes.any,
  onFileChange: PropTypes.func
}

export default FileUpload;