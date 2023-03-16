import { Role } from "../Role.enum";

export interface UserForCreation {
    email: string,
    password: string,
    role: Role
}
