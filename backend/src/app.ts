//Importing necessary modules
import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from "cors";

config(); //configures the environment for mongodb
const app = express();

//middlewares
app.use(cors({origin: "http://localhost:5173", credentials: true})); //middleware that enables CORS with various options
app.use(express.json()); //middleware that parses incoming requests with JSON payloads
app.use(morgan('dev')); //HTTP request logger middleware for node.js. Remove in production
app.use(cookieParser(process.env.COOKIE_SECRET)); //middleware that parses cookies attached to the client request object

app.use("/api/v1", appRouter);

export default app;