import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Box, Flex } from "rebass";

export const LINK_QUERY = gql`
  query LinkQuery($id: ID!) {
    link(id: $id) {
      id
      description
      url
      postedBy {
        name
        id
      }
    }
  }
`;

export default function Blog ({ id }) {
  const { loading, error, data} = useQuery(
    LINK_QUERY,
    {
      variables: { id },
      ssr: true,
    }
  );

  if (error) return <p>Error loading posts, : {error}</p>;
  if (loading) return <div>Loading...</div>;

  const { link: { url, description, postedBy} } = data;
  return (
    <Flex as="article" flexDirection="column" m="8px">
      <Box as="h2">
        {url}
      </Box>
      <Box as="p">
        {description}
      </Box>
      {postedBy &&
        <Box as="p">
          Shared by: {postedBy.name}
        </Box>
      }
    </Flex>
  );
};