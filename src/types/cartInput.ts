export type CartInput ={
    userId: string
    productId: string
  }

  export interface UpdateCartItemInput extends CartInput {
    action: 'INCREMENT' | 'DECREMENT';
  }