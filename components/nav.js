import styled from "@emotion/styled";
import { variant } from 'styled-system';
import Link from "./lib/link";
import { Flex } from "rebass";
import UserMenu from './lib/userMenuDropdown';

const Wrapper = styled(Flex)(
  () => `
  `,
  variant({ scale: "headers" })
);

const Nav = ({ user, handleLogout }) => (
  <Wrapper variant="primary">
    <Flex>
      <Link variant="menuLink" href="/">Home</Link>
      <Link variant="menuLink" href="/about">About</Link>
      <Link variant="menuLink" href="/contact">Contact</Link>
    </Flex>
    {user
    ? <UserMenu user={user} logout={handleLogout} />
    : <Flex justifyContent="flex-end"><Link px={4} variant="menuLink" href="/login">Login/Signup</Link></Flex>
    }
  </Wrapper>
);

export default Nav;