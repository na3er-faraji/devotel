
import { Request, Response, NextFunction } from 'express';

// Authorization middleware for specific roles
const authorize = (requiredRole: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role } = (req as any).user

    if (!requiredRole.includes(role)) {
      const error = new Error('Forbidden: Insufficient permissions');
      (error as any).statusCode = 403; // Custom error with status code
      return next(error);  // Pass the error to the next middleware
    }
    next();
  };
};

export default authorize;
