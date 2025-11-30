import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { UpdateUserDTO } from "../dtos/UpdateUserDTO";
import { ValidateDTO } from "../../../shared/utils/validators/validateDto";

export class UserRoutes {
  public router: Router;
  private userController: UserController;
  private validateDto: ValidateDTO;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.validateDto = new ValidateDTO();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      "/",
      this.userController.wrap(this.userController.getAll)
    );

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
