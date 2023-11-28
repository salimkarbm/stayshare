import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import mongoose, { connect } from 'mongoose';
import express, { Application, Request, Response, NextFunction } from 'express';
import logger from './Utils/Logger';
import routes from './Routes/index';

// import express

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

// set security Http headers
app.use(helmet());

app.use(
    cors({
        origin: ['http://localhost:3000', 'squazzle-frontend.vercel.app'],
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

app.get(
    '/squazzle',
    async (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json({
            success: true,
            message:
                'welcome to squazzle Api, please find the documentation here: https://documentations ',
            note: 'should you need any assistance kindly contact our support '
        });
    }
);

// Routes
app.use('/api/v1', routes);

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
