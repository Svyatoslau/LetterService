import { User } from "../User";

export interface SuccesfullLogin {
    user: User,
    token: string
}
