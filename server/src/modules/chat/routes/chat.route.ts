import { Router } from "express";
import { AuthGuard } from "../../../core/guards/AuthGuard";
import { ChatController } from "../controllers/ChatController";

export class ChatRoutes {
  public router: Router;
  private authGuard = new AuthGuard();
  private chatController = new ChatController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    //protect all
    this.router.use(this.authGuard.wrap(this.authGuard.protectRoute))

    this.router.get(
      "/token",
        this.chatController.wrap(this.chatController.getSreamToken)
    );
  }
}
