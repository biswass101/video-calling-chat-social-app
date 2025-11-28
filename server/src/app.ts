import express, { Application, json } from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';

export class App {
    public app: Application;
    
    constructor() {
        this.app = express();
    }

    public async init(): Promise<Application> {
        return this.app;
    }

    private async connectToDatabase(): Promise<void> {
        
    }

    private registerPreMiddlewares(): void {
        this.app.use(
            cors({
                origin: [""],
                credentials: true,
                methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
            })
        )

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }

    private registerRoutes(): void {

    }

    private registerPostMiddlewares(): void {

    }
}