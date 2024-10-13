import { gql } from "graphql-tag";

const userTypedefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    verifyCode: String!
    verifyCodeExpiry: String!
    isVerified: Boolean!
    cart: [Product!]
  }

  type Query {
    user(id: ID!): User!
  }

  type Mutation {
    createUser(input: SignupInput!): message!
  }

  input SignupInput {
    username: String!
    email: String!
    password: String!
  }

  type message {
    message:String!
  }
`;

export default userTypedefs;
