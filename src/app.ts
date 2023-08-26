import cors from 'cors';
import dotenv from 'dotenv';
import mongoose, { connect } from 'mongoose';
import logger from './Logger';


// import express
import express, { Application, Request, Response, NextFunction } from 'express';

import AppError from './Utils/Errors/appError';
import { errorHandler } from './Middlewares/Errors/errorMiddleware';


dotenv.config();

process.on('uncaughtException', (err) => {
    logger.error(err.name, err.message);
    logger.info('UNCAUGHT EXCEPTION! shutting down...');
    process.exit(1);
});

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
const database = String(process.env.MONGO_DB_URL);

// Initialize express
const app: Application = express();

// Port
const PORT: number = Number(process.env.PORT) || 3000;
const address = `0.0.0.0:${PORT}`;


app.use(
    cors({
        origin: ['http://localhost:3000', 'https://bca-healthcare.vercel.app'],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    })
);

// Body parser middleware
// body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));


// Define index route
app.get('/', async (req: Request, res: Response) => {
    // res.render('index');
    res.contentType('json');
    res.json({ status: 'ok', message: 'Welcome to StayShare' });
});

// Routes


app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`can't find ${req.originalUrl} on server!`, 404));
});

app.use(errorHandler);

// Listen for server connections
const server = app.listen(PORT, async () => {
    async function run() {
        try {
            await connect(database);
            console.info(`Connection to database successful ${database}`);
            console.info(`Server started on PORT https://localhost:${address}`);
        } catch (error) {
            logger.error(`Trouble connecting to Database with error: ${error}`);
        }
    }
    run().catch(console.dir);
});

process.on('unhandledRejection', (err: any) => {
    logger.error(err.name, err.message);
    logger.info('UNHANDLED REJECTION! shutting down...');
    server.close(() => {
        process.exit(1);
    });
});

export default server;
