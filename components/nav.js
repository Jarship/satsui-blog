import styled from "@emotion/styled";
import Link from "next/link";

const Wrapper = styled.nav`
  padding: 15px;
  border-bottom: 1px solid #ddd;
  display: flex;
  background: #387EF5;
  a {
    padding: 0 15px;
    color: #FFF;
  }
`;

const Nav = () => (
  <Wrapper>
    <Link href="/"><a>Home</a></Link>
    <Link href="/about"><a>About</a></Link>
    <Link href="/contact"><a>Contact</a></Link>
  </Wrapper>
);

export default Nav;