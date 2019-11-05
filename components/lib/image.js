import PropTypes from 'prop-types';
import { Box } from 'rebass';

const Image = ({source, altText, ...otherProps}) => (
  <Box {...otherProps}>
    <Box
      as="img"
      sx={{
        objectFit: "contain",
        width: "100%",
        height: "auto",
        borderRadius: "2px"
      }}
      src={source}
      alt={altText}
    />
  </Box>
);

Image.propTypes = {
  source : PropTypes.string.isRequired,
  altText : PropTypes.string.isRequired,
};

export default Image;