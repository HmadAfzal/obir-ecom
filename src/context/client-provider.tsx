'use client'
import { apolloClient } from "@/lib/apollo-client";
import { ApolloProvider } from "@apollo/client";

function ClientProvider( {children }:{ children: React.ReactNode}) {
  return (
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
  );
}

export default ClientProvider;