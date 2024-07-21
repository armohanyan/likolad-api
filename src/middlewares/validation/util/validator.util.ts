import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

export default class ValidatorUtil {

  static validateSignUp(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
        firstName: Joi.string().min(1).max(30).required(),
        lastName: Joi.string().min(1).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        birthday: Joi.date().iso().required(),
        location: Joi.string().optional(),
        phone: Joi.string().min(8).required(),
        role: Joi.string().valid('admin', 'user')
    });
      
    const { error } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  }

  static validateSignIn(req: Request, res: Response, next: NextFunction) {
    const signInSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
      });

      const { error } = signInSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      
      next();
  }
}

