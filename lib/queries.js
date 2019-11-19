import gql from 'graphql-tag';

export const GET_USER = gql`
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

export const PROFILE_QUERY = gql`
  query Profile ($url: String!) {
    profile(url: $url) {
      name
      photo
      description
      posts {
        title
      }
    }
  }
`;

export const BLOG_QUERY = gql`
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

export const FEED_QUERY = gql`
  query {
    feed {
      blogs {
        id
      }
    }
  }
`;

export default {
  GET_USER,
  PROFILE_QUERY,
  BLOG_QUERY,
  FEED_QUERY,
};
