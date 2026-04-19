const fs = require('fs');
const path = require('path');

const envPath = path.join('packages', 'db', '.env');

try {
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Replace verify-full with no-verify to silence the specific warning about alias behavior
  // if the user wants to just suppress it.
  // The warning "The SSL modes 'prefer', 'require', and 'verify-ca' are treated as aliases for 'verify-full'"
  // suggests that currently 'verify-full' IS the behavior being used when you set 'require'.
  // But wait, the previous log says the URL *already* has `sslmode=verify-full`.
  
  // If it already has `verify-full`, why the warning?
  // Warning: "The SSL modes 'prefer', 'require', and 'verify-ca' are treated as aliases for 'verify-full'."
  // This warning typically appears when you use one of the aliases.
  // BUT my debug script showed: `...sslmode=verify-full"`.
  
  // Maybe there are quotes wrapping the URL that are confusing things?
  // DATABASE_URL="postgresql://...?sslmode=verify-full"
  
  // Let's try changing it to `sslmode=no-verify` just to see if it changes the behavior/warning,
  // as `no-verify` is standard for avoiding strict CA checks in dev.
  
  if (envContent.includes('sslmode=verify-full')) {
      envContent = envContent.replace('sslmode=verify-full', 'sslmode=no-verify');
      fs.writeFileSync(envPath, envContent);
      console.log("Updated to sslmode=no-verify");
  } else {
      console.log("Could not find sslmode=verify-full to replace.");
  }

} catch (err) {
  console.error("Error:", err);
}
