import User from "../../models/user";

interface ISignUpParams {
    firstName: string
    lastName: string
    email: string
    password: string
    birthday: Date
    location: string
    phone: string
}

export default class AuthService {
    static async signUp(body: ISignUpParams) {

         const response =    await User.create({
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                password: body.password,
                birthday: body.birthday,
                location: body.location,
                isVerified: false,
                phone: body.phone,
                role: "admin"
            })
        return response
    }
}