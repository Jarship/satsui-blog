import { useQuery } from "@apollo/react-hooks";
import { BLOG_QUERY } from "../lib/queries";
import { Box, Flex } from "rebass";

export default function Blog ({ id }) {
  const { loading, error, data} = useQuery(
    BLOG_QUERY,
    {
      variables: { id },
      ssr: true,
    }
  );

  if (error) return <p>Error loading posts, : {error}</p>;
  if (loading) return <div>Loading...</div>;

  const { blog: { title, post, author: { id: authorID, name }}} = data;
  return (
    <Flex as="article" flexDirection="column" m="8px">
      <Box as="h2">
        {title}
      </Box>
      <Box as="p">
        {post}
      </Box>
      {postedBy &&
        <Box as="p">
          Written by: {name}
        </Box>
      }
    </Flex>
  );
};