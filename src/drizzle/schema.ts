import { mysqlTable, int, varchar, text, timestamp } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  userName: varchar("userName", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  phoneNumber: varchar("phoneNumber", { length: 255 }),
  deletedAt: timestamp("deletedAt"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const sessions = mysqlTable("sessions", {
  id: varchar('id', { length: 255 }).primaryKey(),
  userId: int('userId').notNull().references(() => users.id, { onDelete: "cascade" }),
  userAgent: varchar('userAgent', { length: 512 }).notNull(),
  ip: varchar('ip', { length: 45 }).notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  deletedAt: timestamp("deletedAt"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
  createdAt: timestamp("createdAt").defaultNow(),
});
