import { NextFunction, Request } from "express";
import { BaseController } from "../controllers/BaseController";
import ApiError from "../../shared/utils/errors/apiError";
import httpStatus from 'http-status';
import { JwtService } from "../utils/jwt.service";
import { EnvConfig } from "../../config/env.config";
import { JwtPayload } from "jsonwebtoken";
import { UserService } from "../../modules/users/services/UserService";
import { IJwtPayload } from "../interface/jwtPyaload.interface";

export class AuthGuard extends BaseController{
    private jwtService: JwtService;
    private envConfig = new EnvConfig();
    private userService = new UserService();
    constructor() {
        super()
        this.jwtService = new JwtService();
    }

    async protectRoute (req: Request, res: Response, next: NextFunction) {
        const token = req.cookies.jwt;

        if(!token) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized - No token provided");
        }

        const decoded = this.jwtService.verify(
            token, 
            this.envConfig.getJWTConfig().secret!
        ) as IJwtPayload

        if(!decoded) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized - Invalid token");
        }

        const user = this.userService.getUserById(decoded.userId as string);
        if(!user) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized - User not found");
        }

        req.user = decoded;

        next();
    }
}