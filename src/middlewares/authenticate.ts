import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

// Authentication middleware
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split('Bearer ')[1];
  let error;
  if (!token) {
    error = new Error('Authentication token missing');
    (error as any).statusCode = 401;
    return next(error);
  }

  try {
    // Verify the token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);
    (req as any).user = decodedToken;
    next(); // Token is valid, proceed to the next middleware/route handler
  } catch (error) {
    error = new Error('Invalid or expired token');
    (error as any).statusCode = 401; 
    return next(error); 
  }
};

export default authenticate;