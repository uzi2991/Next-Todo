import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectToDB from '../../../src/lib/db';
import { Db } from 'mongodb';
import LoginValidation from '../../../src/validations/login';
import { formatError } from '../../../src/validations/index';
import bcrypt from 'bcryptjs';

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        username: {
          type: 'text'
        },
        password: {
          type: 'password'
        }
      },
      async authorize(credentials) {
        const username = credentials?.username || '';
        const password = credentials?.password || '';

        try {
          LoginValidation.validate({
            username,
            password
          });
        } catch (err) {
          throw new Error(formatError(err));
        }

        let db: Db;
        try {
          db = await connectToDB();
        } catch (err) {
          throw new Error('Database error, try again later');
        }

        const user = await db.collection('users').findOne({ username });
        if (!user) {
          throw new Error('Username does not exist');
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
          throw new Error('Incorrect Password');
        }

        return { username: user.username };
      }
    })
  ],
  session: {
    maxAge: 30 * 24 * 60 * 60
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user as { username: string };
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    }
  }
});
