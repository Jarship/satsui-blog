import PropTypes from "prop-types";
import Layout from '../components/layout';
//import Post from '../components/post';
import Link from "next/link";

const IndexPage = ({ posts }) => (
  <Layout>
    <ul>
      {/* {posts.map(p => (
        <Post key={p.title} post={p} />
      ))} */}
      <p>This is the index page</p>
      <Link href="/new_post">
        <a>
          Make a new post!
        </a>
      </Link>
    </ul>
  </Layout>
);

IndexPage.propTypes = {
  posts: PropTypes.array
};

IndexPage.getInitialProps = async ({ req }) => {
  // const res = await getPosts();
  // console.log("Posts retrieved.");
  // return { posts: json };
};

export default IndexPage;