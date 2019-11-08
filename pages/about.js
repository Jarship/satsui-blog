import { Flex } from 'rebass';
import Layout from '../components/layout';
import Icon from '../components/lib/icon';
import Text from '../components/lib/text';
import GithubIcon from '../components/lib/githubIcon';


const COMPLETED = [
  "Authorization",
  "User Profile Pictures",
  "User Profile URLs"
];

const IN_PROGRESS = [
  "About Page",
  `User Profile "About Me's"`
];

const PLANNED = [
  [
  "Password Reset",
  "Email Verification Link",
  "Settings Page"
  ],
  [
  "Administrator Page",
  "User Agreement",
  "Subscription Box"
  ]
];

const Section = ({ type, children }) => (
  <Flex width="30%" alignItems="center">
    <Icon width="40px" height="40px" type={type} />
    <Text ml={2}>{children}</Text>
  </Flex>
);




const About = () => (
  <Layout>
    <Flex height="100%" justifyContent="space-evenly" flexDirection="column" alignItems="center">
      <Text type="h2">About Sat Sui</Text>
      <Text type="h3" textAlign="center" width={[1, 0.9, 0.8]}>Sat Sui is latin for self-sufficient</Text>
      <Text width={[1, 0.9, 0.8]}>Satsui should be viewed more as a way of life. A group of
        self-responsible individuals that work towards shared, community resilience.
        It is all about recognizing the shared humanity and the shared struggle.
        This blog is mean to be a stepping-stone for the average person. Regardless
        of your political, economic, or environmental beliefs, we all share the fragility of
        living in a flawed system.<br/>
        Together, we can accept our personal responsibility, and build toward a 
        constructive, regenerative, and permanent future. <br/>If you would like to be
        a part of the movement, please read along. If you'd like to follow the development,
        please check below. <br/><strong>Thanks for visiting</strong></Text>
      <Flex alignItems="center" width={1} flexDirection="column">
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
      <Text type="h2">Development Progress</Text>
      <Text type="h3">Completed</Text>
      <Flex width={[1, 0.9, 0.8]} justifyContent="space-around">
        {COMPLETED.map(item => <Section type="completed">{item}</Section>)}
      </Flex>
      <Text type="h3">In Progress</Text>
      <Flex width={[1, 0.9, 0.8]} justifyContent="space-around">
        {IN_PROGRESS.map(item => <Section type="inProgress">{item}</Section>)}
      </Flex>
      <Text type="h3">Planned</Text>
      {PLANNED.map(group => (
        <Flex width={[1, 0.9, 0.8]} justifyContent="space-around">
          {group.map(item => <Section type="planned">{item}</Section>)}
        </Flex>
      ))}
    </Flex>
  </Layout>
);


export default About;