import { Request, Response, NextFunction } from "express";
import {AppError} from '../utils/errors/appError';

export class ErrorHandlers {
  globalErrorHanlder(
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  notFound(req: Request, res: Response) {
    res.status(404).json({
        success: false,
        message: "API Not Found!"
    })
}
}
