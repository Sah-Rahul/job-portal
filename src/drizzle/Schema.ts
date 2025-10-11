import {
  int,
  mysqlTable,
  text,
  varchar,
  timestamp,
} from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable("users", {
  id: int().autoincrement().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  userName: varchar({ length: 255 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: text().notNull(),
  phoneNumber: varchar({ length: 255 }),
  deletedAt: timestamp(),
  updatedAt: timestamp().defaultNow().onUpdateNow(),
  createdAt: timestamp().defaultNow(),
});
