import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./app/lib/mongodb-client";
import Google from "next-auth/providers/google";
import NextAuth from "next-auth";
import Facebook from "next-auth/providers/facebook";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
  session: { strategy: "jwt" },
  debug: true,
  adapter: MongoDBAdapter(clientPromise),
  providers: [Google, Facebook],
  callbacks: {
    async signIn({ user }) {
      const client = await clientPromise;
      const db = client.db();

      const profile = await db.collection("profiles").findOne({
        email: user.email,
      });

      if (!profile) {
        await db.collection("profiles").insertOne({
          email: user.email,
        });
      }

      return true;
    },
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});
