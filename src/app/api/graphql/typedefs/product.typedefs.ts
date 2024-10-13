import { gql } from "graphql-tag";

const productTypeDefs = gql`
  scalar DateTime

  type Query {
    products: [Product!]
    product(id: ID!): Product!
  }

  type Product {
    id: ID!
    createdAt: DateTime
    updatedAt: DateTime
    category: String!
    name: String!
    description: String!
    price: String!
    image: String!
  }

  type Mutation {
  createProduct(input: ProductInput!): Product!
}

  input ProductInput {
    category: String!
    name: String!
    description: String!
    price: String!
    image: String!
  }
`;

export default productTypeDefs;
