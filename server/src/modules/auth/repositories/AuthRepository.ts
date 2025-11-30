import { IRefreshToken, RefreshTokenModel } from "../models/RefreshToken.model";

export class AuthRepository {
  private refreshTokenModel: RefreshTokenModel;

  constructor() {
    this.refreshTokenModel = new RefreshTokenModel();
  }

  async getRefreshToken(id: string) {
    return await this.refreshTokenModel.model.findOne({ userId: id });
  }

  async createRefreshToken(data: IRefreshToken) {
    return await this.refreshTokenModel.model.create(data)
  }

  async deleteRefreshTokens(userId: string, userAgent: string) {
    return await this.refreshTokenModel.model.deleteMany({ userId, userAgent });
  }
}
