import { serial, text, integer, primaryKey, pgTable, timestamp } from "drizzle-orm/pg-core";
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable( "users", {

    id: serial("id").primaryKey(),
    name: text("name"),
    email: text("email"),
    password: text("password")

}); 

export const kids = pgTable("kids",{

    id: serial("id").primaryKey(),
    name: text("name"),
    rut: text("rut"),
    responsable: text("responsable"),
    phone: text("phone"),
});

export const plans = pgTable("plans",{

    id: serial("id").primaryKey(),
    name: text("name"),
    price: integer("price"),
    duration: integer("duration"),
});

export const kids_plans = pgTable("kids_plans",{
        id: serial("id").notNull().primaryKey(),
        kidId: integer("kidId").notNull().references(() => kids.id),
        planId: integer("planId").notNull().references(()=>plans.id),
        date: timestamp("date").notNull().$default("now()")
});

