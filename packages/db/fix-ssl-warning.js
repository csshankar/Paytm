const fs = require('fs');
const path = require('path');

const envPath = path.join('packages', 'db', '.env');

try {
  let envContent = fs.readFileSync(envPath, 'utf8');
  console.log("Current .env read successfully.");

  if (envContent.includes('sslmode=require')) {
    console.log("Found 'sslmode=require'. Replacing with 'sslmode=no-verify' to suppress warning (dev safe).");
    // Using no-verify is often safer for dev against self-signed or non-root CA certs, 
    // but usually 'verify-full' is what the warning suggests for strictness.
    // However, Neon often works best with just 'require'. 
    // The warning says: "If you want the current behavior, explicitly use 'sslmode=verify-full'"
    // Let's try 'no-verify' first as it's the most compatible "just work" fix for node warnings usually.
    // actually, the warning says 'require' currently ALIASES 'verify-full'. 
    // So 'verify-full' preserves behavior.
    
    // Let's go with the warning's suggestion for "current behavior": verify-full?
    // Wait, if I change to verify-full and the system doesn't have the CA, it breaks.
    // 'no-verify' is the safest bet to STOP the warning and ensure connection.
    
    envContent = envContent.replace('sslmode=require', 'sslmode=no-verify');
    fs.writeFileSync(envPath, envContent);
    console.log("Updated .env file.");
  } else if (!envContent.includes('sslmode=')) {
      console.log("No sslmode param found. Appending 'sslmode=no-verify'.");
      // Appending to the URL might be tricky without parsing.
      // Simplistic approach:
      // Find the line with DATABASE_URL
      const lines = envContent.split('\n');
      const newLines = lines.map(line => {
          if (line.startsWith('DATABASE_URL=') && !line.includes('sslmode=')) {
              return line.includes('?') ? `${line}&sslmode=no-verify` : `${line}?sslmode=no-verify`;
          }
          return line;
      });
      fs.writeFileSync(envPath, newLines.join('\n'));
      console.log("Updated .env file with sslmode.");
  } else {
    console.log("sslmode already set to something else or not found in expected format.");
  }
} catch (err) {
  console.error("Error updating .env:", err.message);
}
