import { Request, Response, NextFunction } from 'express';

export const authorize = (roles: ('admin' | 'user')[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req!.user;

        if (!user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        console.log(req.user)

        if (!roles.includes(user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }

        next();
    };
};
