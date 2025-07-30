import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/user"
import dotenv from "dotenv"

dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "testdb",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: ["dist/migration/*.{js}"],
    subscribers: [],
})
