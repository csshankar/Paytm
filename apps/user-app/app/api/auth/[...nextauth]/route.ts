import NextAuth from "next-auth"
import { authOptions } from "../../../lib/auth"

if (typeof process !== 'undefined') {
    if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
        process.env.NEXTAUTH_URL = 'http://localhost:3001'
    } else if (!process.env.NEXTAUTH_URL) {
        console.warn('NEXTAUTH_URL is not set in production!')
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }