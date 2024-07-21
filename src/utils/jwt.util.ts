import bCrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import  config from '../config'

interface IJWTPayload {
    id: number
    email: string
    role: string
}

const JWT_SECRET = config.AUTH.JWT_ACCESS_SECRET

export default class JwtUtil {
  static sign(paylod: IJWTPayload ) {
    return jwt.sign(
        paylod, 
        JWT_SECRET,
        { expiresIn: '1d' }
    )
}
}
