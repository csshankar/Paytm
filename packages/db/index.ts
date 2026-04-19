import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import 'dotenv/config'

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL
  
  if (!connectionString) {
    throw new Error('DATABASE_URL is not defined in environment variables')
  }

  // If using Prisma Accelerate (prisma://), pass it as accelerateUrl
  if (connectionString?.startsWith('prisma://')) {
    return new PrismaClient({
      accelerateUrl: connectionString,
    }).$extends(withAccelerate())
  }
  
  // Otherwise use the PG adapter for direct connection
  const pool = new Pool({ connectionString })
  const adapter = new PrismaPg(pool)
  
  return new PrismaClient({
    adapter,
  })
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma: ReturnType<typeof prismaClientSingleton> = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
