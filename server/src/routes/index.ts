import { Router } from "express";
import { AuthRoutes } from "../modules/auth/routes/auth.route";
import { UserRoutes } from "../modules/users/routes/user.route";

export class AppRoutes {
    public router: Router;
    private auhthRoutes: AuthRoutes;
    private userRoutes: UserRoutes;

    constructor() {
        this.router = Router();
        this.auhthRoutes = new AuthRoutes();
        this.userRoutes = new UserRoutes();
        this.initialize();
    }

    private initialize(): void {
        this.router.use("/auth", this.auhthRoutes.router);
        this.router.use("/users", this.userRoutes.router);
    }
}