import { Response } from "express";

interface IReponse<T> {
  statusCode: number;
  success: boolean;
  message?: string;
  data?: T;
}

export class SendResponse {
  response<T>(res: Response, data: IReponse<T>) {
    res.status(data?.statusCode).json({
      success: data?.success,
      message: data?.message,
      data: data?.data,
    });
  }
}
