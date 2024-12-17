import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

// Authentication middleware
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split('Bearer ')[1];
  let error;
  if (!token) {
    res.status(401).json({ message: "Authentication token missing", error });
    return;
  }

  try {
    // Verify the token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);
    (req as any).user = decodedToken;
    next(); // Token is valid, proceed to the next middleware/route handler
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token", error });
    return;
  }
};

export default authenticate;