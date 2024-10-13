import { useQuery } from "@tanstack/react-query";
import { GET_PRODUCTS } from "@/graphql/queries/product.query";
import { Product } from "@/types/product";
import { apolloClient } from "@/lib/apollo-client";

export function useProducts() {
  return useQuery<{products:Product[]}>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await apolloClient.query({
        query: GET_PRODUCTS,
      });
      return data;
    },
  });
}
