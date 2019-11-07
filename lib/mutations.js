import gql from 'graphql-tag';

const LOG_ERROR = gql`
  mutation LogError(
    $message: String!,
    $location: String!,
    $status: String!
  ) {
    logError(
      message: $message,
      location: $location,
      status: $status
    )
  }
`;

const MARK_VISITOR = gql`
  mutation MarkVisitor($ipAddress: String!) {
    markVisitor (
      ipAddress: $ipAddress
    )
  }
`;

const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signInUser(
      email: $email,
      password: $password
    ) {
      token
      error {
        name
        message
      }
      user {
        name
        photo
        status
      }
    }
  }
`;

const CREATE_USER = gql`
  mutation Create(
    $name: String!,
    $email: String!,
    $password: String!
  ) {
    createUser(
      email: $email,
      name: $name,
      password: $password
    ) {
      token
      error {
        name
        message
      }
      user {
        name
        photo
        status
      }
    }
  }
`;

const UPLOAD_PROFILE_PICTURE = gql`
  mutation Upload ($file: String!) {
    uploadProfilePicture (file: $file) {
      success
      error {
        name
        message
      }
    }
  }
`;

module.exports = {
  LOG_ERROR,
  MARK_VISITOR,
  SIGN_IN,
  CREATE_USER,
  UPLOAD_PROFILE_PICTURE,
};