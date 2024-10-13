import { mergeResolvers } from "@graphql-tools/merge";
import ProductResolvers from "./product.resolvers";
import UserResolvers from "./user.resolvers";
import CartResolvers from "./cart.resolvers";

const mergedResolvers=mergeResolvers([ProductResolvers,UserResolvers, CartResolvers])

export default mergedResolvers