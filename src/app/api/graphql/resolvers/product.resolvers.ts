import prisma from "@/lib/prisma";

const ProductResolvers = {
  Query: {
    products: async () => {
      try {
        const products = await prisma.product.findMany();
        return products;
      } catch (error: any) {
        console.log(error);
        throw new Error("Error getting products", error);
      }
    },
    product: async (_: any, { id }: { id: string }) => {
      try {
        const product = await prisma.product.findUnique({ where: { id } });
        if (!product) {
          throw new Error("No product found");
        }
        return product;
      } catch (error: any) {
        console.log(error);
        throw new Error("Error getting product", error);
      }
    },
  },
  // Mutation: {
  //   createProduct: (_, { input }) => {
  //     try {
  //       const product = prisma.product.create({ data: { ...input }});
  //       return product;
  //     } catch (error: any) {
  //       console.log(error);
  //       throw new Error(error);
  //     }
  //   },
  // },
};

export default ProductResolvers;
