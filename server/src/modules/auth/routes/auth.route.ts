import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { CreateRefreshTokenDto } from "../dtos/CreateRefreshTokenDto";
import { CreateUserDTO } from "../../users/dtos/CreateUserDTO";
import { ValidateDTO } from "../../../shared/utils/validators/validateDto";
import { SignInUserDTO } from "../dtos/SigninUserDTO";
import { AuthGuard } from "../../../core/guards/AuthGuard";
import { OnboardUserDTO } from "../dtos/OnboardUserDTO";

export class AuthRoutes {
  public router: Router;
  private authController: AuthController;
  private validateDto: ValidateDTO;
  private authGuard = new AuthGuard();

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.validateDto = new ValidateDTO();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {

    this.router.get('/me', 
      this.authGuard.wrap(this.authGuard.protectRoute),
      this.authController.wrap(this.authController.getMe)
    )

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
      "/signout",
      this.authController.wrap(this.authController.signoutUser)
    )

    this.router.post(
      "/onboarding",
      this.authGuard.wrap(this.authGuard.protectRoute),
      this.validateDto.validate(OnboardUserDTO),
      this.authController.wrap(this.authController.onboardUser)
    )

    this.router.post(
      "/refresh-token",
      this.validateDto.validate(CreateRefreshTokenDto),
      this.authController.wrap(this.authController.createRefreshToken)
    );
  }
}
