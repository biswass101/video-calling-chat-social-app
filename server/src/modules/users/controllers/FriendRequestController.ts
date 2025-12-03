import { Request, Response } from "express";
import { BaseController } from "../../../core/controllers/BaseController";
import { FriendRequestService } from "../services/FriendRequestService";
import { SendResponse } from "../../../shared/utils/response/sendReponse";
import httpStatus from "http-status";

export class FriendRequestController extends BaseController {
  private friendRequestService = new FriendRequestService();
  private sendResponse = new SendResponse();

  async getFriendRequests(req: Request, res: Response) {
    const friendRequsts = await this.friendRequestService.getReqeusts();

    this.sendResponse.response(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Friend request was sent",
      data: friendRequsts,
    });
  }

  async sendFriendRequest(req: Request, res: Response) {
    const { userId: myId } = req.user;
    const { id: recipientId } = req.params;

    const friendRequst = await this.friendRequestService.sendReqeust(
      myId,
      recipientId
    );

    this.sendResponse.response(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Friend request was sent",
      data: friendRequst,
    });
  }

  async acceptFriendRequest(req: Request, res: Response) {
    const { currUserId } = req.user;
    const { id: requestId } = req.params;
    const friendRequst = await this.friendRequestService.acceptRequest(
      currUserId,
      requestId
    );

    this.sendResponse.response(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Friend request was accepted",
      data: friendRequst,
    });
  }
}
