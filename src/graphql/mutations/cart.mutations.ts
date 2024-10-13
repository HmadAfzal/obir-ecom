import gql from "graphql-tag";

export const ADD_TO_CART = gql`
  mutation addToCart($input: CartInput!) {
    addToCart(input: $input) {
      message
      cart {
        totalQuantity
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
      }
    }
  }
`;



export const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($input: UpdateCartItemInput!) {
    updateCartItem(input: $input) {
      message
      cart {
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
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($input: CartInput!) {
    removeFromCart(input: $input) {
      message
      cart {
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
  }
`;