import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import type { NextAuthOptions } from "next-auth"
import type { Session } from "next-auth"
import type { JWT } from "next-auth/jwt"
import { NextResponse } from "next/server";

const credentialsSchema = z.object({
    phone: z.string().min(10).max(15).regex(/^\d+$/, "Phone must contain only digits"),
    password: z.string().min(1, "Password is required")
});

const signupPasswordSchema = z.string().min(6, "Password must be at least 6 characters");

export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
            password: { label: "Password", type: "password", required: true }
          },
          async authorize(credentials) {
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
            if (!phone) {
                return null;
            }

            let existingUser;
            try {
                existingUser = await db.user.findFirst({
                    where: {
                        number: phone
                    }
                });
            } catch (e) {
                console.error("Error finding user during auth:", e);
                return null;
            }

            if (existingUser) {
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

            const passwordStrength = signupPasswordSchema.safeParse(password);
            if (!passwordStrength.success) {
                return null;
            }

            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = await db.user.create({
                    data: {
                        number: phone,
                        password: hashedPassword,
                        Balance: {
                            create: {
                                amount: 0,
                                locked: 0
                            }
                        }
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
    secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
            }
            return token;
        },
        async session({ token, session }: { token: JWT; session: Session }): Promise<Session> {
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            if (process.env.NODE_ENV === 'production') {
                if (url.startsWith("/")) return `${baseUrl}${url}`
                else if (new URL(url).origin === baseUrl) return url
                return baseUrl
            }

            const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
            
            let siteUrl = process.env.NEXTAUTH_URL || 'http://localhost:3001';
            
            if (url.startsWith("/")) {
                return `${siteUrl}${url}`;
            }
            
            try {
                const urlObj = new URL(url);
                
                if (urlObj.hostname === 'localhost') {
                    const pathAndQuery = `${urlObj.pathname}${urlObj.search}`;
                    return `http://localhost:3001${pathAndQuery}`;
                }
                
                return url;
            } catch (e) {
            }
            
            return `${siteUrl}/dashboard`;
        }
    }
  }