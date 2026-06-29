import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        process.env.GOOGLE_CLIENT_ID!,
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false;
      }

      const existingUser =
        await prisma.user.findUnique({
          where: {
            email: user.email,
          },
        });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: user.email,
            name: user.name,
            image: user.image,
          },
        });
      }

      return true;
    },

    async session({
      session,
    }) {
      if (session.user?.email) {
        const dbUser =
          await prisma.user.findUnique({
            where: {
              email:
                session.user.email,
            },
          });

        if (dbUser) {
          (
            session.user as {
              id?: string;
            }
          ).id = dbUser.id;
        }
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };