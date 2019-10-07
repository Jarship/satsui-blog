import { getPosts } from 'api/posts';
import { Link } from 'routes';
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

IndexPage.getInitialprops = async ({ req }) => {
  const res = await getPosts();
  const json = await res.json();
  return { posts: json };
};

export default IndexPage;