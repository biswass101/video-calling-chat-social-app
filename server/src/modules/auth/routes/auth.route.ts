import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { CreateRefreshTokenDto } from "../dtos/CreateRefreshTokenDto";
import { CreateUserDTO } from "../../users/dtos/CreateUserDTO";
import { ValidateDTO } from "../../../shared/utils/validators/validateDto";
import { SignInUserDTO } from "../dtos/SigninUserDTO";

export class AuthRoutes {
  public router: Router;
  private authController: AuthController;
  private validateDto: ValidateDTO;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.validateDto = new ValidateDTO();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/signin",
      this.validateDto.validate(SignInUserDTO),
      this.authController.wrap(this.authController.signinUser)
    );

    this.router.post(
      "/signup",
      this.validateDto.validate(CreateUserDTO),
      this.authController.wrap(this.authController.signupUser)
    )

    this.router.post(
      "/refresh-token",
      this.validateDto.validate(CreateRefreshTokenDto),
      this.authController.wrap(this.authController.createRefreshToken)
    );
  }
}
