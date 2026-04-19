const { PrismaClient } = require('@prisma/client');
console.log('Client loaded');
const prisma = new PrismaClient();
console.log('Client instantiated');
prisma.$connect().then(() => console.log('Connected')).catch(e => console.error(e));
