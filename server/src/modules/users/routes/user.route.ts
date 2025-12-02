import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { UpdateUserDTO } from "../dtos/UpdateUserDTO";
import { ValidateDTO } from "../../../shared/utils/validators/validateDto";
import { AuthGuard } from "../../../core/guards/AuthGuard";

export class UserRoutes {
  public router: Router;
  private userController: UserController;
  private validateDto: ValidateDTO;
  private authGuard = new AuthGuard;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.validateDto = new ValidateDTO();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    //protect all
    this.router.use(this.authGuard.wrap(this.authGuard.protectRoute))

    this.router.get(
      "/",
      this.userController.wrap(this.userController.getAll)
    );

    this.router.get(
      "/recommended",
      this.userController.wrap(this.userController.getRecommendedUsers)
    )

    this.router.get(
      "/friends",
      this.userController.wrap(this.userController.getFriends)
    )

    this.router.post(
      "/",
      this.validateDto.validate(CreateUserDTO),
      this.userController.wrap(this.userController.create)
    );

    this.router.get(
      "/:id",
      this.userController.wrap(this.userController.getOne)
    );

    this.router.patch(
      "/:id",
      this.validateDto.validate(UpdateUserDTO),
      this.userController.wrap(this.userController.update)
    );

    this.router.delete(
      "/:id",
      this.userController.wrap(this.userController.delete)
    );
  }
}
