import gql from "graphql-tag";

export const GET_CART = gql`
  query GetCart($userId: ID!) {
    getCart(userId: $userId) {
      items {
        id
        quantity
        product {
          id
          name
          price
          image
        }
      }
      totalQuantity
    }
  }
`;
