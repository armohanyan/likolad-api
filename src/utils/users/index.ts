import {omit} from "lodash";
import {IUser} from "../../types/user";

export function serializeUser(user: IUser) {
    return omit(user, 'password')
}