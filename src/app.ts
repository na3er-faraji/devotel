import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import admin from 'firebase-admin';
import { DataSource } from 'typeorm';
import { Post } from './models/Post';
import postRoutes from './routes/posts';
import { AppDataSource } from "./database/data-source";

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

// Initialize Express and TypeORM
const app = express();

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

// Middleware
app.use(bodyParser.json());

// Use Routes
app.use('/posts', postRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "An internal server error occurred" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


