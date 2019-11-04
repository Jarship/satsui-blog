import PropTypes from "prop-types"
import Layout from '../components/layout';
// import Feed from '../components/feed';
import { handleVisitor } from "../lib/markVisitor";

const IndexPage = ({ user }) => {

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
  await handleVisitor(context);
  return;
};

export default IndexPage;