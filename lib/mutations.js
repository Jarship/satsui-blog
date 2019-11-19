import gql from 'graphql-tag';

export const LOG_ERROR = gql`
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

export const MARK_VISITOR = gql`
  mutation MarkVisitor($ipAddress: String!) {
    markVisitor (
      ipAddress: $ipAddress
    )
  }
`;

export const SIGN_IN = gql`
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

export const CREATE_USER = gql`
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

export const UPLOAD_PROFILE_PICTURE = gql`
  mutation Upload ($picture: Upload!) {
    uploadProfilePicture (picture: $picture) {
      photoUrl
      error {
        name
        message
      }
    }
  }
`;
