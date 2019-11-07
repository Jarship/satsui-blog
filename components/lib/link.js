import Link from 'next/link';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { variant } from 'styled-system';
import { Flex } from 'rebass';
import PropTypes from 'prop-types';
import Text from './text';

const LinkWrapper = styled(Flex)(
  () => css`
    a {
      text-decoration: none;
    }
    a:visited {
      text-decoration: none;
    }
  `,
  variant({ scale: "linkStyles" }),
  {
    label: "common--link"
  }
);

LinkWrapper.defaultProps = {
  variant: "common"
}

const StyledLink = ({ href, as = null, children, ...otherProps }) => (
  <LinkWrapper {...otherProps}>
    <Link href={href} as={as}>
      <a>
        <Text type="menuButton" width={1} height={1}>
          {children}
        </Text>
      </a>
    </Link>
  </LinkWrapper>
);

StyledLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
};

export default StyledLink;