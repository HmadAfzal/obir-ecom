import prisma from "@/lib/prisma";
import { signupCredentials } from "@/types/signupCredentials";
import bcrypt from "bcryptjs";
const UserResolvers = {
  Query: {
    user: async (_: any, { id }: { id: string }) => {
      try {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
          throw new Error("No user found");
        }
        return user;
      } catch (error: any) {
        console.log(error);
        throw new Error("Error getting user", error);
      }
    },
  },

  Mutation: {
    createUser: async (_: any, { input }: { input: signupCredentials }) => {
      try {
        const { username, email, password } = input;
        if (!username || !email || !password) {
          throw new Error("Missing required query parameters");
        }

        const user = await prisma.user.findUnique({ where: { email } });
        const hashedPassword = await bcrypt.hash(password, 10);

        if (user) {
          throw new Error("User already exists with this email");
        } else {
          await prisma.user.create({
            data: {
              username,
              email,
              password: hashedPassword,
            },
          });
        }
        return { message: "User created successfully! Redircting to login" };
      } catch (error: any) {
        console.error(error);
        throw new Error("Error Creating user: " + error.message);
      }
    },
  },
};

export default UserResolvers;
