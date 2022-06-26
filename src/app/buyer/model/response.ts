import { JWT } from "./jwt";
import { UserResponse } from "./user";

export class AuthenticationResponse{
    user!: UserResponse;
    accessToken!: JWT;
    refreshToken!: JWT
}