import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Box } from 'rebass';
import { variant } from 'styled-system';

const Wrapper = styled(Box)(variant({ scale: "images" }));

Wrapper.defaultProps = {
  variant: "regular"
};

const Image = ({source, altText, ...otherProps}) => (
  <Wrapper {...otherProps}>
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
  </Wrapper>
);

Image.propTypes = {
  source : PropTypes.string.isRequired,
  altText : PropTypes.string.isRequired,
};

export default Image;