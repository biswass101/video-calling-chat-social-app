import { Request, Response } from "express";
import { BaseController } from "../../../core/controllers/BaseController";
import { StreamService } from "../../stream/services/StreamService";
import { SendResponse } from "../../../shared/utils/response/sendReponse";
import httpStatus from "http-status";

export class ChatController extends BaseController {
  private streamService = new StreamService();
  private sendResponse = new SendResponse();

  async getSreamToken(req: Request, res: Response) {
    const { userId } = req.user;
    const token = this.streamService.generateStreamToken(userId);

    this.sendResponse.response(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Stream token generated",
      data: token,
    });
  }
}
