import styled from "@emotion/styled";
import Link from "./lib/link";
import { Flex } from "rebass";
import UserMenu from './lib/userMenuDropdown';

const Wrapper = styled(Flex)`
  border-bottom: 1px solid #ddd;
  height: 60px;
`;

const Nav = ({ user, handleLogout }) => (
  <Wrapper bg="khaki" flexWrap="nowrap" justifyContent="space-between">
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