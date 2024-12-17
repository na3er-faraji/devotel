
import { Request, Response, NextFunction } from 'express';

// Authorization middleware for specific roles
const authorize = (requiredRole: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role } = (req as any)?.user || ""

    if (!requiredRole.includes(role)) {
      res.status(403).json({ message: "Forbidden: Insufficient permissions" });
      return;
    };
  };
}
export default authorize;
