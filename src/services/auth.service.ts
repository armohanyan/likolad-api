import {CryptoUtil} from "../utils";
import JwtUtil from "../utils/jwt.util";
import createHttpError from 'http-errors';
import {User} from '../models';
import {serializeUser} from "../utils/users";

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

        const user = await User.create({
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

        return serializeUser(user)
    }

    static async signIn(body: ISignInParams) {
        const { email, password } = body;

        const user = await User.findOne({ where: { email }});

        if (!user) {
            throw createHttpError(401, 'Invalid email or password')
        }

        const isPasswordValid = CryptoUtil.isValidPassword(password, user.getDataValue("password")!)

        if (!isPasswordValid) {
            throw createHttpError(401, 'Invalid email or password')
        }

        const token = JwtUtil.sign({
            id: user.getDataValue('id'),
            email: user.email,
            role: user.role
        })

        return { user, token };
    }
}