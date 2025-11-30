import { NextFunction, Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import httpStatus from 'http-status'
import { SendResponse } from "../response/sendReponse";
export class ValidateDTO {
    private sendReponse: SendResponse;

    constructor() {
        this.sendReponse = new SendResponse();
    }

  validate(dtoClass: new (...args: any[]) => object) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const dtoObject = plainToInstance(dtoClass, req.body);

      const errors = await validate(dtoObject, {
        whitelist: true,
        forbidNonWhitelisted: true,
        skipMissingProperties: false,
      });

      if (errors.length > 0) {
        return this.sendReponse.response(res, {
          statusCode: httpStatus.BAD_REQUEST,
          success: false,
          message: "Validation failed",
          data: errors.map((err: any) => Object.values(err.constraints)).flat(),
        });
      }

      next();
    };
  }
}
