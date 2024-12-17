import { DataSource } from "typeorm";
import { Post } from "../models/Post";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'blog_app',
    synchronize: true,  //just for development
    // entities: [Post],
    entities: [__dirname + "/../models/*.{js,ts}"]
});
