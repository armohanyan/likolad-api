import User from "../../models/user";
import bcrypt from 'bcryptjs';
import { CryptoUtil } from "utils";
import JwtUtil from "utils/jwt.util";
import createHttpError from 'http-errors';

interface ISignUpParams {
    firstName: string
    lastName: string
    email: string
    password: string
    birthday: Date
    location: string
    phone: string
}

interface ISignInParams {
    email: string
    password: string
}


export default class AuthService {
    static async signUp(body: ISignUpParams) {
        const email = body.email;

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) { 
            throw createHttpError(400, 'User already exists with this email')
        }
    
        const hashedPassword = CryptoUtil.createHash(body.password)
    
        const response = await User.create({
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          password: hashedPassword,
          birthday: body.birthday,
          location: body.location,
          isVerified: false,
          phone: body.phone,
          role: "admin"
        });

        return response
    }

    static async signIn(body: ISignInParams) {
        const { email, password } = body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw createHttpError(401, 'User already exists with this email')
        }

        const isPasswordValid = CryptoUtil.isValidPassword(password, user.password)

        if (!isPasswordValid) {
            throw createHttpError(401, 'User already exists with this email')
        }

        const token = JwtUtil.sign({
            id: user.id,
            email: user.email,
            role: user.role
        })

        return { token };
    }
}