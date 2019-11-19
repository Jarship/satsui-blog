import styled from '@emotion/styled';
import { Flex } from 'rebass';
import Text from './lib/text';
import Link from './lib/link';
import GithubIcon from './lib/githubIcon';

const DEVELOPER_URL = 'a3pfp2l25s5pnj3ogcmr';

const FooterWrapper = styled(Flex)`
  padding: 15px;
  background: #F5F5F5;
  justify-content: center;
  align-items: center;
`;

const Footer = () => (
  <FooterWrapper as="footer">
    <Text>Like what you see here? Check out my profile : </Text>
    <Link mx={3} href={`/p/${DEVELOPER_URL}`}>John Bishop</Link>
    <a href="http://www.github.com/Jarship">
      <GithubIcon />
    </a>
  </FooterWrapper>
);

export default Footer;
