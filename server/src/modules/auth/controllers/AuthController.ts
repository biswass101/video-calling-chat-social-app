import { Request, Response } from "express";
import { SendResponse } from "../../../shared/utils/response/sendReponse";
import httpStatus from "http-status";
import { BaseController } from "../../../core/controllers/BaseController";
import { AuthService } from "../services/AuthService";
import { UserService } from "../../users/services/UserService";
import { EnvConfig } from "../../../config/env.config";
import { UserFactory } from "../../users/factories/UserFactory";
import { IUser } from "../../users/models/User.Model";

export class AuthController extends BaseController {
  private sendResponse: SendResponse;
  private authService: AuthService;
  private userService: UserService;
  private userFactory = new UserFactory();
  private envConfig: EnvConfig;

  constructor() {
    super();
    this.sendResponse = new SendResponse();
    this.authService = new AuthService();
    this.userService = new UserService();
    this.envConfig = new EnvConfig();
  }

  async getMe(req: Request, res: Response) {
    const { userId } = req.user;
    const result = await this.userService.getUserById(userId) as IUser;
    this.sendResponse.response(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User profile retrieved",
      data: this.userFactory.toResponse(result),
    });
  }

  async signinUser(req: Request, res: Response) {
    const result = await this.authService.signinUser(req.body);
    res.cookie("jwt", result.token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: this.envConfig.getAppConfig().environment === "production",
    });
    this.sendResponse.response(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User signed in successfully",
      data: result,
    });
  }

  async signupUser(req: Request, res: Response) {
    const result = await this.userService.createUser(req.body);
    res.cookie("jwt", result.token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: this.envConfig.getAppConfig().environment === "production",
    });
    this.sendResponse.response(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User signed up successfully",
      data: this.userFactory.toResponse(result),
    });
  }

  async onboardUser(req: Request, res: Response) {
    const { userId } = req.user;
    const result = await this.authService.onboardUser(userId, req.body);
    this.sendResponse.response(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User onboarded successfully",
      data: this.userFactory.toResponse(result),
    });
  }

  signoutUser(req: Request, res: Response) {
    res.clearCookie("jwt");
    this.sendResponse.response(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User logged out successfully",
      data: null,
    });
  }

  async createRefreshToken(req: Request, res: Response) {
    const result = await this.authService.createRefreshToken(req.body);
    this.sendResponse.response(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Refresh token created successfully",
      data: result,
    });
  }
}
