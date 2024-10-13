import { CREATE_USER } from "@/graphql/mutations/user.mutations.";
import { apolloClient } from "@/lib/apollo-client";
import { signupCredentials } from "@/types/signupCredentials";
import { useMutation } from "@tanstack/react-query";

export function useCreateUser() {
  return useMutation({
    mutationFn: async (SignupInput: signupCredentials) => {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_USER,
        variables: { SignupInput },
      });
      return data;
    },
  });
}
