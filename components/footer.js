import styled from "@emotion/styled";
import Text from './lib/text';
import Link from './lib/link';
import { Flex } from 'rebass';

const DEVELOPER_URL = "a3pfp2l25s5pnj3ogcmr";

const FooterWrapper = styled(Flex)`
  padding: 15px;
  background: #F5F5F5;
  justify-content: flex-start;
`

const Footer = () => (
  <FooterWrapper as="footer">
    <Text>Like what you see here? Check out my profile : </Text>
    <Link href={`/p/${DEVELOPER_URL}`}>John Bishop</Link>
  </FooterWrapper>
)

export default Footer;