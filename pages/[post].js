import styled from "@emotion/styled";
import Layout from "../components/layout";

const Wrapper = styled.div`
  padding: 3rem;
  max-width: 750px;
  margin: 0 auto;

  @media (max-width: 750px) {
    width: 100%;
    padding: 1rem;
  }

  h1 {
    color: #222;
    font-weight: bold;
    font-size: 1.75rem;
    line-height: 35px;
    font-family: "PT Sans", sans-serif;
    text-transform: capitalize;
    margin: 0;
  }

  p {
    line-height: 28px;
    color: #666;
    font-family: "PT Sans", sans-serif;
  }
`;

const PostPage = ({ post }) => (
  <Layout>
    <Wrapper>
      <h1>
        {post.title}
      </h1>
      <p>
        {post.body}
      </p>
    </Wrapper>
  </Layout>
);

PostPage.propTypes = {
  post: PropTypes.object.isRequired
};

PostPage.getInitialProps = async ({ query }) => {
};

export default PostPage;