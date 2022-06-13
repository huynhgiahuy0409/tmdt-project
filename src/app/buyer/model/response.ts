import { JWT } from "./jwt";
import { User } from "./user";

export class AuthenticationResponse{
    user!: User;
    accessToken!: JWT;
    refreshToken!: JWT
}