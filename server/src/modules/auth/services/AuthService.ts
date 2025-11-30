import { AuthFactory } from "../factories/AuthFactory";
import { IRefreshToken } from "../models/RefreshToken.model";
import { AuthRepository } from "../repositories/AuthRepository";

export class AuthService {
    private authRepository = new AuthRepository();
    private authFactory = new AuthFactory();

    async createRefreshToken(data: IRefreshToken) {
        const result = await this.authRepository.createRefreshToken(data)
        console.log("Created Refresh Token:", result);
        return this.authFactory.toResponse(result);
    }
}