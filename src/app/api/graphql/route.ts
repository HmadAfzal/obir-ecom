import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import mergedTypedefs from "./typedefs";
import mergedResolvers from "./resolvers";

const server = new ApolloServer({
  typeDefs: mergedTypedefs,
  resolvers: mergedResolvers,
});

const handler = startServerAndCreateNextHandler(server);

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
