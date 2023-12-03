import { TypeOrmModuleOptions } from "@nestjs/typeorm"

export function getDatabaseConfig(): TypeOrmModuleOptions {
    if (process.env.DB === "postgres") {
        return {
            type: "postgres",
            host: process.env.DATABASE_HOST || "localhost",
            username: process.env.DATABASE_USER || "postgres",
            password: process.env.DATABASE_PASSWORD || "postgres",
            database: process.env.DATABASE_NAME || "postgres",
            autoLoadEntities: true,
        }
    } else {
        return {
            type: "sqlite",
            database: "bnp.db",
            synchronize: true,
            autoLoadEntities: true,
        }
    }
}