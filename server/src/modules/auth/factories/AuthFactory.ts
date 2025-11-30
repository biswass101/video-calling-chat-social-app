import { IRefreshToken } from "../models/RefreshToken.model";

export class AuthFactory {
    toResponse(refreshToken: IRefreshToken) {
        return {
            userId: refreshToken.userId,
            tokenHash: refreshToken.tokenHash,
            userAgent: refreshToken.userAgent,
            ipAddress: refreshToken.ipAddress,
            expiresAt: refreshToken.expiresAt,
            _id: refreshToken._id,
            createdAt: refreshToken.createdAt,
            updatedAt: refreshToken.updatedAt,
        }
    }
}