// import { Router } from "express";
// import { AuthController } from "../controllers/AuthController";
// import { validateDTO } from "../../../shared/utils/validateDTO";
// import { SigninUserDTO } from "../dtos/SigninUserDTO";
// import { SignupUserDTO } from "../dtos/SignupUserDTO";
// import { ChangeUserPasswordDTO } from "../dtos/ChangeUserPasswordDTO";
// import { JwtService } from "../../../core/utils/jwt";
// import { AuthGuard } from "../../../core/guards/AuthGuard";
// import { config } from "../../../config/env.config";

// export class AuthRoutes {
//   public router: Router;
//   private authController: AuthController;
//   private authGuard: AuthGuard;

//   constructor() {
//     this.router = Router();
//     this.authController = new AuthController();

//     const jwtService = new JwtService({
//       secret: config.jwt.secret as string,
//       expiresIn: config.jwt.expiresIn,
//     });

//     this.authGuard = new AuthGuard(jwtService);

//     this.initializeRoutes();
//   }

//   private initializeRoutes(): void {
//     // Signin
//     this.router.post(
//       "/signin",
//       validateDTO(SigninUserDTO),
//       this.authController.signinUser.bind(this.authController)
//     );

//     // Signup
//     this.router.post(
//       "/signup",
//       validateDTO(SignupUserDTO),
//       this.authController.signupUser.bind(this.authController)
//     );

//     // Change Password (Protected Route)
//     this.router.patch(
//       "/change-password",
//       this.authGuard.handle.bind(this.authGuard),
//       validateDTO(ChangeUserPasswordDTO),
//       this.authController.changePassword.bind(this.authController)
//     );

//     // Refresh Token
//     this.router.post(
//       "/refresh-token",
//       this.authController.refreshToken.bind(this.authController)
//     );

//     // Forget Password
//     this.router.patch(
//       "/forget-password",
//       this.authController.forgetPassword.bind(this.authController)
//     );

//     // Reset Password
//     this.router.post(
//       "/reset-password",
//       this.authController.resetPassword.bind(this.authController)
//     );

//     // Logout
//     this.router.post(
//       "/logout",
//       this.authController.logoutUser.bind(this.authController)
//     );
//   }
// }
