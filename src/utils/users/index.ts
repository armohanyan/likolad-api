import { pick } from "lodash";
import {IUser} from "../../types/user";

export function serializeUser(user: IUser) {
    return pick(user, 'password')
}