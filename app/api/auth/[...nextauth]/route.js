import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {User} from './../../../../models/User'
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/utils/MongoConnect";

export const authOptions={
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          name:'email',
          placeholder: "test@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          name:'password',
        },
      },
      async authorize(credentials, req) {
        // const {email, password}=credentials;
        const email = credentials?.email;
        const password = credentials?.password;

        mongoose.connect(process.env.MONGO_URL);
        const user = await User.findOne({ email });
        const passwordOk = user && bcrypt.compareSync(password, user.password);

        console.log(passwordOk);

        if (passwordOk) {
          return user;
        }

        return null;
      },
    }),
  ],
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
