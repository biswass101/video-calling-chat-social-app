import { Router } from "express";

export class AppRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
    }

    private initialize(): void {
        this.router.get("/auth", (req, res) => {
            res.send("Welcome to the API");
        });
    }
}