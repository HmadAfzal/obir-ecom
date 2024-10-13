import prisma from "@/lib/prisma";
import { CartInput, UpdateCartItemInput } from "@/types/cartInput";

const CartResolvers = {
  Query: {
    getCart: async (_: any, { userId }: { userId: string }) => {
      try {
        const cartItems = await prisma.cartItem.findMany({
          where: { userId },
          include: { product: true },
        });

        const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

        return {
          items: cartItems,
          totalQuantity,
        };
      } catch (error: any) {
        console.log('Error fetching cart: ', error);
        throw new Error(`Error fetching cart: ${error.message}`);
      }
    },
  },
  Mutation: {
    addToCart: async (_: any, { input }: { input: CartInput }) => {
      try {
        const { userId, productId } = input;
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
          throw new Error("User not found");
        }
        const product = await prisma.product.findUnique({
          where: { id: productId },
        });
        if (!product) {
          throw new Error("Product not found");
        }
    
        const cartItem = await prisma.cartItem.upsert({
          where: {
            userId_productId: {
              userId: user.id,
              productId: product.id,
            },
          },
          update: {
            quantity: {
              increment: 1,
            },
          },
          create: {
            quantity: 1,
            userId: user.id,
            productId: product.id,
          },
        });
    
        const updatedCart = await prisma.cartItem.findMany({
          where: { userId: user.id },
          include: { product: true },
        });
    
        const totalQuantity = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
    
        return {
          message: "Item added to cart successfully",
          cart: {
            items: updatedCart,
            totalQuantity,
          },
        };
      } catch (error: any) {
        console.log('Error adding item to cart: ', error);
        return {
          message: `Error adding item to cart: ${error.message}`,
          cart: null,
        };
      }
    },
    updateCartItem: async (_: any, { input }: { input: UpdateCartItemInput }) => {
      try {
        const { userId, productId, action } = input;
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
          throw new Error("User not found");
        }
        const product = await prisma.product.findUnique({
          where: { id: productId },
        });
        if (!product) {
          throw new Error("Product not found");
        }

        const cartItem = await prisma.cartItem.findUnique({
          where: {
            userId_productId: {
              userId: user.id,
              productId: product.id,
            },
          },
        });

        if (!cartItem) {
          throw new Error("Cart item not found");
        }

        const updatedCartItem = await prisma.cartItem.update({
          where: {
            userId_productId: {
              userId: user.id,
              productId: product.id,
            },
          },
          data: {
            quantity: {
              increment: action === 'INCREMENT' ? 1 : -1,
            },
          },
        });

        if (updatedCartItem.quantity <= 0) {
          await prisma.cartItem.delete({
            where: {
              userId_productId: {
                userId: user.id,
                productId: product.id,
              },
            },
          });
        }

        const updatedCart = await prisma.cartItem.findMany({
          where: { userId: user.id },
          include: { product: true },
        });

        const totalQuantity = updatedCart.reduce((sum, item) => sum + item.quantity, 0);

        return {
          message: `Cart item ${action === 'INCREMENT' ? 'incremented' : 'decremented'} successfully`,
          cart: {
            items: updatedCart,
            totalQuantity,
          },
        };
      } catch (error: any) {
        console.log('Error updating cart item: ', error);
        return {
          message: `Error updating cart item: ${error.message}`,
          cart: null,
        };
      }
    },
    removeFromCart: async (_: any, { input }: { input: CartInput }) => {
      try {
        const { userId, productId } = input;
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
          throw new Error("User not found");
        }
        const product = await prisma.product.findUnique({
          where: { id: productId },
        });
        if (!product) {
          throw new Error("Product not found");
        }

        await prisma.cartItem.delete({
          where: {
            userId_productId: {
              userId: user.id,
              productId: product.id,
            },
          },
        });

        const updatedCart = await prisma.cartItem.findMany({
          where: { userId: user.id },
          include: { product: true },
        });

        const totalQuantity = updatedCart.reduce((sum, item) => sum + item.quantity, 0);

        return {
          message: "Item removed from cart successfully",
          cart: {
            items: updatedCart,
            totalQuantity,
          },
        };
      } catch (error: any) {
        console.log('Error removing item from cart: ', error);
        return {
          message: `Error removing item from cart: ${error.message}`,
          cart: null,
        };
      }
    },
  },
};

export default CartResolvers;