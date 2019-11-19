import styled from '@emotion/styled';
import { variant } from 'styled-system';
import { Flex } from 'rebass';
import PropTypes from 'prop-types';
import Link from './lib/link';
import UserMenu from './lib/userMenuDropdown';

const Wrapper = styled(Flex)(
  () => `
  `,
  variant({ scale: 'headers' }),
);

const Nav = ({ user, handleLogout }) => (
  <Wrapper variant="primary">
    <Flex>
      <Link textType="menuButton" variant="menuLink" href="/">Home</Link>
      <Link textType="menuButton" variant="menuLink" href="/about">About</Link>
      <Link textType="menuButton" variant="menuLink" href="/contact">Contact</Link>
    </Flex>
    {user
      ? <UserMenu user={user} logout={handleLogout} />
      : <Flex justifyContent="flex-end"><Link textType="menuButton" px={4} variant="menuLink" href="/login">Login/Signup</Link></Flex>}
  </Wrapper>
);

Nav.defaultProps = {
  user: null,
  handleLogout: () => {},
};

Nav.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    error: PropTypes.shape({
      name: PropTypes.string,
      message: PropTypes.string,
    }),
  }),
  handleLogout: PropTypes.func,
};

export default Nav;
