import { useQuery } from '@apollo/react-hooks';
import { Box, Flex } from 'rebass';
import PropTypes from 'prop-types';
import { BLOG_QUERY } from '../lib/queries';

const Blog = ({ id }) => {
  const { loading, error, data } = useQuery(
    BLOG_QUERY,
    {
      variables: { id },
      ssr: true,
    },
  );

  if (error) {
    return (
      <p>
Error loading posts, :
        {error}
      </p>
    );
  }
  if (loading) return <div>Loading...</div>;

  const { blog: { title, post, author: { id: authorID, name } } } = data;
  return (
    <Flex as="article" flexDirection="column" m="8px">
      <Box as="h2">
        {title}
      </Box>
      <Box as="p">
        {post}
      </Box>
      {authorID
        && (
        <Box as="p">
          Written by:
          {' '}
          {name}
        </Box>
        )}
    </Flex>
  );
};

Blog.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Blog;
