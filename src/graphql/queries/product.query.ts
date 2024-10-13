import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query products {
    products {
      id
      category
      name
      price
      image
    }
  }
`;

export const GET_PRODUCT = gql`
  query products($id: ID!) {
    product(id: $id) {
      id
      category
      name
      description
      price
      image
    }
  }
`;
