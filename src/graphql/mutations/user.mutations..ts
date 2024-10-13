import gql from "graphql-tag";

export const CREATE_USER = gql`
  mutation createUser($Signupinput: SignupInput!) {
    createUser(input: $Signupinput) {
      message
    }
  }
`;
