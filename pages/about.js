import { Flex } from 'rebass';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import Icon from '../components/lib/icon';
import Text from '../components/lib/text';
import GithubIcon from '../components/lib/githubIcon';


const COMPLETED = [
  'Authorization',
  'User Profile Pictures',
  'Unique Profile URLs',
  'Basic About Page',
  'Linting Fullstack',
];

const IN_PROGRESS = [
  'User Profile "About Me\'s"',
  'Password Reset',
];

const PLANNED = [
  'Email Verification Link',
  'Settings Page',
  'Administrator Page',
  'User Agreement',
  'Subscription Box',
  'PWA Dialog Box',
];

const Section = ({ type, children, ...otherProps }) => (
  <Flex {...otherProps} width="210px" my={[1, 2, 2, 3]} alignItems="center">
    <Icon width="40px" height="40px" type={type} />
    <Text width="calc(100% - 41px)" ml={[1, 1, 2, 3]}>{children}</Text>
  </Flex>
);

Section.propTypes = {
  type: PropTypes.string.isRequired,
};


const About = () => (
  <Layout>
    <Flex height="100%" justifyContent="space-evenly" flexDirection="column" alignItems="center">
      <Text type="h2">About Sat Sui</Text>
      <Text type="h3" textAlign="center" width={[1, 0.9, 0.8]}>
        Sat Sui is Latin for
        <em>self-sufficient</em>
      </Text>
      <Text width={[1, 0.9, 0.8]}>
        &emsp;Sat Sui is a philosophy, a way of looking at life. The principles shared
        here are endlessly applicable. Gaining a sense of your self requires shedding
        outside thoughts, recognizing what you know for yourself, and embracing our
        shared humanity and shared struggle. This blog is meant to be a stepping-stone
        for the working person. Regardless of your political, economic, or environmental
        beliefs, we are all reliant upon a fragile and flawed system. Outside narratives
        are paraded and emphasized to separate what you are exposed to, isolate you socially,
        degrade your self-esteem relentlessly refocus your attention on unfulfilling aims.
        <br />
        <strong>Welcome</strong>
        <br />
        Together, we can recognize our personal responsibility, reveal our path, and build
        towards a constructive, regenerative, and permanent future.
      </Text>
      <Flex alignItems="center" width={1} flexDirection="column">
        <Text mt={4}>
          If you would like to be a part of the movement, please read along.
          <br />
          If you&apos;d like to follow the development,
          please check below.
          <br />
          <strong>Thanks for visiting</strong>
        </Text>
        <Text type="h2">Repositories</Text>
        <Flex width={0.8} justifyContent="space-evenly">
          <Text type="h3">Blog</Text>
          <Text type="h3">API</Text>
        </Flex>
        <Flex width={0.8} justifyContent="space-evenly">
          <Flex as="a" href="http://github.com/Jarship/satsui-blog"><GithubIcon /></Flex>
          <Flex as="a" href="http://github.com/Jarship/graphql-blog"><GithubIcon /></Flex>
        </Flex>
      </Flex>
      <Text textAlign="center" type="h2">Development Progress</Text>
      <Text type="h3">Completed</Text>
      <Flex width={[1, 0.9, 0.8]} flexWrap="wrap" justifyContent="space-evenly">
        {COMPLETED.map((item, key) => <Section key={`a${key}`} type="completed">{item}</Section>)}
      </Flex>
      <Text type="h3">In Progress</Text>
      <Flex width={[1, 0.9, 0.8]} flexWrap="wrap" justifyContent="space-evenly">
        {IN_PROGRESS.map((item, key) => <Section key={`b${key}`} type="inProgress">{item}</Section>)}
      </Flex>
      <Text type="h3">Planned</Text>
      <Flex width={[1, 0.9, 0.8]} justifyContent="space-evenly" flexWrap="wrap">
        {PLANNED.map((item, key) => <Section key={`c${key}`} type="planned">{item}</Section>)}
      </Flex>
    </Flex>
  </Layout>
);


export default About;
