import { GET_PRODUCT } from "@/graphql/queries/product.query";
import { apolloClient } from "@/lib/apollo-client";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

export function useSingleProduct(productId: string | undefined) {
  return useQuery<{ product: Product }>({
    queryKey: ["product", productId],
    queryFn: async () => {
      if (!productId) {
        throw new Error("Product ID is required");
      }
      const { data } = await apolloClient.query({
        query: GET_PRODUCT,
        variables: { id: productId },
      });
      return data;
    },
    enabled: !!productId,
  });
}
