import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import type { NextAuthOptions } from "next-auth"
import type { Session } from "next-auth"
import type { JWT } from "next-auth/jwt"

// Zod schema for input validation
const credentialsSchema = z.object({
    phone: z.string().min(10).max(15).regex(/^\d+$/, "Phone must contain only digits"),
    password: z.string().min(6, "Password must be at least 6 characters")
});

export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
            password: { label: "Password", type: "password", required: true }
          },
          async authorize(credentials) {
            // Validate input with zod
            if (!credentials?.phone || !credentials?.password) {
                return null;
            }

            const validationResult = credentialsSchema.safeParse({
                phone: credentials.phone,
                password: credentials.password
            });

            if (!validationResult.success) {
                return null;
            }

            const { phone, password } = validationResult.data;

            const existingUser = await db.user.findFirst({
                where: {
                    number: phone
                }
            });

            if (existingUser) {
                // Only compare password, don't hash on every login
                const passwordValidation = await bcrypt.compare(password, existingUser.password);
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.number
                    }
                }
                return null;
            }

            // Only hash password when creating new user
            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = await db.user.create({
                    data: {
                        number: phone,
                        password: hashedPassword
                    }
                });
            
                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.number
                }
            } catch(e) {
                console.error(e);
                return null;
            }
          },
        })
    ],
    // Security: Use NEXTAUTH_SECRET (NextAuth default) or fallback to JWT_SECRET
    secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET || (() => {
        if (process.env.NODE_ENV === 'production') {
            throw new Error('NEXTAUTH_SECRET or JWT_SECRET environment variable is required in production');
        }
        console.warn('⚠️  WARNING: Using default secret. This is insecure and should only be used in development.');
        return "secret";
    })(),
    callbacks: {
        async session({ token, session }: { token: JWT; session: Session }): Promise<Session> {
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }
            return session;
        }
    }
  }
  