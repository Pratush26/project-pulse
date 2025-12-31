import bcrypt from "bcryptjs"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { connectDB } from "./lib/connectDB"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    authorize: async (credentials) => {
      try {
        const db = await connectDB();
        const { email, password } = credentials;
        const user = await db.collection("users").findOne({ email });
        if (!user) throw new Error("No user found");
  
        const isPasswordValid = bcrypt.compare(password, user?.password);
        if (!isPasswordValid) throw new Error("Invalid password");
  
        return {
          _id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.photo,
        };
      } catch (err) {
        console.error("authentication error", err)
        return null;
      }
    }
  })],
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const db = await connectDB();
        const dbUser = await db.collection("users").findOne({ email: profile?.email });
        if (!dbUser) return "/register";
        user._id = dbUser._id.toString();
        user.email = dbUser.email;
        user.name = dbUser.name;
        user.role = dbUser.role;
        user.image = dbUser.photo;
        return true;
      }
      return true; // allow credentials login
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role ?? "user";
        token.image = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      session.user._id = token._id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.role = token.role;
      session.user.image = token.image;
      return session;
    },
  },
})