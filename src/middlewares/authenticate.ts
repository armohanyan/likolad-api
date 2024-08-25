import { Request, Response, NextFunction } from 'express';
import {User} from "../models";
import JwtUtil from "../utils/jwt.util";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract token from the Authorization header
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verify the token
        const decoded = JwtUtil.verify(token)
        console.log(decoded)
        // Find the user by ID
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // todo:
        req.user = user.dataValues;
        next();
    } catch (error) {
        // @ts-ignore
        res.status(401).json({ message: 'Authentication failed', error: error.message });
    }
};
