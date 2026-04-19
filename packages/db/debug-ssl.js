const fs = require('fs');
const path = require('path');

const envPath = path.join('packages', 'db', '.env');

try {
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Log the DATABASE_URL line (masked) to understand what's going on
  const dbLine = envContent.split('\n').find(l => l.startsWith('DATABASE_URL='));
  if (dbLine) {
      console.log("Found URL structure:", dbLine.replace(/:[^:@]+@/, ':****@'));
  }

  // Force update to no-verify if it contains sslmode=require (case insensitive)
  if (/sslmode=require/i.test(envContent)) {
     envContent = envContent.replace(/sslmode=require/gi, 'sslmode=no-verify');
     fs.writeFileSync(envPath, envContent);
     console.log("Replaced sslmode=require with sslmode=no-verify");
  } else {
      console.log("Did not find sslmode=require to replace.");
  }

} catch (err) {
  console.error("Error:", err);
}
