import http from "http";
import { App } from "./app";

export class Server {
  private appInstance: App;
  private server: http.Server | null = null;
  private readonly port: number;

  constructor() {
    this.port = Number(process.env.PORT) || 3000;
    this.appInstance = new App();
  }

  public async start(): Promise<void> {
    try {
      const app = await this.appInstance.init();
      this.server = http.createServer(app);
      this.server.listen(this.port, () => {
        console.log(`🚀 Server is running at http://localhost:${this.port}`);
      });
      this.handleProcessEvents();
    } catch (error) {
      console.error("❌ Error starting server:", error);
      process.exit(1);
    }
  }

  private handleProcessEvents(): void {
    process.on("uncaughtException", (err) => {
      console.error("❌ Uncaught Exception:", err);
      this.shutdown();
    });
    process.on("unhandledRejection", (err) => {
      console.error("💥 Unhandled Promise Rejection:", err);
      this.shutdown();
    });

    process.on("SIGTERM", () => {
      console.log("📴 SIGTERM received");
      this.shutdown();
    });

    process.on("SIGINT", () => {
      console.log("📴 SIGINT received");
      this.shutdown();
    });
  }

  private shutdown(): void {
    console.log("🔻 Shutting down server gracefully...");

    if (this.server) {
      this.server.close(() => {
        console.log("🛑 HTTP server closed.");
        process.exit(0);
      }) ;
    } else {
        process.exit(0);
      }
  }
}

const server = new Server();
server.start();
