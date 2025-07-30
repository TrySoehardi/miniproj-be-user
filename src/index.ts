import express from "express"
import dotenv from "dotenv"
import router from "./controller/router"
import "reflect-metadata"
import { AppDataSource } from "./typeorm.config"
import { state } from "./middleware/state"
import { errorCatcher } from "./middleware/errorCatcher"
import helmet from "helmet"
import limiter from "./middleware/rateLimit"
import cors from "cors"

dotenv.config();

const app = express();

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
        app.use(limiter)
        app.use(helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    scriptSrc: ["'self'"],
                    objectSrc: ["'none'"],
                    upgradeInsecureRequests: [],
                },
            },
        }));
        app.use(cors({
            // origin: ['https://app.example.com'],
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            // allowedHeaders: ['Content-Type', 'Authorization']
        }));
        app.use(express.json());
        app.use(state);
        app.use("/api", router);

        // Route not found handler
        app.use((req, res) => {
            res.status(404).json({ error: "Route not found" });
        });

        app.use(errorCatcher);
        app.listen(process.env.PORT || 3000, () => {
            console.log("app run in port", process.env.PORT || 3000);
        })
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    })

export { app };
