import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import httpStatus from "http-status";
import { BaseController } from "../../../core/controllers/BaseController";
import { SendResponse } from "../../../shared/utils/response/sendReponse";
import { UserFactory } from "../factories/UserFactory";
import { IUser } from "../models/User.model";

export class UserController extends BaseController {
  private sendResponse: SendResponse;
  private userFactory: UserFactory;
  private userService: UserService;

  constructor() {
    super();
    this.sendResponse = new SendResponse();
    this.userFactory = new UserFactory();
    this.userService = new UserService();
  }
  async create(req: Request, res: Response) {
    const user = await this.userService.createUser(req.body);
    this.sendResponse.response(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User created",
      data: this.userFactory.toResponse(user),
    });
  }

  async getAll(req: Request, res: Response) {
    const users = await this.userService.getAllUsers();
    this.sendResponse.response(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User retrieved",
      data: users.map(user => this.userFactory.toResponse(user)),
    });
  }

  async getRecommendedUsers(req: Request, res: Response) {
    const currentUserId = req.user?.userId;
    const currentUser = await this.userService.getUserById(currentUserId);
    const recommendedUser = await this.userService.getRecommendedUsers(
      currentUserId, currentUser as IUser
    )
    this.sendResponse.response(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Recommended users retrieved",
      data: recommendedUser.map(user => this.userFactory.toResponse(user)),
    });
  }

  async getFriends(req: Request, res: Response) {
    const currentUserId = req.user?.userId;
    const friends = await this.userService.getFriends(currentUserId);

    this.sendResponse.response(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Friends retrieved",
      data: friends,
    });
  }

 



  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    const user = await this.userService.getUserById(id);
    this.sendResponse.response(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single user retrieved",
      data: user,
    });
  }

  async update(req: Request, res: Response) {
    const user = await this.userService.updateUser(req.params.id, req.body);
    this.sendResponse.response(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User updated",
      data: user,
    });
  }

  async delete(req: Request, res: Response) {
    const user = await this.userService.deleteUser(req.params.id);
    this.sendResponse.response(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User deleted",
      data: user,
    });
  }
}
