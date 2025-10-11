import "dotenv/config";
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing in .env");
}

console.log(process.env.DATABASE_URL)

const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
});

export const db = drizzle(pool);
