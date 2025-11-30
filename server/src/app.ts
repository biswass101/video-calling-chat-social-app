import express, { Application } from 'express';
import { DBConfig } from "./config/db.config";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { ErrorHandlers } from './shared/middlewares/errorHandlers';
import { AppRoutes } from './routes';

export class App {
    public app: Application;
    private dbConfig: DBConfig;
    private appRoutes: AppRoutes;
    private errorHanlders: ErrorHandlers;
    
    constructor() {
        this.app = express();
        this.dbConfig = new DBConfig();
        this.appRoutes = new AppRoutes();
        this.errorHanlders = new ErrorHandlers();
    }

    public async init(): Promise<Application> {
        await this.connectToDatabase();
        this.registerPreMiddlewares();
        this.registerRoutes();
        this.registerPostMiddlewares();
        return this.app;
    }

    private async connectToDatabase(): Promise<void> {
        await this.dbConfig.connectDB();
    }

    private registerPreMiddlewares(): void {
        this.app.use(
            cors({
                origin: ["http://localhost:8080",],
                credentials: true,
                methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
            })
        )

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }

    private registerRoutes(): void {
        this.app.get('/', (req, res) => {
            res.status(200).json({ status: 'OK', message: 'Welcome to the Video Calling App API' });
        })
        this.app.get('/health', (req, res) => {
            res.status(200).json({ status: 'OK', message: 'Server is healthy' });
        })

        this.app.use('/api/v1', this.appRoutes.router);
    }

    private registerPostMiddlewares(): void {
        this.app.use(this.errorHanlders.notFound)
        this.app.use(this.errorHanlders.globalErrorHanlder)
    }
}