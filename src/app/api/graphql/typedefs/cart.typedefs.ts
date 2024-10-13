import gql from "graphql-tag";

const cartTypeDefs = gql`
  type CartItem {
    id: ID!
    quantity: Int!
    user: User!
    userId: String!
    product: Product!
    productId: String!
  }

  type Cart {
    items: [CartItem!]!
    totalQuantity: Int!
  }

  type Query {
    getCart(userId: ID!): Cart!
  }

  input CartInput {
    userId: ID!
    productId: ID!
  }

  input UpdateCartItemInput {
    userId: ID!
    productId: ID!
    action: CartItemAction!
  }

  enum CartItemAction {
    INCREMENT
    DECREMENT
  }

  type Mutation {
    addToCart(input: CartInput!): CartUpdateResponse!
    updateCartItem(input: UpdateCartItemInput!): CartUpdateResponse!
    removeFromCart(input: CartInput!): CartUpdateResponse!
  }

  type CartUpdateResponse {
    cart: Cart
    message: String!
  }
`;

export default cartTypeDefs;