import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,  // Use DATABASE_URL from the .env file
    synchronize: true,  //just for development
    // entities: [Post],
    entities: [__dirname + "/../models/*.{js,ts}"]
});
