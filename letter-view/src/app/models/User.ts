import { Role } from "./Role.enum";

export interface User {
    id: number,
    email: string,
    role: Role
}
