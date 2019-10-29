import PropTypes from "prop-types"
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Layout from '../components/layout';
import Feed from '../components/feed';
import checkLoggedIn from "../lib/checkLoggedIn";

const IndexPage = ({ loggedInUser }) => {

  return (
    <Layout>
      {/* <Feed /> */}
      Content Here
      Lots of content
    </Layout>
  );
};

IndexPage.propTypes = {
  loggedInUser: PropTypes.object
};

IndexPage.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);
  return { loggedInUser };
};

export default IndexPage;