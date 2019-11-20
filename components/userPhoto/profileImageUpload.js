import PropTypes from 'prop-types';
import { Flex } from 'rebass';
import styled from '@emotion/styled';
import Text from '../lib/text';
import Progress from '../lib/progress';
import Field from '../lib/field';

const FileWrapper = styled(Flex)(
  ({
    theme: {
      images: {
        profile: {
          width,
        },
      },
    },
  }) => ({
    position: 'relative',
    width,
    flexDirection: 'column',
  }),
  {
    label: 'ui--file-upload',
  },
);

const FileInput = styled(Field)(
  {
    label: 'ui--file-input',
  },
  {
    position: 'absolute',
    bottom: 0,
    left: 'auto',
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    opacity: 0,
  },
);

const FileUpload = ({
  image, loading, onFileChange, ...other
}) => {
  const handleChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (!file) return;

    reader.addEventListener(
      'load',
      () => onFileChange({
        event,
        file,
        local: reader.result,
      }),
      false,
    );

    reader.readAsDataURL(file);
  };

  return (
    <FileWrapper {...other}>
      <FileInput type="file" onChange={(e) => handleChange(e)} />
      {image}
      <>
        <Text
          bg="oldSilver"
          color="oldRose"
        >
          { loading ? 'Uploading...' : 'Upload or Click to set a new profile picture'}
        </Text>
        <Progress amount={loading} />
      </>
    </FileWrapper>
  );
};

FileUpload.defaultProps = {
  loading: 0,
  onFileChange: () => {},
};

FileUpload.propTypes = {
  image: PropTypes.shape({
    type: PropTypes.func.isRequired,
  }).isRequired,
  loading: PropTypes.number,
  onFileChange: PropTypes.func,
};

export default FileUpload;
