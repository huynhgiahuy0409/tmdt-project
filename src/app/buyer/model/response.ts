import { UserResponse } from "src/app/_models/response";
import { JWT } from "./jwt";

export class AuthenticationResponse{
    user!: UserResponse;
    accessToken!: JWT;
    refreshToken!: JWT
}