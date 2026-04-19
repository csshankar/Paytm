
import prisma from './index';

async function main() {
  try {
    console.log('Attempting to connect...');
    const user = await prisma.user.findFirst();
    console.log('Successfully connected!');
    console.log('User found:', user);
  } catch (error) {
    console.error('Error connecting to database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
