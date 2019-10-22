import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Blog from "./blog";
import { Box, Flex } from "rebass";

export const FEED_QUERY = gql`
  {
    feed {
      links {
        id
      }
    }
  }
`;

export default function Feed () {

  const { loading, error, data } = useQuery(FEED_QUERY, {
    ssr: true
  });

  if (error) return <p>Error loading post, : {error}</p>;
  if (loading) return <div>Loading...</div>;

  const { feed: { links } } = data;
  return (
    <Flex as="section" flexDirection="column">
      {links.map((link, k) => (
        <Blog key={k} id={link.id} />
      ))}
    </Flex>
  );
};