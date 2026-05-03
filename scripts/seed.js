const postgres = require("postgres");
const bcrypt = require("bcryptjs");

const sql = postgres(process.env.DATABASE_URL);

async function seed() {
  // Create users table if it doesn't exist
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  // Hash the password
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Insert a test user
  await sql`
    INSERT INTO users (name, email, password)
    VALUES ('Test User', 'user@test.com', ${hashedPassword})
    ON CONFLICT (email) DO NOTHING;
  `;

  console.log("✅ User created successfully");
  console.log("📧 Email: user@test.com");
  console.log("🔑 Password: password123");

  await sql.end();
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
