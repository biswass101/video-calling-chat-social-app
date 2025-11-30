import { EnvConfig } from "../../../config/env.config";
import { HashService } from "../../../core/utils/hash.service";
import { JwtService } from "../../../core/utils/jwt.service";
import ApiError from "../../../shared/utils/errors/apiError";
import { UserService } from "../../users/services/UserService";
import { AuthFactory } from "../factories/AuthFactory";
import { IAuth } from "../models/Auth.model";
import { IRefreshToken } from "../models/RefreshToken.model";
import { AuthRepository } from "../repositories/AuthRepository";
import httpStatus from 'http-status';

export class AuthService {
    private authRepository = new AuthRepository();
    private authFactory = new AuthFactory();
    private userService = new UserService();
    private hashService = new HashService();
    private jwtService = new JwtService();
    private envConfig = new EnvConfig();

    async signinUser(user: IAuth) {
        const result = await this.userService.getUserByEmail(user.email);
        if(!result) throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid email or password");

        const isPasswordCorrect = await this.hashService.compare(user.password, result.password);
        if(!isPasswordCorrect) throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid email or password");

        const token = this.jwtService.sign(
            {userId: result._id?.toString() as string},
            {
                secret: this.envConfig.getJWTConfig().secret!,
                expiresIn: this.envConfig.getJWTConfig().expiresIn!
            }
        )

        return  { token }
    }

    async createRefreshToken(data: IRefreshToken) {
        const result = await this.authRepository.createRefreshToken(data)
        console.log("Created Refresh Token:", result);
        return this.authFactory.toResponse(result);
    }
}