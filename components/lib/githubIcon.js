import styled from '@emotion/styled';
import { Box } from 'rebass';

const icons = [
  '../../static/GitHub-Mark-32px.png',
  '../../static/GitHub-Mark-64px.png',
  '../../static/GitHub-Mark-120px-plus.png'
];

const GithubIcon = styled(Box)`
  width: 24px;
  height: 24px;
  background-size: 24px 24px;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: url(${icons[0]});

  @media screen and (-webkit-min-device-pixel-ratio: 2) {
    background-image: url(${icons[1]});
  }

  @media screen and (-webkit-min-device-pixel-ratio: 3) {
    background-image: url(${icons[2]});
  }
`;

export default GithubIcon;