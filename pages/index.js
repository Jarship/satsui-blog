import { getPosts } from '../api/posts'
import PropTypes from "prop-types";
import Layout from '../components/layout';
import Post from '../components/post';

const IndexPage = ({ posts }) => (
  <Layout>
    <ul>
      {posts.map(p => (
        <Post key={p.title} post={p} />
      ))}
    </ul>
  </Layout>
);

IndexPage.propTypes = {
  posts: PropTypes.array
};

IndexPage.getInitialProps = async ({ req }) => {
  const res = await getPosts();
  const json = await res.json();
  console.log("Posts retrieved.");
  return { posts: json };
};

export default IndexPage;