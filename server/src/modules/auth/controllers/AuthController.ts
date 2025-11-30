import { Request, Response } from "express";
import { SendResponse } from "../../../shared/utils/response/sendReponse";
import httpStatus from "http-status";
import { BaseController } from "../../../core/controllers/BaseController";
import { AuthService } from "../services/AuthService";
import { UserService } from "../../users/services/UserService";
import { EnvConfig } from "../../../config/env.config";

export class AuthController extends BaseController {
  private sendResponse: SendResponse;
  private authService: AuthService;
  private userService: UserService;
  private envConfig: EnvConfig;

  constructor() {
    super();
    this.sendResponse = new SendResponse();
    this.authService = new AuthService();
    this.userService = new UserService();
    this.envConfig = new EnvConfig();
  }

  async signinUser(req: Request, res: Response) {
    const result = "This is a ans result from AuthService signinUser method";
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
      data: result,
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
