import gql from 'graphql-tag';

const GET_USER = gql`
  query {
    getUser {
      name
      status
      photo
      url
      error {
        name
        message
      }
    }
  }
`;

const BLOG_QUERY = gql`
  query BlogQuery ($id: ID!) {
    blog(id: $id) {
      title
      post
      author {
        name
        id
      }
    }
  }
`;

const FEED_QUERY = gql`
  query {
    feed {
      blogs {
        id
      }
    }
  }
`;

module.exports = {
  GET_USER,
  BLOG_QUERY,
  FEED_QUERY,
};