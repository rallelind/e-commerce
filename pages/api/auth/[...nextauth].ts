import { NextApiHandler } from "next";
import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import prisma from "../../../lib/prisma";

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

export default authHandler


const options = {
    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      })
    ],
    pages: {
      signIn: "/auth/signin"
    },
    callbacks: {
      async redirect({ url, baseUrl }) {
        // Allows relative callback URLs
        if (url.startsWith("/")) return `${baseUrl}${url}`
        // Allows callback URLs on the same origin
        else if (new URL(url).origin === baseUrl) return url
        return baseUrl
      },
    },
    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET,
  };
