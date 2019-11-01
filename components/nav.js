import styled from "@emotion/styled";
import Link from "next/link";

const Wrapper = styled.div`
  padding: 15px;
  border-bottom: 1px solid #ddd;
  display: flex;
  background: #387EF5;
  a {
    padding: 0 15px;
    color: #FFF;
  }
`;

const Nav = ({ user, handleLogout }) => (
  <Wrapper>
    <Link href="/"><a>Home</a></Link>
    <Link href="/about"><a>About</a></Link>
    <Link href="/contact"><a>Contact</a></Link>
    {user
    ? <button onClick={handleLogout} >Sign Out</button>
    : <Link href="/login"><a>Login/Signup</a></Link>}
  </Wrapper>
);

export default Nav;